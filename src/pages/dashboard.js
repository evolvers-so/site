import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ChipTabs from '../components/tabs';

function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const currentTime = new Date().toLocaleTimeString();
  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-44  flex flex-col justify-start items-center text-white">
      <div className="flex w-full max-w-2xl">
        <div className="flex-1">
          <ChipTabs />
        </div>
        <div className="flex-1 text-right">
          {session.user.email}
        </div>
      </div>
      <div className="w-full max-w-2xl mt-2">
        <div className="mt-8 ">
          {currentTime && (
            <h2 className="text-2xl mb-4">
              Good {currentTime.split(':')[0] >= 12 ? 'afternoon' : 'morning'}, the current time is {currentTime}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
