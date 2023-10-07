import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ChipTabs from "../components/tabs";
import { BsFillCalendarCheckFill } from "react-icons/bs";

const CreateModal = ({ showModal, setShowModal }) => {
  const [step, setStep] = useState(1);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [dates, setDates] = useState("");

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <AnimatePresence >
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            key={step}
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "-12.5deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <BsFillCalendarCheckFill className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
              <BsFillCalendarCheckFill />
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              &times;
            </button>
            <AnimatePresence >
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label className="block mb-2">Event Name</label>
                    <input
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className="w-full p-2 border rounded-md mb-4 text-black"
                    />

                    <label className="block mb-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border rounded-md text-black"
                    ></textarea>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label className="block mb-2">Select Dates</label>
                    <input
                      type="date"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                      className="w-full p-2 border rounded-md text-black"
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex justify-center items-center">
                    <button className="bg-green-500 text-white px-6 py-2 rounded-md">
                      Confirm
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Next
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const When2Meet = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-44  flex flex-col justify-start items-center text-white">
      <div className="flex w-full max-w-2xl">
        <div className="flex-1">
          <ChipTabs />
        </div>
        <div className="flex-1 text-right">{session.user.email}</div>
      </div>
      <div className="w-full max-w-2xl mt-2">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-md"
        >
          Create When2Meet
        </button>

        {showModal && (
          <CreateModal showModal={showModal} setShowModal={setShowModal} />
        )}
      </div>
    </div>
  );
};

export default When2Meet;
