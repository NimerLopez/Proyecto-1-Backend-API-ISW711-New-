const express = require('express');
const route = express.Router();
const User = require("../models/UserSchema");
const category = require("../models/CategoriesSchema");
const NewSource = require("../models/NewSourceSchema");
const New = require("../models/NewSchema")
const Parser = require('rss-parser');
const parser = new Parser();
//get all NewSource
route.get('/newSource', (req, res) => {
    NewSource.find().then((data) => res.status(200).json(data)).catch((err) => res.status(422).json({ message: err }))
});
//get NewSource by token
route.get('/myNewSource', (req, res) => {
    NewSource.find({ user_id: req.tokeng.id }).then((data) => res.status(200).json(data)).catch((err) => res.status(422).json({ message: err }))
});
//get NewSource by id
route.get('/newSource/:id', (req, res) => {
    const { id } = req.params;
    NewSource.findById(id).then((data) => res.status(200).json(data)).catch((err) => res.status(422).json({ message: err }))
});

//add NewSource
route.post('/newSource', async (req, res) => {
    try {
        console.log(req.tokeng.id);
        let Id_user = await User.model.findById(req.tokeng.id);//captura el usuario
        let category_id = await category.model.findById(req.body.category_id);//captura la categoria
        console.log(Id_user);
        console.log(category_id);
        if (Id_user && category_id) {//valida si existe el usuario
            req.body.user_id = req.tokeng.id;
            let NewSocon = new NewSource(req.body);//captura dats de request
            //console.log(NewSocon);
            let savedNewSource = await NewSocon.save();//guarda datos
            //let updatedData = await studentPost(req.body);//actualiza las noticias 
            res.status(201);
            res.header({
                'location': `http://localhost:3001/api/newSource/?id=${savedNewSource._id}`
            });
            res.json(savedNewSource);
        } else {
            res.status(422);
            throw new Error('No se encontró');
        }
    } catch (error) {//se cae si no se encuentra 
        res.status(422);
        res.json({ message: error.message + " No se encontro ver" });
    }
});
//update new 
route.patch('/newSource/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { url, name, user_id, category_id } = req.body;
        console.log(id);
        let Id_user = await User.model.findById(req.body.user_id);//captura el usuario
        let category_id_filt = await category.model.findById(req.body.category_id);//captura la categoria
        console.log(Id_user);
        if (Id_user && category_id_filt) {//valida si existe el usuario y categoria
            //let savedNew = await Newcon.updateOne({ _id:id},{$set:Newcon});//guarda datos
            const savedNewSource = await NewSource.findByIdAndUpdate(id, { url, name, user_id, category_id }, { new: true });
            res.json(savedNewSource);
            res.status(200);
        } else {
            res.status(422);
            throw new Error('No se encontró el recurso');
        }
    } catch (error) {//se cae si no se encuentra 
        res.status(422);
        res.json({ message: error.message + "Faltan elementos en la solicitud" });
    }
});
//delete new 
route.delete('/newSource/:id', (req, res) => {
    const { id } = req.params;
    NewSource.deleteOne({ _id: id }).then((data) => res.status(204).json("Elemento Eliminado")).catch((err) => res.status(500).json({ message: err }))
});
//process feed url 
route.post('/newSource/:id/process', async (req, res) => {
    try {
        const { id } = req.params;
        const newssorce = await NewSource.findById(id);//busca el id del recurso
        await New.deleteMany({ new_source_id: newssorce._id });//borra todas las noticas de este recurso
        const feed = await parser.parseURL(newssorce.url);//procesa el feed
        console.log(feed);
        const createdNews = [];//guarda el objeto guardado en mongodb
        for (const item of feed.items) {//lee el feed
            const nuevaNoticia = new New({//objeto New
                title: item.title,
                short_description: item.contentSnippet,
                permalink: item.link,
                date: item.pubDate,
                new_source_id: newssorce._id,
                user_id: newssorce.user_id,
                category_id: newssorce.category_id,
                enclosure: item.enclosure
            });
            const savedNew = await nuevaNoticia.save();//guarda la noticas
            createdNews.push(savedNew);//guarda el resultado en la lista
            res.setHeader('Location', `http://localhost:3001/api/newSource/?id=${savedNew._id}`); // Agregar la ubicación por id en el header
        }

        res.status(201).json(createdNews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = route;
