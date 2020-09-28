//Qui teniamo la logica che va a fare ognuna delle routes

const bcrypt = require('bcryptjs'); //è un pacchetto installato con npm bcryptjs
const Usuario = require('../models/usuario.model');
const { generarJWB } = require('../helpers/jwt');


const getUsuarios = async(request, response) => {

    const usuarios = await Usuario.find({}, 'nombre email role google'); //possiamo creare una specie di filtro solo per determinati campi così .find({}, 'nombre email role google');

    response.json({
        ok: true,
        usuarios
    });
}

const CrearUsuario = async(request, response) => {

    // console.log(request.body); //cosi leggo la info dal body

    const { email, password, nombre } = request.body; //estraiamo le info

    //qui gia è passato per il middleware check di express validator (in usuario.routes))
    // e nel caso ci siano stati errori, qui tengo disponibili tutti gli errori che sono passati per il middleware
    //qui li andiamo a catturare cos¡, importando prima il validator-result, :

    //abbiamo spostato il codice nel middleware personalizzato validar-campos per ottimizzare il codice

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return response.status(400).json({
                ok: false,
                msg: 'El correo ya està registrado'
            });
        }

        const usuario = new Usuario(request.body); //cosi ho una istanzia della classe con tutte le proprietà dentro al body

        //ecripta password
        const salt = bcrypt.genSaltSync(); //salt è un numero random che ci aiuta a encriptare tramite un hash a una sola via
        usuario.password = bcrypt.hashSync(password, salt);

        //Salvo usuario in DB
        await usuario.save(); //cosi si salva nel db

        //Generare il TOKEN - JWB (JSON WEB TOKEN)
        const token = await generarJWB(usuario.id);

        response.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado...revisar logs'
        });
    }
}

const ActualizarUsuario = async(request, response) => {
    //TODO: validar token y comprobar el usuario correcto

    const uid = request.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return response.status(404).json({
                ok: false,
                msn: 'No existe un usuario con ese id'
            });
        }
        //Actualizaciones
        const { password, google, email, ...campos } = request.body; //cosi la variabile campos già arriva dove la necessito senza password e senza google e senza email
        // con la destruturrazione {} è uguale a fare questi due passaggi qui sotto
        // delete campos.password;
        // delete campos.google;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return response.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        campos.email = email; //qui aggiungo l'email alla variabile campos che è la parte del body dove mi arrivano le info da aggiornare

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        response.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

const borrarUsuario = async(request, response) => {

    const uid = request.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return response.status(404).json({
                ok: false,
                msn: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        response.json({
            ok: true,
            msg: 'Usuario eliminado'
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
    getUsuarios,
    CrearUsuario,
    ActualizarUsuario,
    borrarUsuario
}