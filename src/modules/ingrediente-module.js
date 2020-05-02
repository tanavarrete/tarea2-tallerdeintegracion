let mongoose = require('mongoose')

const { Schema } = mongoose;

const autoIncrementModelID = require("./counter-module");

const IngredienteSchema = new Schema(
  {
    id: { type: Number, unique:true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    path: { type: String , default: 'https://rocky-eyrie-23489.herokuapp.com/ingrediente/'},
    hamburguesas: [],
    __v: { type: Number, select: false}
  },
  { versionKey: false }
);

IngredienteSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID("activities", this, next);
});

const model = mongoose.model('Ingrediente', IngredienteSchema);
module.exports = model;