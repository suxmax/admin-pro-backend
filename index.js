require('dotenv').config(); //.env
const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app = express();

//Configurar npm CORS
app.use(cors()); // il .use è un middleware , che sono funzioni che si esegue sempre per tutto il codice che cè dentro, ogni volta che si passa per questa funzione  

//Lettura e salvataggio body (campo dove arrivano le info dell'usuario)
app.use(express.json()); //deve andare prima delle rutas

//DB
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes')) //quasiasi petizione che passa per '/api/usuarios', va ad essere risposta per il require(...)
app.use('/api/login', require('./routes/auth.routes'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})