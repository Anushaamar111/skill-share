import express from "express";
import { register, login, fetchUser, logout, updateUser } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/authmiddleware.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route('/profile').get(isAuthenticated, fetchUser);
router.route('/logout').get(logout);
router.route('/updateProfile').put(isAuthenticated, upload.single('profilePhoto'), updateUser);

export default router;
