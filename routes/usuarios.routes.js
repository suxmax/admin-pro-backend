/*
Ruta: /api/usuarios
*/

const { Router } = require('express');
const { getUsuarios, CrearUsuario, ActualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controller')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios); //( , qui va il middleware, ) prima si esegue il middleware e poi il controller

router.post('/', [ //acqui [] pongo los middleware que necesito, en este caso para validar los campos (hemos instalado el pauqete express-validator)

        check('nombre', 'El nombre es obligatorio').not().isEmpty(), //check è un middleware, facciamo un middleware per ogni campo che vogliamo validare   
        check('password', 'El password es obligatorio').not().isEmpty(), //gli posso mandare i messaggi personalizzati di errore
        check('email', 'El correo es obligatorio').isEmail(),
        validarCampos, //qui dopo i checks andiamo a chiamare il middleware personalizzato cos¡ fa tutte le verifiche
    ],
    CrearUsuario);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').not().isEmpty(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    ActualizarUsuario);


router.delete('/:id', validarJWT, borrarUsuario)

module.exports = router;