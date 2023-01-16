import express from "express";
const router = express.Router();

import {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  getUserZoneCustomers,
  getSingleCustomer
} from "../controllers/customersController.js";

router.route("/").post(createCustomer).get(getAllCustomers);
router.route("/:id").get(getSingleCustomer).patch(updateCustomer).delete(deleteCustomer);
router.route("/zone/:id").get(getUserZoneCustomers)
export default router;
