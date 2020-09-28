const { request, response } = require("express");
const { validationResult } = require('express-validator');

const validarCampos = (request, response, next) => { //il next si chiama se questo middleware passa (quindi continua con il seguente passo)

    const errores = validationResult(request);

    if (!errores.isEmpty()) { //significa che ci sono errori
        return response.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    //se passa il punto fino a qui significa che non ci sono errori
    next();
}

module.exports = {
    validarCampos //lo usiamo in usuario.routes
}