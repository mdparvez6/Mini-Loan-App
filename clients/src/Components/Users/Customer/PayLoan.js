import React, { useState, useEffect, useContext } from "react";
import "./customer.scss";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import GlobalContext from "../../../Context/GlobalContext";

export default function PayLoan() {
  const { viewPaymentApi, payLoanApi } = useContext(GlobalContext);
  const params = useParams();
  const loanId = params.id;

  const [loanRequests, setLoanRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [repayments, setRepayments] = useState([]);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
  };

  useEffect(() => {
    fetchPaymentStatus();
  }, []);

  const authToken = localStorage.getItem("token");

  const fetchPaymentStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${viewPaymentApi}${loanId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      console.log(data);

      setLoanRequests(data.data || []);
    } catch (error) {
      console.error("Error fetching loan requests:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(loanRequests);
  const handleStatusChange = async (loanId, amount) => {
    try {
      setLoading(true);
      if (parseFloat(amount) > parseFloat(paymentAmount)) {
        toast.error(
          "Repayment amount should be greater than or equal to the required amount."
        );
        return;
      }
      closeModal();
      const response = await fetch(`${payLoanApi}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          amount: paymentAmount,
          loanId: loanId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      toast.success("Payment Successful");
      fetchPaymentStatus();
    } catch (error) {
      console.error("Error updating loan status:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (amount) => {
    setIsModalOpen(true);
    setAmount(amount);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPaymentAmount("");
  };

  return (
    <>
      {loading && <Loader />}

      <div className="payloan" data-aos="fade-right" data-aos-delay="10">
        <h1 className="payloan-title">Pay Loan</h1>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Installment Amount</th>
                <th>Remaining Amount</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((payment) => (
                <tr key={payment.id}>
                  <td>Rs.{payment.totalAmount}</td>
                  <td>Rs.{payment.amount}</td>
                  <td>{formatDate(payment.date)}</td>
                  <td>
                    {payment.status === "PAID" ? (
                      <span className="status-paid">PAID</span>
                    ) : (
                      <span className="status-pending">NOT PAID</span>
                    )}
                  </td>
                  <td>
                    {payment.status === "PENDING" ? (
                      <button
                        onClick={() => openModal(payment.amount)}
                        className="pay-button"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <button disabled className="paid-button">
                        Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <h2>Make Payment of Rs.{amount}</h2>
            <label style={{ color: "black" }}>Payment Amount</label>
            <input
              type="number"
              value={paymentAmount}
              placeholder="Enter Amount"
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
            <button
              className="repay-button"
              onClick={() => handleStatusChange(loanId, amount)}
            >
              Repay
            </button>
            <span className="cancel-button" onClick={closeModal}>
              Cancel
            </span>
          </div>
        </div>
      )}
    </>
  );
}
