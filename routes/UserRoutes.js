const express = require('express');
const route = express.Router();
const User = require("../models/UserSchema")
//add user

route.post('/user', (req, res) => {
  console.log(req.body);
  const userinsert = User.model(req.body);
  userinsert.save()
    .then((data) => {
      res.header({ 'location': `http://localhost:3001/api/user/?id=${data._id}` });
      res.status(201).json(data);
    }).catch((err) => res.status(422).json({ message: err.message }));
});
//get all player
route.get('/user', (req, res) => {
  User.model.find().then((data) => res.status(200).json(data))
    .catch((err) => res.status(422).json({ message: err }))

});
//get user by id
route.get('/user/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id).then((data) => res.status(200).json(data)).catch((err) => res.status(422).json({ message: err }))
});
module.exports = route;