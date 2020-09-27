const mongoose = require('mongoose');
require('dotenv').config(); //.env


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }); //catena di connessione al nostro db
        console.log('db online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar el DB ver logs');
    }
}

module.exports = {
    dbConnection
}