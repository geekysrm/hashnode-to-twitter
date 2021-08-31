import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";
import twitterSplitter from "twitter-splitter";
import Head from "next/head";
import { RiDeleteBinLine } from "react-icons/ri";
import Preview from "../components/Preview";
import Header from "../components/Header";
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
    if (typeof window !== "undefined") {
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
    <>
      <Head>
        <title>Edit thread - Hashnode to Twitter</title>
      </Head>
      <div className="mx-auto">
        <Header user={user} />
        <div className="flex flex-col items-center md:items-stretch md:flex-row md:space-x-36">
          <div className="w-11/12 ml-0 md:w-1/2 md:ml-64">
            <h2 className="py-0 pl-5 text-2xl font-bold leading-7 text-center text-gray-900 md:py-5 md:text-left sm:text-3xl sm:truncate">
              Edit Tweet Thread
            </h2>
            <p className="py-0 pl-5 mt-2 mb-2 text-sm leading-tight text-center text-gray-600 md:-mt-2 md:text-left sm:truncate md:mb-0">
              It is recommended to not post more than 6 tweets in total at once
              for better visibility.
            </p>
            <p className="py-0 pl-5 mb-2 text-sm font-semibold leading-tight text-center text-gray-600 md:mt-2 md:mb-6 md:text-left sm:truncate">
              If number of tweets is more than 6, then first 6 tweets will be
              posted.
            </p>

            <p className="mb-4 text-center text-gray-600 md:hidden">
              Go to{" "}
              <a href="#preview" className="text-blue-500 hover:underline">
                Preview
              </a>
            </p>

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

                    <div className="flex justify-between px-3 py-2 bg-indigo-100 border-b">
                      <h3 className="text-sm font-medium text-gray-800">
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
                      key={`tweet-${idx + 1}`}
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
            <div
              id="preview"
              className="w-11/12 pr-0 bg-white md:pr-64 md:w-1/2"
            >
              <Preview user={user} tweets={editorTexts} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
