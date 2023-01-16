import Zone from "../models/Zone.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../errors/index.js";

const createZone = async (req, res) => {
  const { country, state, location } = req.body;

  if (!country || !state || !location) {
    throw new BadRequestError("Please provide all Fields");
  }

  let zone = await Zone.create(req.body);

  res.status(StatusCodes.CREATED).json(zone);
};

const getAllZones = async (req, res) => {
  const { sort, search } = req.query;
  let queryObject = {};

  // ADD BASED ON CONDITIONS

  if (search) {
    const stringSearchFields = ["country", "state", "location"];

    const query = {
      $or: [
        ...stringSearchFields.map((field) => ({
          [field]: new RegExp("^" + search, "i"),
        })),
      ],
    };
    queryObject = { ...queryObject, ...query };
  }

  // No AWAIT
  let result = Zone.find(queryObject);

  // CHAIN CONNDITIONS
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  let zones = await result;

  const totalZones = await Zone.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalZones / limit);

  res.status(StatusCodes.OK).json({
    zones,
    totalZones,
    numOfPages,
  });
};

const updateZone = async (req, res) => {
  const { id: zoneId } = req.params;

  const location = await Zone.findOne({ _id: zoneId });

  if (!location) {
    throw new NotFoundError(`No location with Id: ${zoneId}`);
  }

  await Zone.findOneAndUpdate({ _id: zoneId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ msg: "Success: Zone Updated!" });
};

const deleteZone = async (req, res) => {
  const { id: zoneId } = req.params;

  const location = await Zone.findOne({ _id: zoneId });

  if (!location) {
    throw new NotFoundError(`No location with Id: ${zoneId}`);
  }

  await location.remove();
  res.status(StatusCodes.OK).json({ msg: "Success: Zone Deleted" });
};

export { createZone, getAllZones, updateZone, deleteZone };
