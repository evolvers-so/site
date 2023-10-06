import "@/styles/globals.css";
import Navigation from "@/components/navigation";
export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="lowercase">
        <Navigation />
        <Component {...pageProps} />
      </div>
    </>
  );
}
