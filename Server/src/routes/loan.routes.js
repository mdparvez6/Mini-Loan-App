import express from "express";
const router = express.Router();
import { verifyJWT } from "../middleware/auth.middleware.js";

import {
  createLoan,
  getAllLoans,
  getPaymentById,
  getLoansById,
  addRepayment,
  updateState,
} from "../controllers/loan.controller.js";

router.post("/createLoan", verifyJWT, createLoan);
router.get("/allLoans", verifyJWT, getAllLoans);
router.get("/loans/:id", verifyJWT, getLoansById);
router.get("/payments/:id", verifyJWT, getPaymentById);
router.post("/addRepayment", verifyJWT, addRepayment);
router.put("/update", verifyJWT, updateState);

export default router;
