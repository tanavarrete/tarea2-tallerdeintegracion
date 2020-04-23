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
    const { id, nombre, descripcion } = req.body;
    console.log(nombre);
    const ingrediente = new Ingrediente();

    ingrediente.id = id;
    ingrediente.nombre = nombre;
    ingrediente.descripcion = descripcion;
    ingrediente.path = "http://localhost:3000/ingrediente/" + id;

    await ingrediente.save();
    res.status(201).send({ status: "OK", message: "Ingrediente Creada" });
  } catch (error) {
    res.status(400).send("input invalido");
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
  const ingrediente = await Ingrediente.deleteOne({ id: req.params.id });
  if (ingrediente.deletedCount) res.send("ingrediente eliminado");
  else res.status(404).send("ingrediente inexistente");
} catch (err) {
  if (err) res.status(400).send("id invalido");
}
});

module.exports = router;
