const express = require('express')

const router = express.Router()

const Ingrediente = require('../modules/ingrediente-module');
router.get('/ingrediente', async(req, res) => {

    try {
        const ingredientes = await Ingrediente.find()
        .select('id nombre descripcion ')
        .populate('ingredientes');
        res.send({  ingredientes });
    } catch (error) {
        if (error){
            console.log('ERROR getting ingredientes:', error);
            res.status(500).send({ status: 'ERROR', data: error.message });}
    }
  })
router.post('/ingrediente', async(req,res) =>{
    try {
        const { id, nombre, descripcion } = req.body;
        console.log(nombre)
        const ingrediente = new Ingrediente();

        ingrediente.id = id;
        ingrediente.nombre = nombre;
        ingrediente.descripcion = descripcion;

        await ingrediente.save();

        res.send({ status: 'OK', message: 'Ingrediente Created' });
    } 
    catch (error) {
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

router.get('/ingrediente/:id', async (req, res) => {
    try {
        Ingrediente.find({"id" : req.params.id }, function (err, ingrediente) {
            res.send({ ingrediente})
        })}
    catch(err){
        if (err)
                res.send(err);
        }
})
router.delete('/ingrediente/:id', (req, res) => {
    Ingrediente.remove({ "id": req.params.id }, function(err) {
        if (!err) {
            res.send('Ingrediente eliminado!');
        }
        else {
            res.send(err);
        }
    });
})


module.exports = router