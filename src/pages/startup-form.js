import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ChipTabs from "../components/tabs";
import Notification from "../components/notification";
function StartupForm() {
  const [cofounders, setCofounders] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const addCofounder = () => {
    setCofounders([...cofounders, { name: '', email: '' }]);
  };

  const removeCofounder = (index) => {
    const newCofounders = [...cofounders];
    newCofounders.splice(index, 1);
    setCofounders(newCofounders);
  };

  const { data: session } = useSession();
  const currentTime = new Date().toLocaleTimeString();
  const router = useRouter();

  if (!session) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Use FormData to get the form data
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    try {
      const res = await fetch(`/api/registerStartup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const apiResponse = await res.json();
  
      if (res.ok) {
        // Show success notification
        Notification({
          id: Date.now(),
          text: 'Startup registered successfully!',
        });
      } else {
        // Show error notification
        Notification({
          id: Date.now(),
          text: apiResponse.error || 'Failed to register startup.',
        });
      }
  
    } catch (error) {
      // Show error notification
      Notification({
        id: Date.now(),
        text: 'An unexpected error occurred.',
      });
    }
  };
  

  const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };
  
  const inputClasses = "mt-1 p-2 w-full bg-black border rounded-md text-white hover:bg-opacity-70 focus:bg-opacity-60 focus:ring-2 focus:ring-purple-600";

  return (
    <div className="min-h-screen py-44 flex flex-col justify-start items-center text-white bg-black">
      <div className="flex w-full max-w-2xl">
        <div className="flex-1">
          <ChipTabs />
        </div>
        <div className="flex-1 text-right">{session.user.email}</div>
      </div>
      <div className="w-full max-w-2xl mt-2">
        {currentTime && (
          <>
          <div className="bg-black w-full rounded-lg shadow-xl py-6">
            <h2 className="text-2xl font-semibold text-white mb-5 font-light">Register Your Startup</h2>
            <form>
              <FormControl className={inputClasses} label="Startup Name" placeholder="Enter Startup Name" />
              <FormControl label="Founder's Name" placeholder="Enter Founder's Name" />
              <FormControl label="Email" placeholder="Enter Email Address" type="email" />
              <FormControl label="Website" placeholder="Enter Website URL" type="url" />
              <FormControl label="Startup Description" placeholder="Briefly describe your startup" type="textarea" />

              {cofounders.map((cofounder, index) => (
                <div key={index}>
                  <FormControl label="Co-founder's Name" placeholder="Enter Co-founder's Name" />
                  <FormControl label="Co-founder's Email" placeholder="Enter Co-founder's Email" type="email" />
                  <button onClick={() => removeCofounder(index)} type="button" className="text-white bg-red-600 p-1 rounded">Remove Co-founder</button>
                </div>
              ))}

              <button type="button" onClick={addCofounder} className="w-full mt-4 mb-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold p-2 rounded">
                Add Co-founder
              </button>

              <button onClick={handleSubmit} type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-2 rounded">
                Register
              </button>
            </form>
          </div>
           {/* Notifications rendering */}
        <div className="fixed top-2 right-2 z-50 pointer-events-none">
        {notifications.map((n) => (
          <Notification {...n} key={n.id} onClose={() => removeNotif(n.id)} />
        ))}
      </div>
      </>
        )}
      </div>
    </div>
  );
}

const FormControl = ({ label, placeholder, type = "text" }) => {
  const inputClasses = "mt-1 p-2 w-full bg-black border rounded-md text-white hover:bg-opacity-70 focus:bg-opacity-60 focus:ring-2 focus:ring-purple-600";
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-white">{label}</label>
      {type === "textarea" ? 
        <textarea placeholder={placeholder} required className={inputClasses}></textarea> 
        : 
        <input type={type} placeholder={placeholder} required className={inputClasses} />
      }
    </div>
  );
}

export default StartupForm;
