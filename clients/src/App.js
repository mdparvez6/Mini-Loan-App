import { Route, Routes, Outlet } from "react-router-dom";
import "./App.scss";

import Home from "./pages/Home";
import About from "./pages/about";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Log_Pages/Login";
import SignUp from "./Components/Log_Pages/Signup";
import AdminHome from "./Components/Users/Admin/Request";
import CustDashBoard from "./Components/Users/Customer/CustDashBoard";
import CustReq from "./Components/Users/Customer/ReqLoan";
import CustView from "./Components/Users/Customer/ViewLoan";
import PayLoan from "./Components/Users/Customer/PayLoan";
import Error from "./Components/Error";
import ProtectedRoute from "./Components/ProtectedRoute";
import GlobalContext from "./Context/GlobalContext";
import { useContext } from "react";

function App() {
  const { isLoggedIn, setIsLoggedIn, userType, setUserType } =
    useContext(GlobalContext);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute Component={AdminHome} />}
        />

        <Route path="/cust" element={<ProtectedRoute Component={Outlet} />}>
          <Route index path="dashboard" element={<CustDashBoard />} />
          <Route path="reqloan" element={<CustReq />} />
          <Route path="viewloan" element={<CustView />} />
          <Route path="viewloan/payloan/:id" element={<PayLoan />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
