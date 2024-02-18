const User = require("../models/UserModel.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs")


//Register
router.post("/register", async (req, res) => {
    try {
        const { UserName, Email, Password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(Password, salt)
        const newUser = new User({
            UserName,
            Email,
            Password: hashedPass,
        });
        await newUser.save();
        res.status(200).json("Kullanıcı Oluşturuldu");
    } catch (error) {
        res.status(500).json(error)
    }
})

//Login

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });
        if (!user) {
            return res.status(404).send({ error: "User not found!" });
          }
        const validPass = await bcrypt.compare(
            req.body.Password,
            user.Password
        );

        if (!validPass) {
            res.status(403).json("Yanlış Şifre")
        } else {
            res.status(200).json(user)
        }


    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;