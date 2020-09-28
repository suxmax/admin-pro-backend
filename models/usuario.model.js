const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: "USER_ROLE"
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function() { //questo solo per scopi visivi, in quanto mongo usa _id e noi vogliamo uid
    const { __v, _id, password, ...object } = this.toObject(); //cosi estraggo queste info dall'oggetto(in questo caso non mostro la password dopo la richiesta, cioe non ritorno questo valore)
    object.uid = _id;
    return object;
})

module.exports = model("Usuario", UsuarioSchema);