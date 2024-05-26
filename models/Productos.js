const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({
    nombre : {
        type: String,
        trim: true
    },
    ppv: {
        type: Number
    },
    sv: {
        type: Number
    },
    precio: {
        type: Number
    },
    imagen : {
        type: String
    }
});
module.exports = mongoose.model('Productos', productosSchema);