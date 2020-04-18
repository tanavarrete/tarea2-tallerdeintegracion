const express = require('express')

const router = express.Router()

const Hamburguesa = require('../modules/hamburguesa-module');

router.post('/hamburguesa', async(req,res) =>{
    try {
        const { nombre, precio, descripcion, imagen } = req.body;
        console.log(nombre)
        const hamburguesa = new Hamburguesa();
        hamburguesa.nombre = nombre;
        hamburguesa.precio = precio;
        hamburguesa.descripcion = descripcion;
        hamburguesa.imagen = imagen;

        await hamburguesa.save();

        res.send({ status: 'OK', message: 'Hamburguesa Created' });
    } catch (error) {
        if (error.code && error.code === 11000) {
          res
            .status(400)
            .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
          return;
        }
        //console.log('creating user ERROR', error);
        res.status(500).send({ status: 'ERROR', message: error.message });
      }
    })

router.get('/hamburguesa/:name', (req, res) => {
    res.send(`You have requested a hamburguer ${req.params.name}`)
  })

module.exports = router
