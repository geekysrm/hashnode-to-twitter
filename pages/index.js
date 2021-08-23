import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export default function Home() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  console.log(user);
  return (
    <div>
      <section
        style={{
          background: "#2962ff",
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Hashnode to Twitter</h1>
      </section>
    </div>
  );
  return (
    <div className={styles.container}>
      {user ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <div>
            {" "}
            <Link href="/api/auth/logout">
              <a>Logout</a>
            </Link>
            <Button type="primary" icon={<DownloadOutlined />} size={"large"} />
          </div>
        </div>
      ) : (
        <Link href="/api/auth/login">
          <a>Login</a>
        </Link>
      )}
    </div>
  );
}
