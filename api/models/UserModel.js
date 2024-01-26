const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        UserName: {type: String, require: true},
        Email: {type: String, require: true},
        Password: {type: String, require:true},
    },
    {timestamps:true}
);

const User = mongoose.model("Users",UserSchema);
module.exports = User;