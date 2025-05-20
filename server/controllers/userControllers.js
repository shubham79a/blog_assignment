import User from '../models/user.js'
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


// user register 
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // check user already exist or not
        const exists = await User.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exist" })
        }

        // validating email 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        // token
        const token = createToken(user._id)
        res.json({ success: true, token, message: "Account Created" })
        console.log(token);



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


// user login 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            res.json({ success: false, message: "Create an account first" })
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token, user })
        }
        else {
            res.json({ success: false, message: "Invalid Crendentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { loginUser, registerUser }