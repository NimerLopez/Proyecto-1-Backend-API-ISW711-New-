const express = require('express');
const route=express.Router();
const Categories =require("../models/CategoriesSchema")
//add Categories

route.post('/categories',(req,res)=>{

    const Categoriesinsert = Categories.model(req.body);
    console.log(Categoriesinsert.firstname);
    Categoriesinsert.save().then((data)=>res.status(201).json(data)).catch((err)=>res.status(422).json({ message: err.message }));
});
//get all player
route.get('/categories',(req,res)=>{
    Categories.model.find().then((data)=>res.json(data))
    .catch((err)=>res.json({message:err}))
    
  });
//get Categories by id
route.get('/categories/:id',(req,res)=>{
    const {id}=req.params; 
    Categories.model.findById(id).then((data)=>res.json(data)).catch((err)=>res.json({message:err}))
  });
module.exports=route;