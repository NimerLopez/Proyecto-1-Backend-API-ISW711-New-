const express = require('express');
const route=express.Router();
const User =require("../models/UserSchema")
const New =require("../models/NewSchema")
//not using
//add user
route.post('/User',(req,res)=>{
    const userinsert = User.model(req.body);
    userinsert.save().then((data)=>res.json(data)).catch((err)=>res.json({message:err}))
  });

//get all player
route.get('/User',(req,res)=>{
    User.model.find().then((data)=>res.json(data)).catch((err)=>res.json({message:err}))
  });
//get all new
route.get('/new',(req,res)=>{
    New.find().then((data)=>res.json(data)).catch((err)=>res.json({message:err}))
  });

 //add new
 route.post('/new', async (req, res) => {
    try {
      let Id_user = await User.model.findById(req.body.user_id);//captura el usuario
      console.log(Id_user);
      if (Id_user) {//valida si existe el usuario
        let Newcon = new New(req.body);//captura dats de request
        console.log(Newcon);
        let savedNew = await Newcon.save();//guarda datos
        res.json(savedNew);
      } else {
        throw new Error('No se encontró el equipo');
      }
    } catch (error) {//se cae si no se encuentra 
      res.json({ message: error.message+ " No se encontro al equipo xx" });
    }
  });
  //update new 
 route.patch('/new/:id', async (req, res) => {
    try {
        const {id}=req.params;
        const { title, short_description,permalink,date,new_source_id ,user_id,category_id} = req.body;
        console.log(id); 
      let Id_user = await User.model.findById(req.body.user_id);//captura el usuario
      console.log(Id_user);
      if (Id_user) {//valida si existe el usuario
        //let savedNew = await Newcon.updateOne({ _id:id},{$set:Newcon});//guarda datos
        const savedNew = await New.findByIdAndUpdate(id, { title, short_description,permalink,date,new_source_id ,user_id,category_id}, { new: true });
        res.json(savedNew);
      } else {
        throw new Error('No se encontró el equipo');
      }
    } catch (error) {//se cae si no se encuentra 
      res.json({ message: error.message+ " No se encontro al equipo xx" });
    }
  });
  //delete new 
  route.delete('/new/:id',(req,res)=>{
    const {id}=req.params; 
    player.remove({ _id:id}).then((data)=>res.json("Elemento Eliminado")).catch((err)=>res.json({message:err}))
  });
module.exports=route;


