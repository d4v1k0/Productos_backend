const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// crear el servidor
const app = express();
// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

const hostPermitido = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: (origin, callback) => {
    // Verificar si el origen es indefinido o null
    if (!origin) {
      // Permitir solicitudes no CORS (solicitudes directas)
      callback(null, true);
      return;
    }

    // Revisar si el host está en los hosts permitidos
    const existe = hostPermitido.some(dominio => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error('No permitido CORS'));
    }
  }
};
// Habilitar cors
app.use(cors(corsOptions));


// Rutas de la app
app.use('/', routes());

// carpeta publica
app.use(express.static('uploads'));

// puerto
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});