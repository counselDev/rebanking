import express from "express";
const app = express();

import mongoose from "mongoose";
mongoose.set('strictQuery', false);

import dotenv from "dotenv";
dotenv.config();

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import "express-async-errors";
import morgan from "morgan";

// importing routes
import authRouter from "./routes/authRouter.js";
import usersRouter from "./routes/usersRouter.js";
import transactionRouter from "./routes/transactionRouter.js";
import customerRouter from "./routes/customerRouter.js";
import statsRouter from "./routes/statsRouter.js";
import zonesRouter from "./routes/zonesRouter.js";

// importing middleware
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import authMiddleWare from "./middlewares/auth.js"

// import connetionfunction
import connectDB from "./db/connect.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")))

app.use(express.json());

// ROUTES
app.use("/api/auth/", authRouter);
app.use("/api/customers/", authMiddleWare, customerRouter);
app.use("/api/users/", authMiddleWare, usersRouter);
app.use("/api/transactions/",authMiddleWare, transactionRouter);
app.use("/api/stats/",authMiddleWare, statsRouter);
app.use("/api/zones/",authMiddleWare, zonesRouter);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
  


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        console.log("Connected to database")
        app.listen(port, () => {
            console.log(`App is Listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()