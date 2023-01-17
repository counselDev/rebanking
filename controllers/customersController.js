import Customer from "../models/Customer.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/index.js";
import Transaction from "../models/Transaction.js";
import nodemailer from "nodemailer";
import Zone from "../models/Zone.js";

const createCustomer = async (req, res) => {
  const { role, userId } = req.user;

  if (role !== "admin" && role !== "agent") {
    throw new UnAuthorizedError("You cannot perform this action!");
  }

  const createdBy = mongoose.Types.ObjectId(userId);

  const { firstname, lastname, email, password, zone } = req.body;

  if (!firstname || !lastname || !email || !password || !zone) {
    throw new BadRequestError("You must provide all Fields");
  }

  const foundCustomer = await Customer.findOne({ firstname, lastname, email });

  if (foundCustomer) {
    throw new BadRequestError(" Customer already exists");
  }
  const zoneFound = await Zone.findById(zone);

  if (!zoneFound) {
    throw new BadRequestError("Zone not found");
  }

  let customer = await Customer.create({ ...req.body, createdBy });

  const output = `
  <div>
    <h2>Rebanking Solutions</h2>

    <div >
        <h3>Hello ${customer.firstname} ${customer.lastname}!</h3>
        <p>Congratulations! You have been succesfully registered with Re-banking </p>
        <p>You can now login to your account using ur credentials!</p>
        <br />
        <p>Email: ${email}</p>
        <p>Password: ${password}</p>

        <a href=https://jolly-plum-pullover.cyclic.app/">Login Here</a>

        <br />
        <p>Cheers!!</p>
        <p>Rebanking Team</p>
    </div>
  
  </div>
`;

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "counselokpabijs@gmail.com",
      pass: process.env.GOOGLE_PASS,
    },
    secure: true,
  });

  let mailData = await transporter.sendMail({
    from: "counselokpabijs@gmail.com",
    to: customer.email, // list of receivers
    subject: "Registration Successfull ✔", // Subject line
    text: `Hi ${customer.firstname} ${customer.lastname}, Congratulations on sucessfull registration with Re-bank`, // plain text body
    html: output, // html body
  });

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log("Email sent successfully");
  });

  res
    .status(StatusCodes.CREATED)
    .json({ customer, msg: "Email sent successfully" });
};

const getAllCustomers = async (req, res) => {
  const { area, sort, search } = req.query;
  let queryObject = {};

  // ADD BASED ON CONDITIONS
  if (area && area !== "all") {
    queryObject.area = area;
  }

  if (search) {
    const stringSearchFields = ["firstname", "lastname", "email", "area"];

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
  let result = Customer.find(queryObject);

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

  let customers = await result;

  customers = await Promise.all(
    customers.map(async (customer) => {
      const customerSavings = await Transaction.find({
        customer: customer._id,
      });
      const zone = await Zone.findById(customer.zone);
      const numOfTransactions = customerSavings.length;
      const totalSaved = customerSavings.reduce((a, b) => a + b.amount, 0);
      return {
        ...customer._doc,
        numOfTransactions,
        totalSaved,
        zone,
      };
    })
  );

  const totalCustomers = await Customer.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalCustomers / limit);

  res.status(StatusCodes.OK).json({
    customers,
    totalCustomers,
    numOfPages,
  });
};

const getUserZoneCustomers = async (req, res) => {
  const { id: zoneId } = req.params;
  const { search } = req.query;

  let queryObject = {
    zone: zoneId,
  };

  if (search) {
    const stringSearchFields = ["firstname", "lastname", "email", "area"];

    const query = {
      $or: [
        ...stringSearchFields.map((field) => ({
          [field]: new RegExp("^" + search, "i"),
        })),
      ],
    };
    queryObject = { ...queryObject, ...query };
  }

  let userZoneCustomers = await Customer.find(queryObject);

  userZoneCustomers = await Promise.all(
    userZoneCustomers.map(async (customer) => {
      const customerSavings = await Transaction.find({
        customer: customer._id,
      });

      let numOfTransactions = customerSavings.length;
      const totalSaved = customerSavings.reduce((a, b) => a + b.amount, 0);
      return {
        ...customer._doc,
        totalSaved,
        numOfTransactions,
      };
    })
  );

  res.status(StatusCodes.OK).json(userZoneCustomers);
};

const getSingleCustomer = async (req, res) => {
  const { id: customerId } = req.params;

  const singleCustomer = await Customer.findOne({ _id: customerId });

  if (!singleCustomer) {
    throw new NotFoundError(`No customer with Id: ${customerId}`);
  }
  const customerSavings = await Transaction.find({
    customer: singleCustomer._id,
  }).sort("-createdAt");

  let numOfTransactions = customerSavings.length;
  const totalSaved = customerSavings.reduce((a, b) => a + b.amount, 0);

  res.status(StatusCodes.OK).json({
    ...singleCustomer._doc,
    totalSaved,
    numOfTransactions,
    customerSavings,
  });
};

const updateCustomer = async (req, res) => {
  const { id: customerId } = req.params;

  const customer = await Customer.findOne({ _id: customerId });

  if (!customer) {
    throw new NotFoundError(`No customer with Id: ${customerId}`);
  }

  await Customer.findOneAndUpdate({ _id: customerId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ msg: "Success: Customer Updated!" });
};

const deleteCustomer = async (req, res) => {
  const { id: customerId } = req.params;

  const customer = await Customer.findOne({ _id: customerId });

  if (!customer) {
    throw new NotFoundError(`No customer with Id: ${customerId}`);
  }

  await customer.remove();
  res.status(StatusCodes.OK).json({ msg: "Success: Customer Deleted" });
};

export {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  getSingleCustomer,
  deleteCustomer,
  getUserZoneCustomers,
};
