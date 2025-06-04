import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js"
import bycrpt from "bcryptjs"
import jwt from "jsonwebtoken"
import cloudinary from "../../backend/utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";



export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            });
        };

        const file = req.file
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email',
                success: false
            });
        }

        const hashedPassword = await bycrpt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                bio: "",
                skills: [],
                profilePhoto: cloudResponse.secure_url,
            }
        });

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

        let user = await User.findOne({ email });
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
            userId: user._id,
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
    // Debug logs to inspect incoming request
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);
    console.log("REQ.ID:", req.id);

    // Check if request body exists
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing",
        success: false
      });
    }

    // Destructure and extract data
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    let cloudResponse = null;

    // Only process file if it's uploaded
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    // Split skills if provided
    let skillsArray = [];
    if (skills && typeof skills === 'string' && skills.trim() !== "") {
      skillsArray = skills.split(",").map(skill => skill.trim());
    }

    // Validate req.id from middleware
    const userId = req.id;
    if (!userId) {
      console.error("Missing req.id - isAuthenticated middleware might be broken");
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    // Find user by ID
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    // Conditionally update fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray.length > 0) user.profile.skills = skillsArray;

    // Save resume info only if file was uploaded
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    // Prepare response (no sensitive data)
    const responseUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res.status(200).json({
      message: "Profile updated Successfully",
      user: responseUser,
      success: true
    });

  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
