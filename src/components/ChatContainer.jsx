import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import "../App.css";

export default function ChatContainer({ currentChat, socket, currentUser }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = JSON.parse(localStorage.getItem("chat-app-user"));
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    if (currentChat) fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("chat-app-user"))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = JSON.parse(localStorage.getItem("chat-app-user"));
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="d-flex flex-column vh-100 chat-container">
      <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-dark text-white chat-header">
        <div className="d-flex align-items-center">
          <div className="me-3 avatar-container">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
              className="rounded-circle avatar"
              style={{ height: "3rem" }}
            />
          </div>
          <h3
            className="mb-0 chat-username text-truncate"
            style={{ maxWidth: "200px" }}
          >
            {currentChat.username}
          </h3>
        </div>
        <Logout />
      </div>

      <div className="flex-grow-1 overflow-auto p-3 bg-light chat-messages">
        {messages.map((message) => (
          <div
            ref={scrollRef}
            key={uuidv4()}
            className={`d-flex ${
              message.fromSelf ? "justify-content-end" : "justify-content-start"
            } mb-3 message-row`}
          >
            <div
              className={`p-3 rounded message-bubble ${
                message.fromSelf
                  ? "bg-primary text-white message-from-self"
                  : "bg-secondary text-dark message-from-other"
              }`}
              style={{ maxWidth: "60%", wordBreak: "break-word" }}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-dark chat-input-wrapper">
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
}
