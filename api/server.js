const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = 5000;

dotenv.config();

const connect = async () => {
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDb ye bağlandı");
}catch (error){
            throw error;
    }
}


app.get("/",(req,res) => res.send("Hello World!"))

app.listen(port, () => {
    console.log(`Örnek ${port}`);
    connect();
});