import { useState } from "react";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useLocalStorage from "../utils/useLocalStorage";

export default function ProtectedEditPage() {
  const router = useRouter();
  const [inputUrl, setInputUrl] = useState("");
  const [postText, setPostText] = useLocalStorage("postText", "");

  const handleFetchClick = async () => {
    if (!inputUrl) {
      return;
      // show error in UI that please enter a URL
    }
    const { data } = await axios.get(`/api/scrape?url=${inputUrl}`);
    const { blogPostText, error } = data;
    console.log(error);
    console.log(blogPostText); // text of blog post
    if (error) {
      // show error message in UI that not a hashnode blog, please enter a hashnode blog post url
    }
    if (blogPostText) {
      await setPostText(blogPostText); // stored in localStorage as postText
      router.push("/edit");
    }
  };

  return (
    <div>
      <h1>Enter Hashnode Blog URL</h1>
      <Input
        placeholder="https://example.com"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
      {/* Have a button for example, my tailwindcss article link */}
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={handleFetchClick}
      >
        Fetch blog post
      </Button>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
