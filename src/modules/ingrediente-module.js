let mongoose = require('mongoose')

const { Schema } = mongoose;

const IngredienteSchema = new Schema(
  {
    id: { type: Number, required: true, unique:true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    path: { type: String , default: 'http://localhost:3000/ingrediente/'},
    __v: { type: Number, select: false}
  },
  { versionKey: false }
);

const model = mongoose.model('Ingrediente', IngredienteSchema);
module.exports = model;