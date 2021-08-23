import { useState } from "react";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import useLocalStorage from "../utils/useLocalStorage";

export default function ProtectedEditPage() {
  const router = useRouter();
  const [inputUrl, setInputUrl] = useState("");
  const [postText, setPostText] = useLocalStorage("postText", "");
  const [postUrl, setPostUrl] = useLocalStorage("postUrl", "");

  const handleFetchClick = async () => {
    if (!inputUrl) {
      return;
      // show error in UI that please enter a URL
    }
    const { data } = await axios.get(`/api/scrape?url=${inputUrl}`);
    const { blogPostText, error } = data;

    if (error) {
      // show error message in UI that not a hashnode blog, please enter a hashnode blog post url
    }
    if (blogPostText) {
      await setPostText(blogPostText); // blog post text stored in localStorage as postText
      await setPostUrl(inputUrl); // url stored in localStorage as postUrl
      router.push("/edit");
    }
  };

  return (
    <div>
      <h1>Enter Hashnode Blog URL</h1>
      <input
        type="text"
        placeholder="https://example.com"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
      {/* Have a button for example, my tailwindcss article link */}
      <button
        // type="primary"
        // icon={<SearchOutlined />}
        onClick={handleFetchClick}
      >
        Fetch blog post
      </button>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
