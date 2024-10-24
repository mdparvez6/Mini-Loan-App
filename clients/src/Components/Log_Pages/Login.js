import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import "./log.scss"; // Assuming log.scss will handle the styling

import Loader from "../Loader/Loader"; // Importing Loader component
import GlobalContext from "../../Context/GlobalContext"; // Importing GlobalContext for authentication

export default function Login() {
  const { setIsLoggedIn, userType, logInApi } = useContext(GlobalContext); // Using global context to manage login states
  const navigate = useNavigate(); // Using navigate for page redirection

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isAdmin: userType,
  });

  const [isLoading, setIsLoading] = useState(false);

  async function loginHandler() {
    try {
      setIsLoading(true);

      const response = await fetch(`${logInApi}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const res_data = await response.json();
        // console.log(res_data.data);
        const {token,user} = res_data.data;
        localStorage.setItem("token", res_data.data.token);
        localStorage.setItem("user", JSON.stringify(res_data.data.user));

        setIsLoggedIn(true);
        toast.success("Logged In Successfully 😊");

        // Redirecting based on userType (admin/customer)
        navigate(userType ? "/admin/dashboard" : "/cust/dashboard");
      } else {
        const errorMessage = await response.json();
        toast.error(`Login failed: ${errorMessage.message}`);
      }
    } catch (error) {
      console.error("Error during Login:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <div className="log-container" data-aos="fade-right" data-dos-delay="10">
      <h2 className="log-heading">Login</h2>

      <div className="log-form">
        <h4 className="log-type">
          Login as {userType === true ? "Admin" : "Customer"}
        </h4>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={changeHandler}
          required
        />

        <button className="login-btn" onClick={loginHandler}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>

        {isLoading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}

        <h5>Not Registered Yet?</h5>
        <Link to="/signup">
          <button className="signup-btn">
            Sign Up As {userType ? "Admin" : "Customer"}
          </button>
        </Link>
      </div>
    </div>
  );
}
