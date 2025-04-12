import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = user?._id;
  console.log("🚀 ~ Chat ~ targetUserId:", user);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ sockethittttttt", userId);
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", { userId, targetUserId });

    socket.on("newMessageRecieved", ({ firstName, text }) => {
      setMessages((pre) => [...pre, { firstName, text }]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);
  const sendMessgae = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };
  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          className="flex-1 border border-gray-500 text-white"
          onChange={(e) => setNewMessage(e.target.value)}
        ></input>
        <button className="btn btn-secondary" onClick={sendMessgae}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
