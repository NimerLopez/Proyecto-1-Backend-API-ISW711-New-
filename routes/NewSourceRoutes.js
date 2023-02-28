const express = require('express');
const route = express.Router();
const User = require("../models/UserSchema");
const category = require("../models/CategoriesSchema");
const NewSource = require("../models/NewSourceSchema");
let { studentPost } = require('./UpdateNew'); // Importa la función
//get all NewSource
route.get('/newSource', (req, res) => {
    NewSource.find().then((data) => res.json(data)).catch((err) => res.json({ message: err }))
});
//get NewSource by id
route.get('/newSource/:id', (req, res) => {
    const { id } = req.params;
    NewSource.findById(id).then((data) => res.json(data)).catch((err) => res.json({ message: err }))
});

//add NewSource
route.post('/newSource', async (req, res) => {
    try {
        let Id_user = await User.model.findById(req.body.user_id);//captura el usuario
        let category_id  = await category.model.findById(req.body.category_id);//captura la categoria
        console.log(Id_user);
        console.log(category_id);
        if (Id_user && category_id) {//valida si existe el usuario
            let NewSocon = new NewSource(req.body);//captura dats de request
            console.log(NewSocon);
            let savedNewSource = await NewSocon.save();//guarda datos
            //let updatedData = await studentPost(req.body);//actualiza las noticias 
            res.status(201);
            res.json(savedNewSource);
        } else {
            res.status(422);
            throw new Error('No se encontró el equipo');
        }
    } catch (error) {//se cae si no se encuentra 
        res.status(422);
        res.json({ message: error.message + " No se encontro al equipo xx" });
    }
});
//update new 
route.patch('/newSource/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {url,name,user_id, category_id} = req.body;
        console.log(id);
        let Id_user = await User.model.findById(req.body.user_id);//captura el usuario
        let category_id_filt  = await category.model.findById(req.body.category_id);//captura la categoria
        console.log(Id_user);
        if (Id_user && category_id_filt) {//valida si existe el usuario y categoria
            //let savedNew = await Newcon.updateOne({ _id:id},{$set:Newcon});//guarda datos
            const savedNewSource = await NewSource.findByIdAndUpdate(id, { url,name,user_id, category_id }, { new: true });
            res.json(savedNewSource);
            res.status(201);
        } else {
            res.status(422);
            throw new Error('No se encontró el equipo');
        }
    } catch (error) {//se cae si no se encuentra 
        res.status(422);
        res.json({ message: error.message + " No se encontro al equipo xx" });
    }
});
//delete new 
route.delete('/newSource/:id', (req, res) => {
    const { id } = req.params;
    NewSource.remove({ _id: id }).then((data) => res.json("Elemento Eliminado")).catch((err) => res.json({ message: err }))
});
module.exports = route;
