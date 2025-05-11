import express from "express";
import {
  // allUserController,
  getDetailProfileByIdController,
  loginController,
  updateUserController,
  uploadAvatarController,
  uploadLaporanMonevController,
} from "../../controller/users/userController.js";
import { authenticate, authorizeUserOrAdmin } from "../../middleware/userAuth.js";
import upload from "../../middleware/uploadAvatar.js";

export const userRouter = express.Router();

//Login
userRouter.post("/login", loginController);
//Get user profile by id
userRouter.get("/:user_id", authenticate, authorizeUserOrAdmin, getDetailProfileByIdController);
//Edit user profile
userRouter.patch("/edit/:user_id", authenticate, authorizeUserOrAdmin, updateUserController);
//Upload/Edit avatar
userRouter.patch("/edit/:user_id/avatar", authenticate, authorizeUserOrAdmin, upload.single("avatar"), uploadAvatarController);
//Upload monev
userRouter.post("/monev/post", authenticate,authorizeUserOrAdmin, uploadLaporanMonevController);


// //Register
// userRouter.post("/register", registerController);
// //Get all users
// userRouter.get("/", allUserController);