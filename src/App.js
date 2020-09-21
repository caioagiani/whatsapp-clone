import React, { useState, useEffect } from "react";
import "./App.css";

import { DonutLarge, Chat, MoreVert, Search } from "@material-ui/icons";

import ChatList from "./components/Chat";
import ChatContent from "./components/Content";
import ChatWindow from "./components/Window";
import NewChat from "./components/NewChat";

export default () => {
  const [user, setUser] = useState({
    id: 1234,
    avatar:
      "https://media-exp1.licdn.com/dms/image/C4D03AQHa0yUg9dH3RA/profile-displayphoto-shrink_200_200/0?e=1605744000&v=beta&t=3Bvzdov-SIj9DtMrzurljOco18Sk3fEIcAUkh0anCTA",
    name: "Caio Agiani",
  });

  const [chatList, setChatList] = useState([
    {
      chatId: 1,
      title: "Caio Agiani",
      image: "https://avatars2.githubusercontent.com/u/56451511",
    },
  ]);

  const [activeChat, setActiveChat] = useState({});
  const [showNewChat, setShowNewChat] = useState(false);

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header>
          <img className="header--avatar" src={user.avatar} alt="avatar" />

          <div className="header--buttons">
            <div className="header--btn">
              <DonutLarge style={{ color: "#919191" }} />
            </div>
            <div onClick={() => setShowNewChat(true)} className="header--btn">
              <Chat style={{ color: "#919191" }} />
            </div>
            <div className="header--btn">
              <MoreVert style={{ color: "#919191" }} />
            </div>
          </div>
        </header>

        <div className="search">
          <div className="search--input">
            <Search fontSize="small" style={{ color: "#919191" }} />
            <input
              type="search"
              placeholder="Procurar ou começar uma nova conversa"
            />
          </div>
        </div>

        <div className="chatlist">
          {chatList.map((item, key) => (
            <ChatList
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={() => setActiveChat(chatList[key])}
            />
          ))}
        </div>
      </div>
      <div className="contentarea">
        {activeChat.chatId ? <ChatWindow user={user} /> : <ChatContent />}
      </div>
    </div>
  );
};
