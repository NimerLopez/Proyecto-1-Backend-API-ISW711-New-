const express = require('express');
const mongoose = require('mongoose');
const tokenD = require('jsonwebtoken');
const dotv = require('dotenv').config();
const userRoute = require('./routes/UserRoutes')
const newRoute = require('./routes/NewRoutes')
const newSoruceRoute = require('./routes/NewSourceRoutes')
const categories = require('./routes/CategoryRoutes')
const login = require('./routes/LoginRoutes')
const public = require('./routes/routes');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


//npm init
//npm i express mongoose nodemon dotenv//2
// npm i cors
//npm install rss-parser
//npm install bcrypt

//middleware
app.use('/api', public);
app.use('/api', userRoute);
app.use('/api', login);
app.use(function (req, res, next) { //valida token
  const authHeader = req.headers['authorization'];//obtinen el token
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No se proporciono un token de autorización.' });
  }

  tokenD.verify(token, "nimer1", (err, user) => {//verifica y decodifica el token
    if (err) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    req.tokeng = user;// Almacena el usuario en el objeto de solicitud para su uso posterior
    console.log(req.tokeng);
    next();
  });
});
app.use('/api', newRoute);
app.use('/api', newSoruceRoute);
function isAdmin(req, res, next) {
  // check if token is present
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  tokenD.verify(token, "nimer1", (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado: solo los administradores pueden acceder a esta ruta.' });
    }
    next();
  });
}
app.use('/api', isAdmin, categories);

app.get("/", (req, res) => {
  res.send("Welcome");
})

//mongoose connect
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Conected to mongodb')).catch((error) => console.error(error));

app.listen(3001, () => {
  console.log(`Server Started at ${3001}`)
});

