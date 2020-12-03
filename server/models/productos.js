const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        unique: true
    },
    precioUni: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio'] 
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    disponible: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Producto', productoSchema);