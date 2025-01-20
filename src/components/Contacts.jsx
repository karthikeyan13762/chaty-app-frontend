// -------------------------------
import React, { useState, useEffect } from "react";
import "../css/Contacts.css";
export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));
      setCurrentUserName(data?.username);
      setCurrentUserImage(data?.avatarImage);
    };
    fetchUserData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div
          className="d-flex flex-column text-dark contacts-container"
          style={{
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center py-3 border-bottom bg-white brand-section"
            style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            <h3 className="ms-2 text-uppercase brand-title">Chaty</h3>
          </div>

          <div
            className="flex-grow-1 overflow-auto py-3 contacts-section"
            style={{
              maxHeight: "calc(100vh - 150px)",
              scrollbarWidth: "thin",
            }}
          >
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`d-flex align-items-center p-2 mb-2 rounded contact-item ${
                  index === currentSelected
                    ? "bg-primary text-white selected-contact"
                    : "bg-white"
                }`}
                style={{
                  cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="me-3 border rounded contact-avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{
                      height: "3rem",
                      width: "3rem",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <h5
                    className="mb-0 contact-name"
                    style={{
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {contact.username}
                  </h5>
                </div>
              </div>
            ))}
          </div>

          <div
            className="d-flex align-items-center justify-content-center py-3 border-top bg-white current-user-section"
            style={{
              boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="me-3 current-user-avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{
                  height: "4rem",
                  width: "4rem",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <h4
                className="mb-0 current-user-name"
                style={{
                  fontSize: "1.25rem",
                  textAlign: "center",
                  wordBreak: "break-word",
                }}
              >
                {currentUserName}
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
