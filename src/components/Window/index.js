import React, { useState, useEffect, useRef } from "react";

import EmojiPicker from "emoji-picker-react";

import "./style.css";
import {
  Search,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Close,
  Send,
  Mic,
} from "@material-ui/icons";

import MessageItem from "../Messages";

export default ({ user }) => {
  const body = useRef();

  let recognition = null;

  let SpeeatRecognition =
    window.SpeeatRecognition || window.webkitSpeechRecognition;

  if (SpeeatRecognition) recognition = new SpeeatRecognition();

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([
    { author: 123, body: "Bla" },
    { author: 123, body: "ble" },
    { author: 123, body: "Bli" },
    { author: 123, body: "Blo" },
    { author: 1234, body: "Blu" },
    { author: 123, body: "Bla" },
    { author: 123, body: "ble" },
    { author: 123, body: "Bli" },
    { author: 123, body: "Blo" },
    { author: 1234, body: "Blu" },
    { author: 123, body: "Bla" },
    { author: 123, body: "ble" },
    { author: 123, body: "Bli" },
    { author: 123, body: "Blo" },
    { author: 1234, body: "Blu" },
    { author: 123, body: "Bla" },
    { author: 123, body: "ble" },
    { author: 123, body: "Bli" },
    { author: 1234, body: "Blu" },
    { author: 123, body: "Bla" },
    { author: 123, body: "ble" },
    { author: 123, body: "Bli" },
    { author: 123, body: "Blo" },
    { author: 1234, body: "Blu" },
    { author: 123, body: "Bla" },
    { author: 123, body: "ble" },
    { author: 123, body: "Bli" },
    { author: 123, body: "Blo" },
  ]);

  const handleEmojiClick = (e, emojiObject) => {
    setText(text + emojiObject.emoji);
  };

  const handleMicClick = () => {
    if (recognition) {
      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript);
      };

      recognition.start();
    }
  };

  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight;
    }
  }, [list]);

  const handleSendClick = () => {};

  return (
    <div className="chatWindow">
      <div className="chatWindow--header">
        <div className="chatWindow--headerinfo">
          <img
            className="chatWindow--avatar"
            src="https://avatars2.githubusercontent.com/u/56451511"
            alt="chat-avatar"
          />
          <div className="chatWindow--name">Caio Agiani</div>
        </div>

        <div className="chatWindow--headerbuttons">
          <div className="chatWindow--btn">
            <Search style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn">
            <AttachFile style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn">
            <MoreVert style={{ color: "#919191" }} />
          </div>
        </div>
      </div>

      <div ref={body} className="chatWindow--body">
        {list.map((item, key) => (
          <MessageItem key={key} data={item} user={user} />
        ))}
      </div>

      <div
        className="chatWindow--emojiarea"
        style={{ height: emojiOpen ? "200px" : "0px" }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>

      <div className="chatWindow--footer">
        <div className="chatWindow--pre">
          <div
            className="chatWindow--btn"
            onClick={() => setEmojiOpen(false)}
            style={{ width: emojiOpen ? 40 : 0 }}
          >
            <Close style={{ color: "#919191" }} />
          </div>

          <div className="chatWindow--btn" onClick={() => setEmojiOpen(true)}>
            <InsertEmoticon
              style={{ color: emojiOpen ? "#009688" : "#919191" }}
            />
          </div>
        </div>

        <div className="chatWindow--inputarea">
          <input
            className="chatWindow--input"
            type="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="chatWindow--pos">
          {!text ? (
            <div onClick={handleMicClick} className="chatWindow--btn">
              <Mic style={{ color: listening ? "#126ece" : "#919191" }} />
            </div>
          ) : (
            <div onClick={handleSendClick} className="chatWindow--btn">
              <Send style={{ color: "#919191" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
