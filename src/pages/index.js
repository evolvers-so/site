import Image from "next/image";
import { Inter } from "next/font/google";
import Landing from "../components/landing";
const inter = Inter({ subsets: ["latin"] });
import StatsComp  from "../components/stats";
import landingDos from "../components/landingDos";
export default function Home() {
  return (
    <>
      <div>
       <Landing/>
        <StatsComp/>
        <landingDos/>
      </div>
    </>
  );
}
