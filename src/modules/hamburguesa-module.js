let mongoose = require('mongoose')

const { Schema } = mongoose;

const autoIncrementModelID = require('./counter-module');

const HamburguesaSchema = new Schema(
  {
    id: { type: Number, unique: true, min: 1 },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, require: true },
    ingredientes    : [ { type: Schema.Types.ObjectId, ref: 'Ingrediente' } ]
  }
);

HamburguesaSchema.pre('save', function (next) {
    if (!this.isNew) {
      next();
      return;
    }
  
    autoIncrementModelID('activities', this, next);
  });

const model = mongoose.model('Hamburguesa', HamburguesaSchema);
module.exports = model;