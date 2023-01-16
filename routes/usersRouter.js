import express from "express";
const router = express.Router();

import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").patch(updateUser).delete(deleteUser);

export default router;
