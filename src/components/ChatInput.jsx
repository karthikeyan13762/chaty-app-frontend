import React, { useState } from "react";
import Picker from "emoji-picker-react";
import "../css/ChatInput.css";
export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData?.emoji || emojiData;
    setMsg((prevMsg) => prevMsg + emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.trim().length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div
      className="d-flex align-items-center p-3 bg-dark chat-input-container"
      style={{ position: "relative", zIndex: 100 }}
    >
      {/* Emoji Picker Button */}
      <div className="position-relative me-3 emoji-picker-container">
        <button
          type="button"
          className="btn btn-warning btn-sm rounded-circle emoji-picker-button"
          style={{ fontSize: "1rem" }}
          onClick={handleEmojiPickerToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-emoji-astonished"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5M4.884 4.022a2 2 0 0 1 1.458-.048.5.5 0 0 0 .316-.948 3 3 0 0 0-2.167.077 3.1 3.1 0 0 0-.773.478q-.036.03-.07.064l-.002.001a.5.5 0 0 0 .707.708l-.001.002.001-.002a2 2 0 0 1 .122-.1 2 2 0 0 1 .41-.232Zm6.232 0a2 2 0 0 0-1.458-.048.5.5 0 1 1-.316-.948 3 3 0 0 1 2.168.077 3 3 0 0 1 .773.478l.07.064v.001a.5.5 0 0 1-.706.708l.002.002-.002-.002a2 2 0 0 0-.122-.1 2 2 0 0 0-.41-.232ZM8 10c-.998 0-1.747.623-2.247 1.246-.383.478.08 1.06.687.98q1.56-.202 3.12 0c.606.08 1.07-.502.687-.98C9.747 10.623 8.998 10 8 10" />
          </svg>
        </button>
        {showEmojiPicker && (
          <div
            className="position-absolute emoji-picker"
            style={{
              top: "-500px",
              zIndex: 1000,
              boxShadow: "0 5px 10px #9a86f3",
            }}
          >
            <Picker
              onEmojiClick={handleEmojiClick}
              pickerStyle={{
                backgroundColor: "#080420",
                borderColor: "#9a86f3",
              }}
            />
          </div>
        )}
      </div>

      <form
        className="d-flex flex-grow-1 chat-input-form"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          className="form-control text-dark border chat-input"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          required
          maxLength={150}
          style={{
            height: "60%",
            borderRadius: "2rem",
          }}
        />
        <button
          type="submit"
          className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center send-button ms-2"
          style={{
            width: "3rem",
            height: "3rem",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
