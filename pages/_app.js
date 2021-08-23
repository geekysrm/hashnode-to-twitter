import React from "react";
import "antd/dist/antd.css";
import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Component {...pageProps} />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </UserProvider>
  );
}
