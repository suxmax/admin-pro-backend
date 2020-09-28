const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWB } = require('../helpers/jwt');


const login = async(request, response) => {

    const { email, password } = request.body; //estraiamo password ed email dal body

    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({ email }); //cosi cerco un usuario per la email
        if (!usuarioDB) {
            return response.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password); //questo ritorna un true se incontra le password uguali, le compara

        if (!validPassword) {
            return response.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //Generare il TOKEN - JWB (JSON WEB TOKEN)
        const token = await generarJWB(usuarioDB.id);

        response.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}



module.exports = {
    login
}