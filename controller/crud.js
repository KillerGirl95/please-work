const { Router } = require('express');
const router = Router();
const bookSchema = require('../model/book.js')
const Authorization = require('../middleware/Authorization.js')

// Get all cruds
exports.getall = async(req, res) => {
    try {
        const crud = await bookSchema.find();
        (crud.length) ?res.status(200).json(crud): res.status(404).send('Document not found')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Create a new crud
exports.Enter = async (req, res) => {
    try {
        let crud = new bookSchema(req.body);
        crud = await crud.save();
        (!crud) ? res.status(404).send('Document not found') : res.status(200).json(crud);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Get crud By ID
exports.getById= async (req, res) => {
    try {
        const crud = await bookSchema.findById(req.params.id);
        (!crud) ? res.status(404).send('Document not found') : res.status(200).json(crud)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Update crud By ID
exports.update= async (req, res) => {
    try {
        const crud = await bookSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        (!crud) ? res.status(404).send('Document not found') : res.status(200).json(crud)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Delete crud By ID
exports.deleteById= async (req, res) => {
    try {
        const crud = await bookSchema.findByIdAndDelete(req.params.id);
        (!crud) ? res.status(404).send('Document not found') : res.status(200).json(crud)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
