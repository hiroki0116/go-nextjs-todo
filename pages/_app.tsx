import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { AuthProvider } from "context/AuthContext";
import "tailwindcss/tailwind.css";
import "styles/globals.css";
import "styles/custom-antd.css";
import NavBar from "components/Layout/NavBar";
import Footer from "components/Layout/Footer";
import LayoutWrapper from "components/Layout/LayoutWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Golang TODO</title>
        <meta name="description" content="Simple Todo App with Golang" />
      </Head>
      <AuthProvider>
        <NavBar />
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
        <Footer />
      </AuthProvider>
    </>
  );
}
