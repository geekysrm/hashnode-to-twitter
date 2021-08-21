import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function ProtectedPage() {
  return <div>Hello</div>;
}

export const getServerSideProps = withPageAuthRequired();
