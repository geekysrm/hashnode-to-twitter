import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";
import twitterSplitter from "twitter-splitter";
import Preview from "../components/Preview";
import Header from "../components/Header";
import { RiDeleteBinLine } from "react-icons/ri";
import countChars from "../utils/countChars";
import EnterPopular from "../components/EnterPopular";

const limit = 280;
const joiner = "...";
const popularWords = [
  "🧵",
  "💯",
  "🎉",
  "🎁",
  "🔥",
  "#javascript",
  "#js",
  "#nextjs",
  "#tech",
  "#100DaysOfCode",
  "#code",
  "#blog",
  "#serverless",
  "#nodejs",
  "#programming",
  "#tailwindcss",
  "#html",
  "#css",
  "#webdev",
];

export default function ProtectedEditPage({ user }) {
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

  return (
    <div className="mx-auto">
      <Header user={user} />
      <div className="flex space-x-36">
        <div className="w-1/2 ml-64">
          <h2 className="py-5 pl-5 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Edit Tweet Thread
          </h2>

          <div className="flex flex-col pl-5">
            {editorTexts.map((text, idx) => {
              return (
                <div className="w-full mb-8">
                  <p className="text-sm text-gray-600">Click to add:</p>
                  <div className="mb-2 space-x-2 text-gray-600">
                    {popularWords.map((ch) => (
                      <EnterPopular
                        editorTexts={editorTexts}
                        text={text}
                        idx={idx}
                        toAdd={ch}
                        setEditorTexts={setEditorTexts}
                      />
                    ))}
                  </div>

                  <div class="bg-gray-200 px-3 py-2 border-b flex justify-between">
                    <h3 class="text-sm text-gray-800 font-medium">
                      Tweet #{idx + 1}
                    </h3>
                    <div>
                      <button
                        title="Delete tweet"
                        onClick={() => {
                          const tempEditorTexts = [...editorTexts];
                          tempEditorTexts.splice(idx, 1);
                          setEditorTexts(tempEditorTexts);
                        }}
                      >
                        <RiDeleteBinLine className="hover:text-red-400" />
                      </button>
                    </div>
                  </div>

                  <textarea
                    id={`tweet-${idx + 1}`}
                    className="w-full px-2 py-4 mb-3 border-b-2 border-l-2 border-r-2 border-gray-200 h-36"
                    resize="vertical"
                    value={text}
                    placeholder="Enter a tweet"
                    onChange={(e) => {
                      const charToBeAdded = e.target.value;
                      const currentText = text;

                      if (
                        countChars(charToBeAdded) > 280 &&
                        charToBeAdded.length > currentText.length
                      ) {
                        return;
                      }

                      let newArray = [];
                      for (let i = 0; i < editorTexts.length; i++) {
                        if (i === idx) {
                          newArray.push(charToBeAdded);
                        } else newArray.push(editorTexts[i]);
                      }
                      setEditorTexts(newArray);
                    }}
                  />
                  <p className="text-right text-gray-500">
                    {countChars(text)}/280
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {editorTexts.length && (
          <div className="w-1/2 pr-64 bg-white">
            <Preview user={user} tweets={editorTexts} />
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
