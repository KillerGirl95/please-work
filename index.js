require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const router = require('./routes/router');


// Mongo DB Connections
mongoose.connect(process.env.CON).then(response => {
    console.log('MongoAtlas Connection Succeeded.')
}).catch(error => {
    console.log('Error in DB connection: ' + error)
});

// Middleware Connections
app.use(cors())
app.use(express.json())

// router 
app.use(router)



// Connection
app.listen(process.env.PORT, () => {
    console.log('App running in port: ' + process.env.PORT)
})


