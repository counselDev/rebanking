
import express from "express";
const router = express.Router();

import {
  createTransaction,
  getAllTransactions,
  getUserZoneTransactions,
  getSingleUserTransactions
} from "../controllers/transactionController.js";

router.route("/").get(getAllTransactions).post(createTransaction);
router.route("/user").get(getSingleUserTransactions);
router.route("/:id").get(getUserZoneTransactions)

export default router;
