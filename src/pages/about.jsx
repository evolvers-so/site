import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const FounderCards = () => {
  return (
    <section
      className=" w-full h-screen py-36 grid items-center gap-8 mx-auto  "
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23171717'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div className="mx-auto flex w-fit flex-wrap justify-center gap-4">
        <Card
          name="Siddharth Duggal"
          role="Founder"
          linkedin="https://www.linkedin.com/in/siddharth-duggal/"
          github="https://github.com/siddharthd0"
          website="https://siddharthduggal.com"
          description="Description about Siddharth Duggal."
        />
        <Card
          name="Aditya Sahasranam"
          role="Founder"
          linkedin="https://www.linkedin.com/in/adityasahas2025/"
          github="https://github.com/adityasahas"
          website="https://adityasahas.tech"
          description="Description about Aditya Sahasranam."
        />
      </div>
    </section>
  );
};

const Card = ({ name, role, linkedin, github, website, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-96 w-80 shrink-0 overflow-hidden rounded-xl p-8 bg-indigo-500">
      <div className="text-white">
        <h2 className="text-2xl font-bold">{name}</h2>
        <h3 className="text-lg italic">{role}</h3>
        <ul className="mt-4 space-y-2">
          <li><a href={linkedin} className="text-white hover:underline">LinkedIn</a></li>
          <li><a href={github} className="text-white hover:underline">GitHub</a></li>
          <li><a href={website} className="text-white hover:underline">Website</a></li>
        </ul>
        <button onClick={() => setIsOpen(true)} className="mt-6 px-4 py-2 border-2 border-white rounded hover:bg-white hover:text-indigo-500">Learn More</button>
      </div>
      <SpringModal description={description} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const SpringModal = ({ description, isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-indigo-600 p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default"
          >
            <p>{description}</p>
            <button onClick={() => setIsOpen(false)} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FounderCards;
