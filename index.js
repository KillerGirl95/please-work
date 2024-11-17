const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const crud_router = require('./controller/crud')
const login_router = require('./controller/Login')

// Mongo DB Connections
mongoose.connect("mongodb://127.0.0.1:27017/please-work").then(response => {
    console.log('MongoDB Connection Succeeded.')
}).catch(error => {
    console.log('Error in DB connection: ' + error)
});


// Middleware Connections
app.use(cors())
app.use(express.json())


// Routes
app.use(crud_router)
app.use(login_router)

// Connection

app.listen(3000, () => {
    console.log('App running in port: ' + 3000)
})


