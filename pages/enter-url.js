import { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function ProtectedEditPage() {
  const [inputUrl, setInputUrl] = useState("");

  const handleFetchClick = async () => {
    if (!inputUrl) {
      return;
      // show error in UI that please enter a URL
    }
    const { data } = await axios.get(`/api/scrape?url=${inputUrl}`);
    const { isHashnodeBlogPostUrl, error } = data;
    console.log(isHashnodeBlogPostUrl);
    // if (!isHashnodeBlogPostUrl) {
    //   // not a Hashnode blog post URL, show error in UI that please enter a Hashnode blog post URL
    // } else {
    //   // is a hashode blog post URL
    // }
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
