import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

export default function ProtectedEditPage() {
  return (
    <div>
      <h1>Edit Tweet Thread</h1>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
