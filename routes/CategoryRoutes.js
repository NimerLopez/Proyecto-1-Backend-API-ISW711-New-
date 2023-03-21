const express = require('express');
const route = express.Router();
const Categories = require("../models/CategoriesSchema")
//add Categories

route.post('/categories', (req, res) => {

  const Categoriesinsert = Categories.model(req.body);
  console.log(Categoriesinsert.firstname);
  Categoriesinsert.save().then((data) => res.header({ 'location': `http://localhost:3001/api/categories/?id=${data._id}` }),
    res.status(201).json(data)).catch((err) => res.status(422).json({ message: err.message }));
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
  Categories.model.remove({ _id: id }).then((data) => res.status(204).json("Elemento Eliminado")).catch((err) => res.status(500).json({ message: err }))
});
module.exports = route;