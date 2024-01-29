const { model } = require("mongoose");
const Category = require("../models/CategoryModel.js");
const express = require("express");
const router = express.Router();

router.post("/add-category", async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).json("Eleman ekleme başarılı");
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;