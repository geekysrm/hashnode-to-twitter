import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import useLocalStorage from "../utils/useLocalStorage";
import { Input } from "antd";

const { TextArea } = Input;

export default function ProtectedEditPage() {
  // const [postText, setPostText] = useLocalStorage("postText", "");
  if (process.browser) {
    const postText = window.localStorage.getItem("postText");
    console.log(postText);
  }

  return (
    <div>
      <h1>Edit Tweet Thread</h1>
      <TextArea
        showCount
        maxLength={280}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
