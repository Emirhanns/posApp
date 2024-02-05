const { model } = require("mongoose");
const Category = require("../models/CategoryModel.js");
const express = require("express");
const router = express.Router();

router.get("/get-all",async (req,res)=> {
    try{
        const categories = await Category.find();
        res.status(200).json(categories)
    }catch (error){
        console.log(error);
    }
})

router.post("/add-category", async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).json("Eleman ekleme başarılı");
    } catch (error) {
        res.status(400).json(error)
    }
})

router.put("/update-category",async (req,res)=> {
    try{
        await Category.findOneAndUpdate({_id:req.body.categoryId},req.body);
        res.status(200).json("Güncelleme Başarılı")
    }catch (error){
        console.log(error);
    }
})

router.delete("/delete-category",async (req,res)=> {
    try{
        await Category.findOneAndDelete({_id:req.body.categoryId});
        res.status(200).json("Silme Başarılı")
    }catch (error){
        console.log(error);
    }
})




module.exports = router;