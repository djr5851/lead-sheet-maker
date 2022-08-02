import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Song from '../models/song.js';

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

export const deleteAccount = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (req.userId === user._id.toString()) {
            await Song.deleteMany({ userId: user._id });
            await user.delete();
            res.status(200).send();
        }
        else {
            res.status(403).send();
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
    }
}

export const changePassword = async (req, res) => {

    try {
        const { currentPass, newPass, confirmNewPass } = req.body;
        if (newPass !== confirmNewPass) return res.status(400).json({ message: "Passwords do not match" });

        const user = await User.findById(req.params.id);

        if (req.userId === user._id.toString()) {
            const isPasswordCorrect = await bcrypt.compare(currentPass, user.password);
            if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
            const newHashedPass = await bcrypt.hash(newPass, 12);
            user.password = newHashedPass;
            await user.save();
            res.status(200).send();
        }
        else {
            res.status(403).send();
        }
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}