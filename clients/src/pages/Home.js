import React from "react";
import { Link } from "react-router-dom";
import "./pages.scss";

const HomePage = ({ user }) => {
  console.log("home", user);

  return (
    <div className="main-container">
      <div className="header">
        <h3 className="text-xl m-3" data-aos="fade-right" data-aos-delay="0">
          Welcome to
        </h3>
        <h1
          className="text-6xl m-6 font-bold tracking-wider"
          data-aos="zoom-in"
        >
          Mini-Loan
          <span
            className="text-[30px]"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            App
          </span>
        </h1>

        <p
          className="text-[#36B3EB] text-xl m-4"
          data-aos="fade-left"
          data-aos-delay="0"
        >
          "Quick and Simple Loans at Your Fingertips"
        </p>
        <p>
          Apply for loans instantly, track your repayments, and manage your loan
          status with ease.
        </p>
      </div>

      <div className="btn-cntnr" data-aos="zoom-in" data-dos-delay="10">
        <Link to="/loan-application">
          <button className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-[#36B3EB] transition duration-300 ease-out border-2 border-[#36B3EB] rounded-full shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#36B3EB] group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-[#36B3EB] transition-all duration-300 transform group-hover:translate-x-full ease">
              Apply for a Loan
            </span>
            <span className="relative invisible">Apply for a Loan</span>
          </button>
        </Link>
      </div>

      <div className="btn-cntnr mt-4" data-aos="zoom-in" data-dos-delay="10">
        <Link to="/about">
          <button className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-[#36B3EB] transition duration-300 ease-out border-2 border-[#36B3EB] rounded-full shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#36B3EB] group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-[#36B3EB] transition-all duration-300 transform group-hover:translate-x-full ease">
              Learn More
            </span>
            <span className="relative invisible">Learn More</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
