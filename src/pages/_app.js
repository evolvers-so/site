import "../styles/globals.css";
import Navigation from "../components/navigation";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <div className="lowercase font-custom">
          <Navigation />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  );
}
