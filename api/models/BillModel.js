const mongoose = require("mongoose");

const BillSchema = mongoose.Schema(
    {
        CustomerName: {type: String, require: true},
        CustomerNumber: {type: String, require: true},
        PaymentMode: {type: String, require:true},
        SubTotal: {type: Number, require:true},
        cartItems: {type: Array, require:true},
        Tax: {type: Number, require:true},
        TotalAmount: {type: Number, require:true},
    },
    {timestamps:true}
);

const Bill = mongoose.model("Bills",BillSchema);
module.exports = Bill;