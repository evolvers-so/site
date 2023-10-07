import { signIn, useSession, signOut } from "next-auth/react";
import { useState } from "react";

function YourComponent() {
  console.log("Before useSession");
  const { data: session } = useSession();
  console.log("After useSession", session);

  const [email, setEmail] = useState('');

  if (!session) {
    console.log("Session unavailable");
    return (
      <div className="min-h-screen  flex flex-col justify-center items-center" style={{
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23171717'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
    }}>
        <div className="w-1/2 md:w-1/4">
          <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Enter your email:</label>
          <input 
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
                console.log("Captured Email:", e.target.value);
            }}
            placeholder="user@example.com"
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-dark"
          />
          <button 
            onClick={() => {
                console.log("Attempting signIn with email:", email);
                signIn("email", { email })
                    .then(response => {
                        console.log("signIn response:", response);
                    })
                    .catch(error => {
                        console.error("signIn error:", error);
                    });
            }}
            className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-indigo"
          >
            Sign In with Magic Link
          </button>
        </div>
      </div>
    );
  }

  console.log("Detected session for user:", session.user.email);
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
      Welcome {session.user.email}
      <button onClick={() => signOut()} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red">
        Sign Out
      </button>
    </div>
  );
}

export default YourComponent;
