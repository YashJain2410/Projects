// require('dotenv').config({path: './env'})

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/index.js";

import userRoutes from "./routes/user.routes.js";

dotenv.config({
    path: './.env'
})

const app = express();
app.use(express.json());

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed!!!" , err);
})

app.use("/api/v1/users", userRoutes);

/*  Approach 1
import express from "express"
const app = express()

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", () => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }
    catch (error){
        console.error("ERROR: ", error);
        throw err
    }
})()
*/
