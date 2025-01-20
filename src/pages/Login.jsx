import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, { position: "top-center" });
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "" || password === "") {
      toast.error("Username and Password are required.", {
        position: "top-center",
      });
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
              backgroundColor: "#007bff",
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
              placeholder="Username"
              onChange={handleChange}
              maxLength={25}
              required
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <div className="text-center mt-3">
            <span>
              Don't have an account?{" "}
              <Link to="/register" className="text-decoration-none">
                Register
              </Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
