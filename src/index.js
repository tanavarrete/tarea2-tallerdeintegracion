
const express = require('express')
const app = express()

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const hamburguesaRoute = require('./routes/hamburguesas-routes')
const ingredienteRoute = require('./routes/ingredientes-routes')

app.use(hamburguesaRoute)
app.use(ingredienteRoute)

app.use(express.static('public'))

console.log("correcto")
// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!')
  })
  
// Handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
    })


const PORT = process.env.PORT || 3000
mongoose
  .connect('mongodb://test:test@tarea2-ti-shard-00-00-hun3n.gcp.mongodb.net:27017,tarea2-ti-shard-00-01-hun3n.gcp.mongodb.net:27017,tarea2-ti-shard-00-02-hun3n.gcp.mongodb.net:27017/test?ssl=true&replicaSet=tarea2-ti-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conected to MONGODB');
    app.listen(PORT, () => {
      console.log(`Server has started on ${PORT}`);
    });
  })
  .catch(error => {
    console.log('MongoDB error', error);
  });

