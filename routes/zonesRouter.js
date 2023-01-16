import express from "express";
const router = express.Router();

import {
  createZone,
  getAllZones,
  updateZone,
  deleteZone,
} from "../controllers/zonesController.js";

router.route("/").post(createZone).get(getAllZones);
router.route("/:id").patch(updateZone).delete(deleteZone);

export default router;
