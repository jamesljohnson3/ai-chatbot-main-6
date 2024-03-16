"use client"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Spinner } from "@nextui-org/react";
import { BackgroundGradient } from '@/components/gradients/background-gradient';
import Cookies from 'js-cookie';
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'; // Import the useRouter hook

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function Auth() {
  const { data: session, status } = useSession();
  const isAuthuserPresent = status === "authenticated" && session;
  const [isLoading, setIsLoading] = useState(true);
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const router = useRouter(); // Initialize the router
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const LoadingAnimation = () => (
     
      <Spinner size="lg" color="secondary" />
    
  );

  useEffect(() => {
    if (isAuthuserPresent) {
      // Set the cookie with the user's email
      Cookies.set('split-userkey', session?.user?.email ?? 'subaccount');
      Cookies.set('CORD_USER_COOKIE', session?.user?.email ?? 'subaccount');
      Cookies.set('NOW_COOKIE_1', session?.user?.username ?? 'subaccount');
      Cookies.set('NOW_COOKIE_2', session?.user?.id ?? 'subaccount');
      Cookies.set('NOW_COOKIE_3', session?.user?.image ?? 'subaccount');
      Cookies.set('NOW_COOKIE_4', session?.user?.name ?? 'subaccount');



    }

    // Check if either isLoaded or isSignedIn is false, redirect to the dashboard
    if (!isLoaded || !isSignedIn) {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        setRedirectToDashboard(true);
      }, 7500);
      return () => clearTimeout(timeoutId);

    } else {
      router.push('/dashboard');
    }
  }, [isAuthuserPresent, session, isLoaded, isSignedIn, router]);

  return (
    <>
      <main className="my-32 w-full dark:bg-dark flex justify-center font-mr">
        <div className="relative flex flex-col items-center justify-center">
          <div>
         
          </div>
          {!isSignedIn && (
            <iframe
              src={`https://dashboard.unlimitpotential.com/auth?user=${session?.user?.email}`}
              style={{ display: 'none' }}
              ></iframe>
          )}

          {isLoading ? (
            <div>
              <button
                className="self-center mt-8 inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2
                font-semibold text-light hover:border-dark hover:bg-light hover:text-dark 
                dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light
                "
                onClick={() => null}
              >
               <LoadingAnimation />  
               
              </button>
              <div style={containerStyle}>
               
              </div>
            </div>
          ) : (
            <div>
             
              <button
                className="self-center mt-8 inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2
                font-semibold text-light hover:border-dark hover:bg-light hover:text-dark 
                dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light
                "
                onClick={() => {
                  router.push('/dashboard');
                }}
              >
                Open BID
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Auth;