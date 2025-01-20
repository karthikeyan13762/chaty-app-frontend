import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import "../css/Logout.css";
export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const { _id } = await JSON.parse(localStorage.getItem("chat-app-user"));
    const data = await axios.get(`${logoutRoute}/${_id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-primary d-flex align-items-center justify-content-center logout-btn"
      style={{
        borderRadius: "0.5rem",
        backgroundColor: "#9a86f3",
        border: "none",
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-power"
        viewBox="0 0 16 16"
        style={{ width: "1.5rem", height: "1.5rem" }}
      >
        <path d="M7.5 1v7h1V1z" />
        <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
      </svg>
    </button>
  );
}
