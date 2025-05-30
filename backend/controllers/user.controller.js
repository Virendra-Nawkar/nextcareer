import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js"
import bycrpt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Profiler } from "react";


export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            });
        };

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email',
                success: false
            });
        }

        const hashedPassword = await bycrpt.hash(password, 10);

        await User.create({
            fullname, email, phoneNumber, password: hashedPassword, role
        })

        return res.status(201).json({
            message: "Account Created Successfully",
            success: true
        });

    } catch (error) {
        console.log("Error in Creating new User", error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Incorrect Email',
                success: false
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: 'Incorrect Password',
                success: false
            });
        }

        // *Check if role is Correct or not
        if (role != user.role) {
            return res.status(400).json({
                message: "Account Donesn't exits with current role",
                success: false
            });
        }

        const tokenData = {
            userID: user._id,
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome Back ${user.fullname}`,
            user,
            success: true
        })

    } catch (error) {
        console.log("Error in Login ", error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout Successfully",
            success: true
        })
    } catch (error) {
        console.log("Error in Logout ", error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}
