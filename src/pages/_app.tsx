import "@/assets/css/globals.css";
import "@/assets/css/config.css";
import "@/assets/css/font.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Lotto</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
