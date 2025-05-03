'use client';

import { useEffect, useState } from 'react';
import { auth } from "@/firebaseConfig"; // Import auth from firebaseConfig
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Import Firestore instance
import Header from '../components/header';

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  useEffect(() => {
    // Set Firebase auth persistence to session
    setPersistence(auth, browserSessionPersistence).catch((err) => {
      console.error("Failed to set session persistence:", err);
    });

    // Sign out the user when the page loads
    signOut(auth).catch((err) => {
      console.error("Failed to sign out:", err);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user is approved
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && !userDoc.data().approved) {
        setError("Your account is not approved yet. Please wait for admin approval.");
        return;
      }

      onLogin(); // Redirect to the secure page
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Firebase: Error (auth/invalid-credential).') {
          setError('Incorrect login or password');
        } else {
          setError(`Failed to log in: ${err.message}`);
        }
      } else {
        setError('Failed to log in');
      }
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user information in Firestore with `approved: false`
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        approved: false, // Default status is not approved
        createdAt: new Date(),
      });

      setError(null);
      alert("Account created successfully! Please wait for admin approval.");
      setIsCreatingAccount(false); // Redirect back to login
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to create account: ${err.message}`);
      } else {
        setError("Failed to create account");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check if the user is approved
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && !userDoc.data().approved) {
        setError("Your account is not approved yet. Please wait for admin approval.");
        return;
      }

      onLogin(); // Redirect to the secure page
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to log in with Google: ${err.message}`);
      } else {
        setError('Failed to log in with Google');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Login" path="/login" gradientColor="#1b284f" cmePath="" />
      <div className="flex flex-col items-center justify-center flex-grow bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            {isCreatingAccount ? 'Create Account' : 'Login'}
          </h2>
          {isCreatingAccount ? (
            <form onSubmit={handleCreateAccount} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingAccount(false)}
                className="w-full px-4 py-2 mt-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md shadow-sm hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Login
              </button>
            </form>
          ) : (
            <>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </form>
              <div className="">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign in with Google
                </button>
                <button
                  onClick={() => setIsCreatingAccount(true)}
                  className="w-full px-4 py-2 mt-6 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md shadow-sm hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Account
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = '/secure'; // Redirect to the protected page after login
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;