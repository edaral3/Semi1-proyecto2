const express = require('express');
const cors = require('cors');
const routes = require('./routes/route');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Inicializaciones
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.use(cors());

//Midlewares
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

//routes
app.use(routes);

//conexion a la base de datos 
mongoose.connect('mongodb://172.96.147.99:27017/usocialdb', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('database connected'))
    .catch(err => console.log(err));

//Inicio del servidor
app.listen(app.get('port'), () => {
    console.log("Servidor corriendo en el puerto " + app.get('port'));
});