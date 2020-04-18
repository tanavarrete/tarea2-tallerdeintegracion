let mongoose = require('mongoose')

const { Schema } = mongoose;

const HamburguesaSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    imagen: [{ type: String, require: true }],
    ingredientes    : [ { type: Schema.Types.ObjectId, ref: 'Ingrediente' } ]
  },
  {
    timestamps: true
  }
);

const model = mongoose.model('Hamburguesa', HamburguesaSchema);
module.exports = model;