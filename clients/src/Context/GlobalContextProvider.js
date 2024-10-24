import React from "react";
import { useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import AOS from "aos";
import "aos/dist/aos.css";

const GlobalContextProvider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(false);

  const PORT = 8000;
  //   const PORT_Url = `https://mini-loan-app-bkd.vercel.app/api`;
  const PORT_Url = `http://localhost:${PORT}/api/v1`;

  const logInApi = `${PORT_Url}/login`;
  const signUpApi = `${PORT_Url}/signup`;

  const allLoansApi = `${PORT_Url}/allLoans`;
  const updateLoansApi = `${PORT_Url}/update`;

  const createLoanApi = `${PORT_Url}/createLoan`;
  const viewPaymentApi = `${PORT_Url}/payments/`;
  const payLoanApi = `${PORT_Url}/addRepayment`;
  const viewLoanApi = `${PORT_Url}/loans/`;

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userType,
        setUserType,
        logInApi,
        signUpApi,

        allLoansApi,
        updateLoansApi,
        createLoanApi,
        viewLoanApi,
        viewPaymentApi,
        payLoanApi,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
