import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import axios from "axios";
import "../css/SetAvatar.css";
function SetAvatar() {
  const api = `https://api.multiavatar.com/4644545`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i <= 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchAvatars();
  }, [api]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark text-white">
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="text-center mb-4">
            <h1 className="h4">Pick an Avatar as your profile picture</h1>
          </div>
          <div className="d-flex gap-3 flex-wrap justify-content-center">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`border rounded-circle p-2 d-flex justify-content-center align-items-center ${
                  selectedAvatar === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedAvatar(index)}
                style={{
                  cursor: "pointer",
                  transition: "0.5s ease-in-out",
                  maxWidth: "6rem",
                }}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{
                    height: "6rem",
                    width: "6rem",
                  }}
                />
              </div>
            ))}
          </div>
          <button
            onClick={setProfilePicture}
            className="btn btn-primary mt-4 text-uppercase fw-bold w-100"
          >
            Set as Profile Picture
          </button>
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default SetAvatar;
