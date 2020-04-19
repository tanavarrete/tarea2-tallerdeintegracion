let mongoose = require('mongoose')

const { Schema } = mongoose;

const IngredienteSchema = new Schema(
  {
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const model = mongoose.model('Ingrediente', IngredienteSchema);
module.exports = model;