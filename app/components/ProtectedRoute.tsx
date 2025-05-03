'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from "@/firebaseConfig"; // Import auth from firebaseConfig
import { onAuthStateChanged, signOut } from "firebase/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        router.push('/login'); // Redirect to login page if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login'); // Redirect to login page after logout
  };

  if (!user) {
    return null; // Render nothing while checking authentication
  }

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;