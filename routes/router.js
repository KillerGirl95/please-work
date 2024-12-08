const express = require('express'); 
const { getall, Enter, getById, update, deleteById }= require('../controller/crud')
const { signin, signout, signup }= require('../controller/Sign');
const { Authorization } = require('../middleware/Authorization');

const router = express.Router();

router.post('/api/signup',signup)
router.post('/api/signin',signin)
router.get('/api/signout',signout)
router.get('/api',getall)
router.post('/api',Authorization, Enter)
router.get('/api/:id',getById)
router.put('/api/:id',Authorization, update)
router.delete('/api/:id', Authorization, deleteById)

module.exports= router ;