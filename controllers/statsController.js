import Customer from "../models/Customer.js";
import Location from "../models/Zone.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import { UnAuthorizedError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import moment from "moment/moment.js";

const getStats = async (req, res) => {
  if (req.user.role !== "admin") {
    throw new UnAuthorizedError(
      "You are not permitted to access this resource"
    );
  }

  const numOfAgents = await User.countDocuments({ role: { $ne: "admin" } });
  const numOfCustomers = await Customer.countDocuments();
  const numOfLocations = await Location.countDocuments();
  const transactions = await Transaction.find();

  const totalSaved = transactions.reduce((a, b) => a + b.amount, 0);

  res
    .status(StatusCodes.OK)
    .json({ numOfAgents, numOfCustomers, numOfLocations, totalSaved });
};

const getMonthlyStats = async (req, res) => {
  let monthlyTransactions = await Transaction.aggregate([
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyTransactions = monthlyTransactions
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json(monthlyTransactions );
};

export { getStats, getMonthlyStats };
