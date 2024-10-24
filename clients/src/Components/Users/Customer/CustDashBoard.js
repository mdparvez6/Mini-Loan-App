import React from "react";
import { Link } from "react-router-dom";
import "./customer.scss";

const CustHome = () => {
  return (
    <div className="customer-dashboard">
      <h2 className="dashboard-heading" data-aos="zoom-in" data-aos-delay="100">
        Customer Dashboard
      </h2>

      <div
        className="cust-btn-cntnr"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <Link to="/cust/reqloan">
          <button className="dashboard-button">Apply for New Loan</button>
        </Link>

        <Link to="/cust/viewloan">
          <button className="dashboard-button">View All Loans</button>
        </Link>
      </div>

      <div
        className="terms-and-conditions"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h3 className="terms-heading">Terms and Conditions</h3>
        <p className="terms-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
          metus a libero venenatis ultricies. Phasellus ut nulla vitae turpis
          ultrices accumsan. Cras malesuada, nisl id volutpat sodales, nisl quam
          vulputate nulla, eu bibendum metus elit sit amet velit.
        </p>
      </div>
    </div>
  );
};

export default CustHome;
