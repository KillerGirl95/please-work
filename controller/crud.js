const { Router } = require('express');
const router = Router();
const Schema = require('../model/schema')
const Authorization = require('../middleware/Authorization.js')

// Get all cruds
router.get('/', Authorization, async(req, res) => {
    try {
        const crud = await Schema.find();
        (crud.length) ?res.status(200).json(crud): res.status(404).send('Document not found')
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Create a new crud
router.post('/', Authorization, async (req, res) => {
    try {
        let crud = new Schema(req.body);
        crud = await crud.save();
            (!crud) ? res.status(404).send('Document not found') : res.status(200).json(crud)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Get crud By ID
router.get('/:id', Authorization, async (req, res) => {
    try {
        const crud = await Schema.findById(req.params.id);
            (!crud) ? res.status(404).send('Document not found') : res.status(200).json(crud)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update crud By ID
router.put('/:id', Authorization, async (req, res) => {
    try {
        const crud = await Schema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        (!crud) ? res.status(404).send('Document not found') : res.status(200).json(crud)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete crud By ID
router.delete('/:id', Authorization, async (req, res) => {
    try {
        const crud = await Schema.findByIdAndDelete(req.params.id);
        (!crud) ? res.status(404).send('Document not found') : res.status(200).json(crud)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router