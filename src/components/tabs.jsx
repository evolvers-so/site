import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from 'next/router';

const tabs = ["Home", "Register Startup"]

const ChipTabs = () => {
  const router = useRouter();
  const defaultTab = router.pathname === '/startup-form' ? 'Register Startup' : 'Home';
  const [selected, setSelected] = useState(defaultTab);

  return (
    <div className=" flex items-center flex-wrap gap-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab}
        />
      ))}
    </div>
  );
};

const Chip = ({ text, selected, setSelected }) => {
  const router = useRouter();

  const handleNavigation = () => {
    setSelected(text);

    // Determine where to navigate based on the tab text
    const path = text === "Home" ? "/dashboard" : "/startup-form";
    router.push(path);
  };

  return (
    <button
      onClick={handleNavigation}
      className={`${
        selected
          ? "text-white"
          : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
      } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;