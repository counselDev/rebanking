import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {
  NotFoundError,
  BadRequestError,
  UnAuthorizedError,
} from "../errors/index.js";
import Transaction from "../models/Transaction.js";
import Zone from "../models/Zone.js";
import nodemailer from "nodemailer";

const createUser = async (req, res) => {
  const { firstname, lastname, email, zone, password } = req.body;
  if (req.user.role === "admin") {
    if (!firstname || !lastname || !email || !zone || !password) {
      throw new BadRequestError("Please provide all Fields");
    }

    const zoneFound = await Zone.findById(zone);

    if (!zoneFound) {
      throw new BadRequestError("Zone not found");
    }

    if (zoneFound.agent) {
      throw new BadRequestError("Zone Already Has an Agent");
    }

    let user = await User.create(req.body);
    await Zone.findByIdAndUpdate(zoneFound._id, { agent: user._id });

    const output = `
  <div>
    <h2>Rebanking Solutions</h2>

    <div >
        <h3>Hello ${user.firstname} ${user.lastname}!</h3>
        <p>Congratulations! You have been succesfully registered as an Agent with Re-banking </p>
        <p>You have been asigned to ${zoneFound.location} </p>
        <p>You can now login to your account using ur credentials. Please keep credentials confidential!</p>
        <br />

        <p>Email: ${email}</p>
        <p>Password: ${password}</p>

        <a href="http://locahost:3000/login?users">Login Here</a>

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
      to: user.email, // list of receivers
      subject: "Registration Successfull ✔", // Subject line
      text: `Hi ${user.firstname} ${user.lastname}, Congratulations on sucessfull registration with Re-bank`, // plain text body
      html: output, // html body
    });

    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log("Email sent successfully");
    });

    res.status(StatusCodes.CREATED).json(user);
  } else {
    throw new UnAuthorizedError("You cannot perform this action");
  }
};

const getAllUsers = async (req, res) => {
  const { area, sort, search } = req.query;
  let queryObject = { role: "agent" };

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
  let result = User.find(queryObject);

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

  let users = await result;

  users = await Promise.all(
    users.map(async (user) => {
      const userSavingsColected = await Transaction.find({
        agent: user._id,
      });
      const zone = await Zone.findById(user.zone);

      const numOfTransactions = userSavingsColected.length;
      const totalSaved = userSavingsColected.reduce((a, b) => a + b.amount, 0);
      return {
        ...user._doc,
        numOfTransactions,
        totalSaved,
        zone
      };
    })
  );

  const totalUsers = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalUsers / limit);

  res.status(StatusCodes.OK).json({
    users,
    totalUsers,
    numOfPages,
  });
};

const updateUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`No user with Id: ${userId}`);
  }

  await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ msg: "Success: User Updated!" });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`No user with Id: ${userId}`);
  }

  await user.remove();
  res.status(StatusCodes.OK).json({ msg: "Success: User Deleted" });
};

export { createUser, getAllUsers, updateUser, deleteUser };
