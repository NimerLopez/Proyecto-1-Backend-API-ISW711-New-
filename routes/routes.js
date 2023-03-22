const express = require('express');
const route = express.Router();
const categoriesmo = require("../models/CategoriesSchema")
const User = require("../models/UserSchema")
//not using
//add user
// route.post('/user',(req,res)=>{
//     const userinsert = User.model(req.body);
//     userinsert.save().then((data)=>res.json(data)).catch((err)=>res.json({message:err}))
//   });

//get all Categories
route.get('/categories/public', (req, res) => {
  categoriesmo.model.find().then((data) => res.json(data)).catch((err) => res.json({ message: err }))
});


module.exports = route;


