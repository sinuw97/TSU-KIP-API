import express from "express";
import { body } from "express-validator";

export const adminRouter = express.Router();

//Create admin account
adminRouter.post('/register', [
  body('name').isString().isLength({ min: 3 }),
  body('email').isString(),
  body('password').isLength({ min: 6 })
], createNewAdminController);
//Create mhs account
adminRouter.post('/users', verifyAdmin, createUserByAdminController);
//Update data mhs
adminRouter.put("/users/:user_id", verifyAdmin, updateUserByAdminController);
//Approve monev
adminRouter.patch('/monev/:user_id/approve', verifyAdmin, approveMonevController);
//Reject monev
adminRouter.patch('/monev/:user_id/reject', verifyAdmin, rejectMonevController);
//Revise monev
adminRouter.patch('/monev/:user_id/revise', verifyAdmin, reviseMonevController);