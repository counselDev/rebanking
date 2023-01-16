import Transaction from "../models/Transaction.js";
import Customer from "../models/Customer.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const createTransaction = async (req, res) => {
  const { customer, zone, amount } = req.body;

  if (!customer || !zone || !amount) {
    throw new BadRequestError("Please provide all Fields");
  }

  const agent = req.user.userId;

  let transaction = await Transaction.create({ ...req.body, agent });

  res.status(StatusCodes.CREATED).json(transaction);
};

const getAllTransactions = async (req, res) => {
  const { zone, sort, search } = req.query;
  let queryObject = {};

  // ADD BASED ON CONDITIONS
  if (zone && zone !== "all") {
    queryObject.zone = zone;
  }

  if (search) {
    const stringSearchFields = ["zone"];

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
  let result = Transaction.find(queryObject);

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

  let transactions = await result;

  transactions = await Promise.all(
    transactions.map(async (transaction) => {
      const customer = await Customer.findById(transaction.customer);
      const agent = await User.findById(transaction.agent);
      return { ...transaction._doc, customer, agent };
    })
  );

  const totalTransactions = await Transaction.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTransactions / limit);

  res.status(StatusCodes.OK).json({
    transactions,
    totalTransactions,
    numOfPages,
  });
};

const getUserZoneTransactions = async (req, res) => {
  const { userId, role } = req.user;
  const { search } = req.query;
  const { zoneId } = req.query;
  const { id } = req.params;
  let transactions;
  let queryObject;

  if (role === "agent") {
    queryObject = {
      agent: userId,
      zone: zoneId,
    };
  } else if (role === "admin") {
    queryObject = {
      agent: id,
      zone: zoneId,
    };
  }

  let totalSaved = 0;
  transactions = await Transaction.find(queryObject).sort("-createdAt");

  transactions = await Promise.all(
    transactions.map(async (transaction) => {
      const customer = await Customer.findById(transaction.customer);
      totalSaved += transaction.amount;
      return { ...transaction._doc, customer };
    })
  );

  res.status(StatusCodes.OK).json({ transactions, totalSaved });
};

const getSingleUserTransactions = async (req, res) => {
  const { userId, role } = req.user;
  const { search } = req.query;
  const { id } = req.params;

  if (role === "agent") {
    throw new BadRequestError("You cannot Access This");
  }

  let transactions;
  let queryObject;

  if (role === "customer") {
    queryObject = {
      customer: userId,
    };
  } else if (role === "admin") {
    queryObject = {
      customer: id,
    };
  }

  if (search) {
    const stringSearchFields = ["firstname", "lastname", "email"];

    const query = {
      $or: [
        ...stringSearchFields.map((field) => ({
          [field]: new RegExp("^" + search, "i"),
        })),
      ],
    };

    const userInfo = await User.find(query);
    queryObject = { ...queryObject, agent: userInfo._id };
  }

  transactions = await Transaction.find(queryObject).sort("-createdAt");
  let totalSaved = 0;

  transactions = await Promise.all(
    transactions.map(async (transaction) => {
      const agent = await User.findById(transaction.agent);
      totalSaved += transaction.amount;
      return { ...transaction._doc, agent };
    })
  );
  res.status(StatusCodes.OK).json({ transactions, totalSaved });
};

export {
  createTransaction,
  getAllTransactions,
  getSingleUserTransactions,
  getUserZoneTransactions,
};
