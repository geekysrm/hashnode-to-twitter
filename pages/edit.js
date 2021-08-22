import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "../utils/useLocalStorage";
import { Input } from "antd";
import tokenizer from "sbd";
import twitterSplitter from "twitter-splitter";
// import countChars from "../utils/countChars";

const { TextArea } = Input;

const limit = 280;
const joiner = "...";

export default function ProtectedEditPage() {
  // const [postText, setPostText] = useLocalStorage("postText", "");
  const [editorTexts, setEditorTexts] = useState([]);
  useEffect(() => {
    if (process.browser) {
      const postText = window.localStorage.getItem("postText");
      // console.log(postText);
      // const ans = countChars("abc😎def");
      // const sentences = tokenizer.sentences(
      //   postText.substring(1, postText.length - 1),
      //   { preserve_whitespace: true }
      // );

      const sentences = twitterSplitter(
        postText.substring(1, postText.length - 1),
        limit,
        joiner
      );
      // console.log(sentences); // array
      setEditorTexts(sentences);
    }
  }, []);
  // console.log(editorTexts);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        <h1>Edit Tweet Thread</h1>
        {editorTexts.map((text, idx) => {
          return (
            <TextArea
              value={text}
              // rows={200}
              showCount
              maxLength={280}
              onChange={(e) => {
                let charToBeAdded = e.target.value;
                console.log(charToBeAdded);
                let newArray = [];
                for (let i = 0; i < editorTexts.length; i++) {
                  if (i === idx) {
                    newArray.push(charToBeAdded);
                  } else newArray.push(editorTexts[i]);
                }
                setEditorTexts(newArray);
              }}
            />
          );
        })}
        {/* <div dangerouslySetInnerHTML={{ __html: editorTexts }} /> */}
        {/* <button
        onClick={() => {
          setEditorTexts([...editorTexts, ""]);
        }}
      >
        +
      </button> */}
      </div>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
