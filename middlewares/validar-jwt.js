const { response } = require("express");
const jwt = require('jsonwebtoken');


const validarJWT = (request, response, next) => { //i middleware sono come qualsiasi altro controller però con il metodo next

    //Leggere il token-lo leggo dagli Headers
    const token = request.header('x-token');

    // console.log(token);

    if (!token) {
        return response.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
    //ora dobbiamo verificare il jwt
    try {
        const { uid } = jwt.verify(token, process.env.JWB_SECRET_KEY);

        // console.log(uid);
        request.uid = uid;

    } catch (error) {
        return response.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }


    next(); //senza questo, se tutto va bene, non esce mai da questo middleware e si blocca
}

module.exports = {
    validarJWT
}