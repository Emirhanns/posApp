const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const port = 5000;

//routes

const CategoryRoute = require("./routes/categories.js")
const ProductRoute = require("./routes/products.js")
const BillRoute = require("./routes/bills.js")
const AuthRoute = require("./routes/auth.js")
const UserRoute = require("./routes/users.js")



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
app.use("/api/products",ProductRoute);
app.use("/api/bills",BillRoute);
app.use("/api/auth",AuthRoute);
app.use("/api/users",UserRoute);




app.use(cors())





app.listen(port, () => {
    console.log(`Örnek ${port}`);
    connect();
});