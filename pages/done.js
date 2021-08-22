import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProtectedDonePage() {
  const { query } = useRouter();
  const { mainTweetId } = query;
  if (!mainTweetId) {
    return (
      <div>
        Please go to{" "}
        <Link href="/enter-url">
          <a>Enter URL</a>
        </Link>{" "}
        page.
      </div>
    );
  }
  return (
    <div>
      <Head>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
      </Head>
      <h1>Congrats! 🎉 Your tweet was successfully posted!</h1>
      <span>Click the tweet to view the full tweet.</span>
      <blockquote class="twitter-tweet">
        <a href={`https://twitter.com/x/status/${mainTweetId}`}></a>
      </blockquote>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
