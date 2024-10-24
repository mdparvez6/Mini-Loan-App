import { Loan } from "../models/loan.models.js";
import { Repayment } from "../models/repayment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const calculatePayments = (loan, term) => {
  const { _id, amount } = loan;
  const scheduledPayments = [];

  const basePaymentAmount = Math.floor(amount / term); // Integer division for smaller payments
  const firstPaymentAmount = amount - basePaymentAmount * (term - 1);

  // Calculate the starting date for payments (you can adjust this as needed)
  let currentDate = new Date(); // Assume payments start from today or adjust as needed

  for (let i = 0; i < term; i++) {
    let paymentAmount;

    // First payment is larger, the rest are equal
    if (i === 0) {
      paymentAmount = firstPaymentAmount;
    } else {
      paymentAmount = basePaymentAmount;
    }
    const payment = new Repayment({
      loanId: _id,
      amount: paymentAmount,
      totalAmount: paymentAmount,
      date: new Date(currentDate), // Save the current date
      status: "PENDING",
    });

    // Push the payment to the scheduled payments array
    scheduledPayments.push(payment);

    currentDate.setDate(currentDate.getDate() + 7);
  }

  return scheduledPayments;
};
const createLoan = asyncHandler(async (req, res) => {
  const { userId, amount, term } = req.body;
  const user = req.user;
  if (user.isAdmin) throw new ApiError(401, "Only Users can create a loans");

  const loan = await Loan.create({ userId, amount, term });
  const scheduledPayments = calculatePayments(loan, term);
  console.log(scheduledPayments);

  await Repayment.insertMany(scheduledPayments);

  return res
    .status(200)
    .json(new ApiResponse(200, scheduledPayments, "Successfully created Loan"));
});

const getAllLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find({}).populate({
    path: "userId",
    select: "username email isAdmin",
  });
  if (!loans) throw new ApiError(400, "No loans Found");
  res
    .status(200)
    .json(
      new ApiResponse(200, loans, "Successfully fetched all loans of user")
    );
});

const getLoansById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const loans = await Loan.find({ userId });

  if (!loans) throw new ApiError(400, "Loan does not exists with this id");

  return res.status(200).json(new ApiResponse(200, loans, "Success"));
});

const getPaymentById = asyncHandler(async (req, res) => {
  const loanId = req.params.id;
  const payments = await Repayment.find({ loanId });
  if (!payments)
    throw new ApiError(400, "Loan does not exist with the given Id");
  return res
    .status(200)
    .json(new ApiResponse(200, payments, "Retrived the payments done by user"));
});


const addRepayment = asyncHandler(async (req, res) => {
  const { loanId, amount } = req.body;
  const loan = await Loan.findById(loanId);

  if (!loan || loan.state == "PAID")
    throw new ApiError(404, "Loan not found or User has paid the loan");

  const pendingPayments = await Repayment.find({
    loanId,
    status: "PENDING",
  }).sort("dueDate");

  if (pendingPayments.length === 0) {
    throw new ApiError(400, "All Repayments have already been made");
  }

  let remainingAmount = amount;
  for (const payment of pendingPayments) {
    if (remainingAmount <= 0) break;
    const paidAmount = Math.min(payment.amount, remainingAmount);
    remainingAmount -= paidAmount;
    payment.amount -= paidAmount;
    if (payment.amount === 0) payment.status = "PAID";
    await payment.save();
  }
  const allPaymentsPaid = pendingPayments.every(
    (payment) => payment.status === "PAID"
  );

  if (allPaymentsPaid) {
    (loan.state = "PAID"), await loan.save();
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        pendingPayments,
        allPaymentsPaid
          ? "Loan fully paid. Payment successful!"
          : "Partial payment successful!",
        "Payment Successfull"
      )
    );
});

const updateState = asyncHandler(async (req, res) => {
  const { loanId, state } = req.body;

  const loan = await Loan.findOne({ _id: loanId });
  if (!loan) throw new ApiError(400, "Loan Request not found");

  if (loan.state !== "PENDING")
    throw new ApiError(400, "Loan has already requested");

  loan.state = state;

  await loan.save();

  return res
    .status(200)
    .json(new ApiResponse(200, loan, "Updated Status Successfully by Admin"));
});

export {
  createLoan,
  addRepayment,
  getAllLoans,
  getLoansById,
  getPaymentById,
  updateState,
};
