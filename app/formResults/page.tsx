'use client'

import Header from "../components/header";
import { db } from "@/firebaseConfig";
import { query, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";



type EventCompany = {
  id: string;
  title: string[];
};

type Event = {
  id: string;
  title: string;
  name: string;
  attend: string;
  subcollectionTitle: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  approved: boolean;
};

async function getEvents() {
  const q = query(collection(db, 'EventsNew'));
  const querySnapshot = await getDocs(q);
  const events = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const eventData = doc.data() as EventCompany;

      const subcollectionData = await Promise.all(
        eventData.title.map(async (title) => {
          const subcollectionRef = collection(db, `EventsNew/${doc.id}/${title}`);
          const subcollectionSnapshot = await getDocs(subcollectionRef);
          return subcollectionSnapshot.docs.map(subDoc => {
            return { id: subDoc.id, ...subDoc.data(), subcollectionTitle: title } as Event;
          });
        })
      );

      return { ...eventData, id: doc.id, subcollectionData: subcollectionData.flat() };
    })
  );
  return events;
}

async function getUnapprovedUsers() {
  const q = query(collection(db, 'users'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((user) => !user.approved) as User[];
}

const AnalyzeData = () => {
  const [events, setEvents] = useState<(EventCompany & { subcollectionData?: Event[] })[]>([]);
  const [unapprovedUsers, setUnapprovedUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);

      const usersData = await getUnapprovedUsers();
      setUnapprovedUsers(usersData);
    };
    fetchData();
  }, []);

  const approveUser = async (userId: string) => {
    try {
      await updateDoc(doc(db, "users", userId), { approved: true });
      setUnapprovedUsers((prev) => prev.filter((user) => user.id !== userId));
      alert("User approved successfully!");
    } catch (err) {
      console.error("Error approving user:", err);
    }
  };

  return (
    <ProtectedRoute>
      <Header title="Form Results" path="/formResults" gradientColor="#1b284f" cmePath="" />
      <div className="m-5">
        <h1 className="text-3xl font-bold mb-10">Analysis Results</h1>

        {/* Events Section */}
        {events.map((event) => (
          <div key={event.id} className="mb-8">
            <h2 className="text-2xl font-bold mb-3">{event.id}</h2>
            {event.subcollectionData && (
              <div>
                {Object.entries(event.subcollectionData.reduce((acc, sub) => {
                  if (!acc[sub.subcollectionTitle]) {
                    acc[sub.subcollectionTitle] = [];
                  }
                  acc[sub.subcollectionTitle].push({ name: sub.name, attend: sub.attend });
                  return acc;
                }, {} as Record<string, { name: string; attend: string }[]>)).map(([subcollectionTitle, items]) => {
                  const liveCount = items.filter(item => item.attend === 'live').length;
                  return (
                    <div key={subcollectionTitle}>
                      <h3 className="text-xl font-semibold">{subcollectionTitle} (Live: {liveCount})</h3>
                      <ul className="list-disc list-inside">
                        {items.map((item, index) => (
                          <li key={index}>
                            {item.name} - {item.attend}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* Admin Approval Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Unapproved Users</h2>
          {unapprovedUsers.length > 0 ? (
            <ul className="space-y-4">
              {unapprovedUsers.map((user) => (
                <li key={user.id} className="flex justify-between items-center p-4 border rounded-lg shadow">
                  <div>
                    <p className="font-bold">Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                  </div>
                  <button
                    onClick={() => approveUser(user.id)}
                    className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No unapproved users at the moment.</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AnalyzeData;