const express = require("express");

const router = express.Router();

const Hamburguesa = require("../modules/hamburguesa-module");
const Ingrediente = require("../modules/ingrediente-module");

router.get("/hamburguesa", async (req, res) => {
  try {
    const hamburguesas = await Hamburguesa.find()
      .select("id nombre precio descripcion imagen -_id")
      .populate("ingredientes", "path -_id")
      .sort({ id: 1 });
    res.send({status: "resultados obtenidos", data: hamburguesas });
  } catch (error) {
    if (error) {
      console.log("ERROR getting hamburguesas:", error);
      res.status(500).send({ status: "ERROR", data: error.message });
    }
  }
});

router.post("/hamburguesa", async (req, res) => {
  try {
    const { nombre, precio, descripcion, imagen } = req.body;
    console.log(req.body);
    if (nombre && precio && descripcion && imagen) {
      const hamburguesa = new Hamburguesa();
      hamburguesa.nombre = nombre;
      hamburguesa.precio = precio;
      hamburguesa.descripcion = descripcion;
      hamburguesa.imagen = imagen;

      await hamburguesa.save();

      res.status(201).send(hamburguesa);
    } else throw "input invalidos";
  } catch (error) {
    res.status(400).send("input invalido");
  }
});
router.get("/hamburguesa/:id", async (req, res) => {
  try {
    const hamburguesa = await Hamburguesa.findOne({ id: req.params.id })
      .select("id nombre precio descripcion imagen -_id")
      .populate("ingredientes", "path -_id");
    if (hamburguesa) res.send({ status: "operacion exitosa", data: hamburguesa });
    else res.status(404).send("hamburguesa inexistente");
  } catch (err) {
    if (err) res.status(400).send("id invalido");
  }
});
router.delete("/hamburguesa/:id", async (req, res) => {
  try {
    const hamburguesa = await Hamburguesa.deleteOne({ id: req.params.id });
    if (hamburguesa.deletedCount) res.send("hamburguesa eliminada");
    else res.status(404).send("hamburguesa inexistente");
  } catch (err) {
    if (err) res.status(400).send("id invalido");
  }
});

router.patch("/hamburguesa/:id", async (req, res) => {
  try {
    const hamburguesa = await Hamburguesa.findOne({
      id: req.params.id,
    });
    if (hamburguesa) {
      if (req.body.nombre) hamburguesa.nombre = req.body.nombre;
      if (req.body.precio) hamburguesa.precio = req.body.precio;
      if (req.body.descripcion) hamburguesa.descripcion = req.body.descripcion;
      if (req.body.imagen) {
        hamburguesa.imagen = req.body.imagen;
      }
      hamburguesa.save().then(() => {
        res.jsonp({status: "operacion exitosa", data: hamburguesa });
      });
    } else res.status(404).send("hamburguesa inexistente");
  } catch (err) {
    if (err) res.status(400).send("id invalido");
  }
});

router.put(
  "/hamburguesa/:hamburguesaId/ingrediente/:ingredienteId",
  async (req, res, next) => {
    try {
      const hamburguesaId = req.param("hamburguesaId");
      const hamburguesa = await Hamburguesa.findOne({ id: hamburguesaId });
      if (!hamburguesa) {
        res.status(400).send("Id de hamburguesa inválido");
      }
      const ingredienteId = req.param("ingredienteId");
      const ingrediente = await Ingrediente.findOne({ id: ingredienteId });
      if (!ingrediente) {
        res.status(404).send("ingrediente inexistente");
      }

      const update = await Hamburguesa.findOneAndUpdate(
        { id: hamburguesaId },
        { $push: { ingredientes: ingrediente } },
        { new: true }
      );
      const update2 = await Ingrediente.findOneAndUpdate(
        { id: ingredienteId },
        { $push: { hamburguesas: hamburguesa } },
        { new: true }
      );
      if (update)
        res.status(201).send("Ingrediente agregado");
    } catch (err) {
      if (err) res.status(400).send(err);
    }
  }
);
router.delete(
  "/hamburguesa/:hamburguesaId/ingrediente/:ingredienteId",
  async (req, res, next) => {
    try {
      const hamburguesaId = req.param("hamburguesaId");
      const hamburguesa = await Hamburguesa.findOne({ id: hamburguesaId });
      if (!hamburguesa) {
        res.status(400).send("Id de hamburguesa inválido");
      }
      const ingredienteId = req.param("ingredienteId");
      const ingrediente = await Ingrediente.findOne({ id: ingredienteId });
      if (!ingrediente) {
        res.status(404).send("ingrediente inexistente");
      }
      const update = await Hamburguesa.findOneAndUpdate(
        { _id: hamburguesa._id },
        { $pullAll: { ingredientes: [ingrediente._id] } },
        { new: true } 
      );
      const update2 = await Hamburguesa.findOneAndUpdate(
        { _id: hamburguesa._id },
        { $pullAll: { hamburguesas: [hamburguesa._id] } },
        { new: true } 
      );
      if (update)
        res.send("Ingrediente eliminado");
    } catch (err) {
      if (err) res.status(400).send(err);
    }
  }
);

module.exports = router;
