require('dotenv').config(); //.env
const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app = express();

//Configurar npm CORS
app.use(cors()); // il .use è un middleware , che sono funzioni che si esegue sempre per tutto il codice che cè dentro, ogni volta che si passa per questa funzione  


//DB
dbConnection();
//Rutas
app.get('/', (request, response) => {
    response.json({
        ok: true,
        msg: 'Hola mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})