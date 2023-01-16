import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const CustomerSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please provide first name"],
      minlength: 2,
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Please provide last name"],
      minlength: 2,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide phone"],
    },
    address: {
      type: String,
      required: [true, "Please provide address"],
    },
    zone: {
      type: mongoose.Types.ObjectId,
      ref: "Zone",
      required: [true, "Please provide zone"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email`,
      },
      unique: true,
    },
    role: {
      type: String,
      default: "customer",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      select: false,
    },
  },
  { timestamps: true }
);

CustomerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Instance mathod to create JWT
CustomerSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// Instance method to create JWT
CustomerSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
};

export default mongoose.model("Customer", CustomerSchema);
