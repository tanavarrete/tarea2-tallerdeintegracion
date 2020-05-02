const express = require("express");

const router = express.Router();

const Ingrediente = require("../modules/ingrediente-module");
router.get("/ingrediente", async (req, res) => {
  try {
    const ingredientes = await Ingrediente.find(
      {},
      { _id: 0, id: 1, nombre: 1, descripcion: 1 }
    ).sort({ id: 1 });
    res.send({ ingredientes });
  } catch (error) {
    if (error) {
      console.log("ERROR getting ingredientes:", error);
      res.status(500).send({ status: "ERROR", data: error.message });
    }
  }
});
router.post("/ingrediente", async (req, res) => {
  try {
    const {  nombre, descripcion } = req.body;
    console.log(nombre);
    const ingrediente = new Ingrediente();

    ingrediente.nombre = nombre;
    ingrediente.descripcion = descripcion;

    await ingrediente.save();

    ingrediente.path = "https://rocky-eyrie-23489.herokuapp.com/ingrediente/" + ingrediente.id;

    await ingrediente.save();
    res.status(201).send( ingrediente );
  } catch (error) {
    res.status(400).send("input ivalido");
    }
});

router.get("/ingrediente/:id", async (req, res) => {
  try {
    const ingrediente = await Ingrediente.findOne({ id: req.params.id })
      .select({ _id: 0, id: 1, nombre: 1, descripcion: 1 })
    if (ingrediente) res.send({ ingrediente });
    else res.status(404).send("ingrediente inexistente");
  } catch (err) {
    if (err) res.status(400).send("id invalido");
  }
});
router.delete("/ingrediente/:id", async (req, res) => {
try {
  const ingrediente = await Ingrediente.findOne({ id: req.params.id });
  console.log(ingrediente)
  console.log(ingrediente.hamburguesas[0])
  if (!ingrediente.hamburguesas[0]){
    const ingrediente = await Ingrediente.deleteOne({ id: req.params.id });
    if (ingrediente.deletedCount) res.send("ingrediente eliminado");
    res.status(404).send("ingrediente inexistente");
  }
  else{
    res.status(409).send("Ingrediente no se puede borrar, se encuentra presente en una hamburguesa");
  }
} catch (err) {
  console.log("ERROR getting ingredientes:", err);
  if (err) res.status(400).send("id invalido");
}
});

module.exports = router;
