import express from "express";
import {
  allUserController,
  getDetailProfileByIdController,
  loginController,
  registerController,
  updateUserController,
  uploadAvatarController,
} from "../../controller/users/userController.js";
import upload from "../../middleware/uploadAvatar.js";

export const userRouter = express.Router();

//Get all users
userRouter.get("/", allUserController);
//Login
userRouter.post("/login", loginController);
//Register
userRouter.post("/register", registerController);
//Get user profile by id
userRouter.get("/:user_id", getDetailProfileByIdController);
//Edit user profile
userRouter.patch("/edit/:user_id", updateUserController);
//Upload/Edit avatar
userRouter.patch("/edit/:user_id/avatar", upload.single("avatar"), uploadAvatarController);