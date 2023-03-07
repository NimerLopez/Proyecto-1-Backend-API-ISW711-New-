const express = require('express');
const route = express.Router();
const User = require("../models/UserSchema")
//add user

route.post('/User', (req, res) => {

  const userinsert = User.model(req.body);
  console.log(userinsert.firstname);
  userinsert.save().then((data) => res.status(201).json(data)).catch((err) => res.status(422).json({ message: err.message }));
});
//get all player
route.get('/user', (req, res) => {
  User.model.find().then((data) => res.json(data))
    .catch((err) => res.json({ message: err }))

});
//get user by id
route.get('/user/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id).then((data) => res.json(data)).catch((err) => res.json({ message: err }))
});
module.exports = route;