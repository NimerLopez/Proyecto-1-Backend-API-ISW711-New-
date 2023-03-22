const express = require('express');
const route = express.Router();
const Categories = require("../models/CategoriesSchema")
//add Categories

route.post('/categories', (req, res) => {

  const Categoriesinsert = Categories.model(req.body);
  Categoriesinsert.save().then((data) => {
    res.header({ 'location': `http://localhost:3001/api/categories/?id=${data._id}` }),
    res.status(201).json(data)
  }).catch((err) => res.status(422).json({ message: err.message }));
});
//get all player
route.get('/categories', (req, res) => {
  Categories.model.find().then((data) => res.status(200).json(data))
    .catch((err) => res.status(422).json({ message: err }))

});
//get Categories by id
route.get('/categories/:id', (req, res) => {
  const { id } = req.params;
  Categories.model.findById(id).then((data) => res.status(200).json(data)).catch((err) => res.status(422).json({ message: err }))
});
//delete categories by id
route.delete('/categories/:id', (req, res) => {
  const { id } = req.params;
  Categories.model.deleteOne({ _id: id })
    .then((data) => res.status(204).json({ message: "El elemento fue eliminado exitosamente." }))
    .catch((err) => res.status(500).json({ message: err }))
});

route.patch('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log(name);
    console.log(id);
    const editCategory = await Categories.model.findByIdAndUpdate(id, { name }, { new: true });
    res.json(editCategory);
    res.status(200);
  } catch (error) {//se cae si no se encuentra 
    res.status(422);
    res.json({ message: error.message + "Faltan elementos en la solicitud" });
  }
});
module.exports = route;