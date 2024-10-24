import React from "react";
import "./pages.scss";

export default function About() {
  return (
    <div className="main-container">
      <h2 className="text-3xl font-bold m-3">About Our Mini-Loan App</h2>
      <p className="m-3">
        Our mini-loan app simplifies the loan application process and enables
        customers to manage their loans seamlessly.
      </p>
      <div className="features" data-aos="fade-right" data-aos-delay="10">
        <div className="feature">
          <h3 className="text-xl font-semibold">1. Apply for a Loan</h3>
          <p>
            Submit a loan request by specifying the amount you need and the term
            of repayment. All loans follow a weekly repayment schedule to make
            payments easier for you.
          </p>
        </div>

        <div className="feature">
          <h3 className="text-xl font-semibold">2. Admin Loan Approval</h3>
          <p>
            Once a loan request is submitted, admins will review and approve it.
            Upon approval, your loan becomes active, and repayments are
            scheduled automatically.
          </p>
        </div>

        <div className="feature">
          <h3 className="text-xl font-semibold">3. View Your Loan Details</h3>
          <p>
            Customers can access a personalized dashboard to view their loan
            status, track repayments, and check the remaining balance at any
            time.
          </p>
        </div>

        <div className="feature">
          <h3 className="text-xl font-semibold">4. Weekly Repayments</h3>
          <p>
            Easily make weekly repayments on your loan through our app. Each
            repayment updates your loan status, and once all scheduled
            repayments are completed, your loan will be marked as fully paid.
          </p>
        </div>
      </div>
    </div>
  );
}
