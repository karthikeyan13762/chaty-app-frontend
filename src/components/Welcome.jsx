import React, { useState, useEffect } from "react";

export default function Welcome({ currentUser }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      setUserName(user?.username);
    };
    fetchUserName();
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#131324",
        color: "white",
        padding: "1rem",
      }}
    >
      <h1
        className="display-4"
        style={{
          fontSize: "2rem",
          color: "#4e0eff",
        }}
      >
        Welcome, <span className="text-primary">{userName}!</span>
      </h1>
      <h3 className="lead" style={{ fontSize: "1.25rem" }}>
        Please select a chat to start messaging.
      </h3>
    </div>
  );
}
