const express = require('express'); 
const { getall, Enter, getById, update, deleteById }= require('../controller/crud')
const { signin, signout }= require('../controller/Sign');
const { Authorization } = require('../middleware/Authorization');

const router = express.Router();

router.post('/signin',signin)
router.get('/signout',signout)
router.get('/',getall)
router.post('/',Authorization, Enter)
router.get('/:id',getById)
router.put('/:id',Authorization, update)
router.delete('/:id', Authorization, deleteById)

module.exports= router ;