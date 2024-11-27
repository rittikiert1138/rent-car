import "@/assets/css/globals.css";
import "@/assets/css/config.css";
import "@/assets/css/font.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AdminProvider } from "@/context/AdminContext";
import { MemberProvider } from "@/context/MemberContext";
import { usePathname } from "next/navigation";

export default function App({ Component, pageProps }: AppProps) {
  const pathName = usePathname();

  return (
    <>
      <Head>
        <title>Lotto</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </Head>
      {pathName && (
        <>
          {pathName.startsWith("/backend/console") ? (
            <AdminProvider>
              <Component {...pageProps} />
            </AdminProvider>
          ) : (
            <MemberProvider>
              <Component {...pageProps} />
            </MemberProvider>
          )}
        </>
      )}
    </>
  );
}
