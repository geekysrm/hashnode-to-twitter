import { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function ProtectedEditPage() {
  const [inputUrl, setInputUrl] = useState("");

  const handleFetchClick = async () => {
    const { data } = await axios.get(`/api/scrape?url=${inputUrl}`);
    const { isHashnodeBlogPostUrl } = data;
    console.log(isHashnodeBlogPostUrl);
  };

  return (
    <div>
      <h1>Enter Hashnode Blog URL</h1>
      <Input
        placeholder="https://example.com"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
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
