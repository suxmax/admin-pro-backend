const jwb = require('jsonwebtoken');


const generarJWB = (uid) => {
    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };
        jwb.sign(payload, process.env.JWB_SECRET_KEY, {
            expiresIn: '12h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se puedo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });

}

module.exports = {
    generarJWB
}