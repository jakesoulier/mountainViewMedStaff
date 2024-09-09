'use client'

import React, { useState, useEffect } from 'react';
import "../assets/ButtonStyles.css"
// db connection
import { db } from '@/firebaseConfig';
import { z } from 'zod';
import { EventSchema } from '../validationSchemas';
import { collection, query, getDocs } from 'firebase/firestore';

// fields in event form
type EventForm = z.infer<typeof EventSchema>;

const eventsMountainText = "eventsMountain";
const eventsIFCHText = "eventsIFCH";

// get all events from the db
async function getEvents(eventName: string) {
  const q = query(collection(db, eventName));
  const querySnapshot = await getDocs(q);
  const eventList = querySnapshot.docs.map(doc => doc.data() as EventForm);
  return eventList;
}

// Sample data for the tables
const eventsTab1 = [
  { id: 1, name: 'Event 1', date: '2024-08-15', location: 'Location A' },
  { id: 2, name: 'Event 2', date: '2024-08-16', location: 'Location B' },
  { id: 3, name: 'Event 3', date: '2024-08-17', location: 'Location C' },
];

const eventsTab2 = [
  { id: 1, name: 'Event 4', date: '2024-09-01', location: 'Location D' },
  { id: 2, name: 'Event 5', date: '2024-09-02', location: 'Location E' },
  { id: 3, name: 'Event 6', date: '2024-09-03', location: 'Location F' },
];

const Table = ({ events, color }: { events: EventForm[], color: string }) => (
  <table className="border-4 w-full" style={{ borderColor: color }}>
    <tbody>
      {events.map((event, index) => (
        <tr key={index} className='flex flex-col pl-5 pt-5 pr-5'>
          <div className="flex align-bottom">
            <td className='flex flex-col text-center'>
              <td className="text-5xl font-bold">{event.day}</td>
              <td>{event.month.toUpperCase()}</td>
            </td>
            <div className='flex flex-col p-2 pl-4'>
              <td className=" text-2xl font-bold">{event.title}</td>
              <td className="">{event.description}</td>
            </div>
            <td className="p-4 ml-auto">
               <button className="button">
                Register
              </button>
            </td>
          </div>
          <hr className="my-4 border-black mx-auto" style={{ width: "100%" }} />
        </tr>
      ))}
    </tbody>
  </table>
);

const Events = () => {

  const [eventsMountain, setEventsMountain] = useState<EventForm[]>([]);
  const [eventsIFCH, setEventsIFCH] = useState<EventForm[]>([]);

  useEffect(() => {
    /**
     * Fetches mountainview & IFCH events and updates the state with the fetched data.
     */
    const fetchData = async () => {
        const eventsMountain = await getEvents(eventsMountainText);
        setEventsMountain(eventsMountain);
        const eventsIFCH = await getEvents(eventsIFCHText);
        setEventsIFCH(eventsIFCH);
    };
    fetchData();
  }, []);

  const [activeTab, setActiveTab] = useState(0);

  const renderTable = () => {
    switch (activeTab) {
      case 0:
        return <Table events={eventsMountain} color="#416855"/>;
      case 1:
        return <Table events={eventsIFCH} color="#1b274f" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab(0)} className={`px-3 py-1 mt-1 rounded-t-3xl bg-mountainview-green text-white ${activeTab === 0 ? '' : 'opacity-80'}`}>MountainView</button>
        <button onClick={() => setActiveTab(1)} className={`px-3 py-1 mt-1 ml-1 rounded-t-3xl bg-ifch-blue text-white ${activeTab === 1 ? '' : 'opacity-70'}`}>IFCH</button>
      </div>
      <div>{renderTable()}</div>
    </div>
  );
};

export default Events;
