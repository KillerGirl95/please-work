const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const router = require('./routes/router');


// Mongo DB Connections
mongoose.connect("mongodb+srv://bla:bla@cluster0.wbdix.mongodb.net/library?retryWrites=true&w=majority").then(response => {
    console.log('MongoAtlas Connection Succeeded.')
}).catch(error => {
    console.log('Error in DB connection: ' + error)
});

// Middleware Connections
app.use(cors())
app.use(express.json())

// router connections 
app.use(router)



// Connection
app.listen(3000, () => {
    console.log('App running in port: ' + 3000)
})


