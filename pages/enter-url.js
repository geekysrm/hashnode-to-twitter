import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

export default function ProtectedEditPage() {
  return (
    <div>
      <h1>Enter Hashnode Blog URL</h1>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
