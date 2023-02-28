const express = require('express');
const route = express.Router();
const User = require("../models/UserSchema");
const jwt = require('jsonwebtoken');

route.post('/login', async (req, res) => {
    try {
        const useremail = req.body.email;
        const password = req.body.pass;
        const Val_UserBD = await User.model.findOne({ email: useremail }); //valida el correo electronico del usuario
        if (!Val_UserBD) {//valida si  trae contedio 
            return res.status(422).json({ message: "El correo no exite" })
        }
        console.log(Val_UserBD.password);
        console.log(password);

        if (password === Val_UserBD.password) {
            const token = jwt.sign({ id: Val_UserBD._id }, "nimer1");
            res.json({ id: Val_UserBD._id, token });

        } else {
            return res.status(422).json({ message: "Contraseña invalida" })
        }



    } catch (error) {//se cae si no se encuentra 
        res.status(422);
        res.json({ message: error.message + " Datos Incorrectos" });
    }
});


module.exports = route;
