const express = require('express');
const route = express.Router();
const User = require("../models/UserSchema");
const jwt = require('jsonwebtoken');

route.post('/login', async (req, res) => {
    try {
        const useremail = req.body.email;
        const password = req.body.pass;
        const val_UserBD = await User.model.findOne({ email: useremail }); //valida el correo electronico del usuario
        if (!val_UserBD) {//valida si  trae contedio 
            return res.status(200).json({ message: "Datos Incorrectos" })
        }
        console.log(val_UserBD.password);
        console.log(password);

        if (password === val_UserBD.password) {
            const useDate = {
                id: val_UserBD._id,
                role: val_UserBD.role // <-- role property included in payload
            };
            const token = jwt.sign(useDate, "nimer1");
            return res.status(200).json(token);
        } else {
            return res.status(200).json({ message: "Datos Incorrectos" })
        }



    } catch (error) {//se cae si no se encuentra 
        res.status(422);
        res.json({ message: error.message + " Datos Incorrectos" });
    }
});


module.exports = route;
