import express from "express";
import { createNewAdminController, createNewMhsAccByAdminController, updateUserByAdminController } from "../../controller/admin/adminUserController.js";
import { verifyAdmin } from "../../middleware/verifyAdmin.js";

export const adminRouter = express.Router();

//Create admin account
adminRouter.post('/register', verifyAdmin, createNewAdminController);
//Create mhs account
adminRouter.post('/new/user', verifyAdmin, createNewMhsAccByAdminController);
//Update data mhs
adminRouter.put("/users/edit/:user_id", verifyAdmin, updateUserByAdminController);
// //Approve monev
// adminRouter.patch('/monev/:user_id/approve', approveMonevController);
// //Reject monev
// adminRouter.patch('/monev/:user_id/reject', rejectMonevController);
// //Revise monev
// adminRouter.patch('/monev/:user_id/revise', reviseMonevController);