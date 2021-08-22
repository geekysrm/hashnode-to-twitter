import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "../utils/useLocalStorage";
import { Input } from "antd";
// import countChars from "../utils/countChars";

const { TextArea } = Input;

export default function ProtectedEditPage() {
  // const [postText, setPostText] = useLocalStorage("postText", "");
  const [editorTexts, setEditorTexts] = useState("");
  useEffect(() => {
    if (process.browser) {
      const postText = window.localStorage.getItem("postText");
      // console.log(postText);
      // const ans = countChars("abc😎def");
      setEditorTexts(postText.substring(1, postText.length - 1));
    }
  }, []);
  console.log(editorTexts);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        <h1>Edit Tweet Thread</h1>
        <TextArea
          value={editorTexts}
          rows={200}
          showCount
          // maxLength={280}
          onChange={(e) => {
            setEditorTexts(e.target.value);
          }}
        />
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
