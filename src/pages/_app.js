import "../styles/globals.css";
import Navigation from "../components/navigation";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <div className="lowercase font-custom">
          <Navigation />
          <Component {...pageProps} />
          <Footer />
          <Analytics />
        </div>
      </SessionProvider>
    </>
  );
}
