const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const port = 5000;
const app = express();
const logger = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/api/recommendations', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    pathRewrite: {
      '^/api/recommendations': '/api/recommendations',
    },
    logLevel: 'debug',
  }));

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb ye bağlandı");
    } catch (error) {
        throw error;
    }
};


// CORS middleware'ini rotalardan önce tanımla
app.use(cors({
    origin: 'http://localhost:3000' // React uygulamanızın çalıştığı port
}));


//routes
app.get('/', (req, res) => res.send('Merhaba sunucudan!'));

const CategoryRoute = require("./routes/categories.js")
const ProductRoute = require("./routes/products.js")
const BillRoute = require("./routes/bills.js")
const AuthRoute = require("./routes/auth.js")
const UserRoute = require("./routes/users.js")

//middlewares

app.use(express.json());
app.use("/api/categories",CategoryRoute);
app.use("/api/products",ProductRoute);
app.use("/api/bills",BillRoute);
app.use("/api/auth",AuthRoute);
app.use("/api/users",UserRoute);
app.use(logger("dev"));



app.listen(port, () => {
    console.log(`Örnek port: ${port}`);
    connect();
});




