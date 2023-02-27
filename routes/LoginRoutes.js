const express = require('express');
const route = express.Router();
const User = require("../models/UserSchema");

route.post('/login', async (req, res) => {
    try {
        const useremail = req.body.user;
        const password = req.body.pass;
        const Val_UserBD = await User.findOne({ email: useremail }); //valida el correo electronico del usuario
        if (!Val_UserBD) {//valida si  trae contedio 
            res.status(422).json({ message: "El correo no exite" })
        }
        const passwordVal = await bcrypt.compare(password, Val_UserBD.password);
        if (!passwordVal) {//valida si  trae contedio 
            res.status(422).json({ message: "Contraseña invalida" })
        }
        //falta generar token 
        res.json({ message: "Bienvenido" })

    } catch (error) {//se cae si no se encuentra 
        res.status(422);
        res.json({ message: error.message + " No se encontro al equipo xx" });
    }
});


module.exports = route;
