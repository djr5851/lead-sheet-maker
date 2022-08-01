import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin = async (req, res) => {
    const { username, pass } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist"}); 
        const isPasswordCorrect = await bcrypt.compare(pass, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went awry" });
    }
}

export const signup = async (req, res) => {
    const { username, pass, confirmPass } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "User ardy exists"});
        if (pass !== confirmPass) return res.status(400).json({ message: "Passwords do not match" });
        const hashedPass = await bcrypt.hash(pass, 12);
        const result = await User.create({ username, password: hashedPass })
        const token = jwt.sign({ username: result.username, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went awry" });
    }
}