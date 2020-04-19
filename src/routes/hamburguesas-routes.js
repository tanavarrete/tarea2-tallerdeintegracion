const express = require('express')

const router = express.Router()

const Hamburguesa = require('../modules/hamburguesa-module');

router.get('/hamburguesa', async(req, res) => {

    try {
        const hamburguesas = await Hamburguesa.find()
        .select('id nombre precio descripcion imagen')
        .populate('ingredientes');
        res.send({  hamburguesas });
    } catch (error) {
        if (error){
            console.log('ERROR getting hamburguesas:', error);
            res.status(500).send({ status: 'ERROR', data: error.message });}
    }
  })

router.post('/hamburguesa', async(req,res) =>{
    try {
        const { nombre, precio, descripcion, imagen } = req.body;
        console.log(req.body)
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
router.get('/hamburguesa/:id', async (req, res) => {
    try {
        Hamburguesa.find({"id" : req.params.id }, function (err, hamburguesa) {
            res.send({ hamburguesa})
        })}
    catch(err){
        if (err)
                res.send(err);
        }
})
router.delete('/hamburguesa/:id', (req, res) => {
    Hamburguesa.remove({ "id": req.params.id }, function(err) {
        if (!err) {
            res.send('Hamburguesa eliminada!');
        }
        else {
            res.send(err);
        }
    });
})

router.patch('/hamburguesa/:id', (req, res) => {
    Hamburguesa.findOne({
        "id": req.params.id
      })
      .then((hamburguesa) => {
        hamburguesa.nombre = req.body.nombre;
        hamburguesa.precio = req.body.precio;
        hamburguesa.descripcion = req.body.descripcion;
        hamburguesa.imagen = req.body.imagen;
        hamburguesa
          .save()
          .then(() => {
            res.jsonp({ hamburguesa }); // enviamos la boleta de vuelta
          });
      });
        
})

router.put('/hamburguesa/:hamburguesaId/ingrediente/:ingredienteId', (req, res, next) => {
    res.send(`You have requested a person ${req.param('hamburguesaId')} ${req.param('ingredienteId')}`)
})
  
  

module.exports = router
