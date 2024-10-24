import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

import loanroute from "./routes/loan.routes.js";
import userroute from "./routes/user.routes.js";

app.use("/api/v1/", userroute);
app.use("/api/v1/", loanroute);

export default app;
