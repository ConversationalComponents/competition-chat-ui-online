import React, { useEffect, useState } from "react";
import ChatBot from "./chatBot/ChatBot";
import BotTextResponse from "./botTextResponse";
import axios from "axios";
import "./App.css";

const App = () => {
  const [steps, setSteps] = useState([]);
  const [firstMessage, setFirstMessage] = useState("");
  const [requestURL, setRequestURL] = useState("");
  const [URL, setURL] = useState("");

  const onSubmit = () => {
    if (URL) {
      axios
        .get(URL)
        .then(res => {
          console.log("res", res.data);
          setFirstMessage(res.data.firstMessage);
          setRequestURL(res.data.requestURL);
        })
        .catch(err => {
          console.log("error", err);
        });
    }
  };

  useEffect(() => {
    if (firstMessage && requestURL) {
      setSteps([
        {
          id: "welcome",
          message: firstMessage,
          trigger: "get_user_input"
        },
        {
          id: "get_user_input",
          user: true,
          trigger: "custom"
        },
        {
          id: "custom",
          component: <BotTextResponse requestURL={requestURL} />,
          waitAction: true,
          asMessage: true
        }
      ]);
    }
  }, [firstMessage, requestURL]);

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="App">
      <div className="input-group mb-3">
        <input
          value={URL}
          onChange={e => setURL(e.target.value)}
          type="text"
          onKeyDown={onKeyDown}
          className="form-control"
          placeholder="Fetch Json Params URL"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append" onClick={onSubmit}>
          <span className="input-group-text" id="basic-addon2">
            Submit
          </span>
        </div>
      </div>
      {steps.length > 0 && <ChatBot steps={steps} />}
    </div>
  );
};

export default App;
