import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";
// import { Input } from "antd";
import twitterSplitter from "twitter-splitter";
import Preview from "../components/Preview";

// const { TextArea } = Input;

const limit = 280;
const joiner = "...";

export default function ProtectedEditPage() {
  const [editorTexts, setEditorTexts] = useState([]);
  useEffect(() => {
    if (process.browser) {
      const postText = window.localStorage.getItem("postText");
      const postUrl = window.localStorage.getItem("postUrl");

      const sentences = twitterSplitter(
        postText.substring(1, postText.length - 1),
        limit,
        joiner
      );
      const blogLinkText = `To read more, please visit my blog at @hashnode : ${postUrl.substring(
        1,
        postUrl.length - 1
      )}`;
      const sentencesWithPostLink = [...sentences, blogLinkText];
      setEditorTexts(sentencesWithPostLink);
    }
  }, []);
  console.log({ editorTexts });

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        <h1>Edit Tweet Thread</h1>
        {editorTexts.map((text, idx) => {
          return (
            <textarea
              value={text}
              // showCount
              // maxLength={280}
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
      </div>
      {editorTexts.length && (
        <div style={{ width: "50%" }}>
          <Preview tweets={editorTexts} />
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
