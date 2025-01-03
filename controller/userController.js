import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { deleteMedia, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role, username } = req.body;
    console.log("Register request recieved");
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
      username,
    });
    generateToken(res, newUser, `Welcome ${newUser.fullName}`);
  } catch (error) {
    console.error("Error in register controller", error);
    return res.status(500).json({
      message: "Failed to create an account",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    generateToken(res, user, `Welcome back ${user.fullName}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to login",
      success: false,
    });
  }
};

export const logout = (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("error logging out", error);
    return res.status(500).json({
      message: "Failed to logout",
      success: false,
    });
  }
};

export const fetchUser = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("error logging out", error);
    return res.status(500).json({
      message: "Failed to logout",
      success: false,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    //extract publicId from photoUrl
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0]; //public Id extraction
      deleteMedia(publicId);
    }

    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;

    const updateData = {
      name,
      photoUrl,
    };
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log("error updating data");
    return res.status(500).json({
      message: "Failed to update profile",
      success: false,
    });
  }
};
