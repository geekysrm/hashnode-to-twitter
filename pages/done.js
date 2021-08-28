import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../components/Header";

export default function ProtectedDonePage({ user }) {
  const { query } = useRouter();
  const { postedTweets: postedTweetsString } = query;
  const postedTweets = JSON.parse(postedTweetsString);
  console.log("new", postedTweets);
  if (!postedTweets || postedTweets.length === 0) {
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
      <Header user={user} />
      <h1>Congrats! 🎉 Your tweet was successfully posted!</h1>
      <span>
        Click{" "}
        <a
          href={`https://twitter.com/${user.nickname}/status/${postedTweets[0].id_str}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          here
        </a>{" "}
        to view it on Twitter.
      </span>
      <div>
        {postedTweets.map((tweet) => (
          <blockquote class="twitter-tweet">
            <a
              href={`https://twitter.com/${user.nickname}/status/${tweet.id_str}`}
            ></a>
          </blockquote>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
