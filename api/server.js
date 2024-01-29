const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const port = 5000;

//routes

const CategoryRoute = require("./routes/categories.js")


dotenv.config();

const connect = async () => {
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDb ye bağlandı");
}catch (error){
            throw error;
    }
};

//middlewares
app.use(express.json());
app.use("/api/categories",CategoryRoute);
app.use(cors())





app.listen(port, () => {
    console.log(`Örnek ${port}`);
    connect();
});