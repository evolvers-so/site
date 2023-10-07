import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WetPaintButton from "./button";
import Link from "next/link";
const ShuffleHero = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const phrase = "Dreaming Big Starting Small.";
    setWords(phrase.split(' '));
  }, []);

  return (
    <section
    className="relative h-screen w-full overflow-hidden bg-black"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23171717'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
    }}
  >
    <section className="w-full h-screen py-36 grid items-center gap-8 mx-auto text-center">
      <div className="container mx-auto md:w-1/2">
        <motion.span
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="block mb-4 text-sm md:text-sm text-indigo-500 font-medium"
        >
          A community of teen entrepreneurs
        </motion.span>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          <AnimatePresence>
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.7, delay: index * 0.4 }}
              >
                {word + " "}
              </motion.span>
            ))}
          </AnimatePresence>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="text-base md:text-lg text-slate-700 my-4 md:my-6 text-white"
        >
          In every small beginning, there's a blueprint for the future.
        </motion.p>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 3, duration: 0.6, type: "spring", bounce: 0.3 }}
        >
          <Link href="/login">
            <WetPaintButton name="kick off your startup" />
          </Link>
        </motion.div>
      </div>
    </section>
    </section>
  );
};

export default ShuffleHero;
