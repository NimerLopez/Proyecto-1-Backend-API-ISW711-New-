const express = require('express');
const route = express.Router();
const User = require("../models/UserSchema")
const New = require("../models/NewSchema")
const NewSource = require("../models/NewSourceSchema")
const Parser = require('rss-parser');
const parser = new Parser();
//get all new by token
route.get('/new/myNew', (req, res) => {
  New.find({ user_id: req.tokeng.id }).then((data) => res.status(200).json(data)).catch((err) => res.status(422).json({ message: err }))
});
//get all new by token and categori id
route.get('/new/myNew/categoryid/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.tokeng.id);
  console.log(id);
  New.find({ user_id: req.tokeng.id, category_id: id }).then((data) => res.status(200).json(data)).catch((err) => res.status(422).json({ message: err }))
});
//get new by id
route.get('/news/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  New.findById(id).then((data) => res.status(200).json(data)).catch((err) => res.status(201).json({ message: err }))
});
//get all new by UserID
route.get('/new/:user_id', (req, res) => {
  const { user_id } = req.params;
  console.log(user_id);
  New.find({ user_id: user_id }).then((data) => res.status(200).json(data)).catch((err) => res.status(422).json({ message: err }))
});
//get name 
route.get('/userFirstName', (req, res) => {
  User.model.findById(req.tokeng.id).then((data) => res.json(data.firstname)).catch((err) => res.json({ message: err }))
});


//add new
//  route.post('/new', async (req, res) => {
//     try {
//       let Id_user = await User.model.findById(req.body.user_id);//captura el usuario
//       console.log(Id_user);
//       if (Id_user) {//valida si existe el usuario
//         let Newcon = new New(req.body);//captura dats de request
//         console.log(Newcon);
//         let savedNew = await Newcon.save();//guarda datos
//         res.json(savedNew);
//       } else {
//         throw new Error('No se encontró el equipo');
//       }
//     } catch (error) {//se cae si no se encuentra 
//       res.json({ message: error.message+ " No se encontro al equipo xx" });
//     }
//   });

route.post('/new', async (req, res) => {
  try {
    const newssorce = await NewSource.find();//extre todos los recursos de la noticias
    //const newval = await New.find();//llama todas las noticias
    if (newssorce && newssorce.length > 0) {
      const results = await Promise.all(
        newssorce.map(async (item) => {//se recorren los recursos de la noticias
          await New.deleteMany({ new_source_id: item._id });
          const feed = await parser.parseURL(item.url);
          const result = await saveNewRSSDataToMongo(feed.items, item.user_id, item.category_id, item._id);
          return result;
        })
      );
      res.status(201).json(results);
    } else {
      res.status(422).json({ message: "No existen recursos" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//contentSnippet
async function saveNewRSSDataToMongo(rssData, userid, categoriid, idnewsource) {
  try {
    const results = [];
    for (const item of rssData) {
      const nuevaNoticia = new New({
        title: item.title,
        short_description: item.contentSnippet,
        permalink: item.link,
        date: item.pubDate,
        new_source_id: idnewsource,
        user_id: userid,
        category_id: categoriid
      });
      //console.log(NuevaNoticia);
      let savedNew = await nuevaNoticia.save();//guarda datos
      results.push(savedNew);//devuelve la noticia para la respuesta
      console.log("existencia");
      //const savedArticle = await newArticle.save();
      //results.push({ message: 'Artículo guardado correctamente.', /* data: savedArticle */ });     
    }
    return results;
  } catch (error) {
    return { message: error.message };
  }
}




//update new
// route.patch('/new/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, short_description, permalink, date, new_source_id, user_id, category_id } = req.body;
//     console.log(id);
//     let Id_user = await User.model.findById(req.body.user_id);//captura el usuario
//     console.log(Id_user);
//     if (Id_user) {//valida si existe el usuario
//       //let savedNew = await Newcon.updateOne({ _id:id},{$set:Newcon});//guarda datos
//       const savedNew = await New.findByIdAndUpdate(id, { title, short_description, permalink, date, new_source_id, user_id, category_id }, { new: true });
//       res.json(savedNew);
//     } else {
//       throw new Error('No se encontró el equipo');
//     }
//   } catch (error) {//se cae si no se encuentra 
//     res.json({ message: error.message + " No se encontro al equipo xx" });
//   }
// });
//delete new 
// route.delete('/new/:id', (req, res) => {
//   const { id } = req.params;
//   player.remove({ _id: id }).then((data) => res.status(204).json("Elemento Eliminado")).catch((err) => res.status(500).json({ message: err }))
// });
module.exports = route;


