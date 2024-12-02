const express = require("express");

const Schema = require("../model/schema");
const router = express.Router();
const Authorization = require("../middleware/Authorization.js");

// router.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         let crud = new Schema(req.body);
//         crud = await crud.save();
//         (!crud) ? res.status(404).send('Document not found') : res.status(200).json(crud);
//     }

//     catch (error) {
//         res.status(500).send(error.message)
//     }
// })

router.post("/signup", async (req, res) => {
    console.log("Request received:", req.body);
    const { name, email, password } = req.body;
    try {
        let crud = new Schema(req.body);
        crud = await crud.save();
        !crud
            ? res.status(404).send("Document not found")
            : res.status(200).json(crud);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
