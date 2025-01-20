import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import { registerRoute } from "../utils/APIRoutes";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status == true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters");
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters");
      return false;
    } else if (email === "") {
      toast.error("Email is required");
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <div
            className="logo mb-2"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#007bff",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            C
          </div>
          <h1 className="h4 text-primary">Chaty</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Name"
              onChange={handleChange}
              maxLength={25}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
              maxLength={25}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              maxLength={10}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              onChange={handleChange}
              maxLength={10}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Create User
          </button>
          <div className="text-center mt-3">
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
