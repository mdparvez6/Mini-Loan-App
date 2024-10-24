import React, { useState, useContext } from "react";
import "./customer.scss";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../../Context/GlobalContext";

const ReqLoan = () => {
  const { createLoanApi } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [loanAmount, setLoanAmount] = useState("");
  const [term, setTerm] = useState("");
  const [installments, setInstallments] = useState([]);
  const [showPayments, setShowPayments] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const calculateInstallments = () => {
    if (!loanAmount || !term) {
      toast.error("Please enter loan amount and term.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const loanAmountFloat = parseFloat(loanAmount);
      const termInt = parseInt(term);

      const weeklyInstallment = Math.floor(loanAmountFloat / termInt);
      const remainingAmount = loanAmountFloat - weeklyInstallment * termInt;
      const currentDate = new Date();
      const installmentsData = [];

      for (let i = 1; i <= termInt; i++) {
        const installment = {
          date: new Date(currentDate.getTime() + i * 7 * 24 * 60 * 60 * 1000),
          amount: (weeklyInstallment + (i <= remainingAmount ? 1 : 0)).toFixed(
            2
          ),
        };
        installmentsData.push(installment);
      }

      setInstallments(installmentsData);
      setShowPayments(true);
      setErrorMessage("");
      setLoading(false);
    }, 2000);
  };

  const sendLoanApplication = async () => {
    setLoading(true);

    if (!loanAmount || !term) {
      toast.error("Please enter loan amount and term.");
      setLoading(false);
      return;
    }

    if (loanAmount && term && installments.length === 0) {
      toast.error("Please calculate installments before applying.");
      setLoading(false);
      return;
    }

    const authToken = await localStorage.getItem("token");
    console.log(authToken);

    const User = await localStorage.getItem("user");
    console.log(User);

    const user = JSON.parse(User);
    
    try {
      const response = await fetch(`${createLoanApi}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          amount: loanAmount,
          term,
          payments: installments,
          userId: user._id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Log the response data if it's not OK
        console.error("Response error details:", errorData);
        throw new Error("Failed to create loan request");
      }

      toast.success("Loan Request Created Successfully");
      setLoanAmount("");
      setTerm("");
      setInstallments([]);
      setShowPayments(false);
      navigate("/cust/dashboard");
    } catch (error) {
      console.error("Error submitting loan application:", error);
      toast.error("An error occurred while submitting the loan application.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="loan-container">
      <div className="loan-form">
        <h1>Request a Loan</h1>
        <label htmlFor="loanAmount">Loan Amount (₹)</label>
        <input
          type="number"
          id="loanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
          placeholder="Enter loan amount"
        />

        <label htmlFor="term">Term/Installments (in weeks)</label>
        <input
          type="number"
          id="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
          placeholder="Enter term in weeks"
        />

        <div className="btn-cntrn">
          <button onClick={calculateInstallments} className="calculate-btn">
            View Installments
          </button>
          <button className="apply-btn" onClick={sendLoanApplication}>
            Apply
          </button>
        </div>

        {loading && <Loader />}
      </div>

      <div className="payments-container">
        <h2>Installments</h2>
        {showPayments ? (
          <div className="installments-list">
            <ul>
              {installments.map((installment, index) => (
                <li key={index}>
                  {`Week ${index + 1}: ${formatDate(installment.date)} - ₹${
                    installment.amount
                  }`}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p style={{ color: "#36b3eb" }}>
            No installments to show. Calculate first!
          </p>
        )}
      </div>
    </div>
  );
};

export default ReqLoan;
