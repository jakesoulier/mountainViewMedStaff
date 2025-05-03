'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

// Define the shape of the context data
interface EventsContextProps {
  eventsMountain: any[];
  eventsIFCH: any[];
  eventsAll: any[];
}

// Create the context
const EventsContext = createContext<EventsContextProps | undefined>(undefined);

// Create the provider component
export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [eventsMountain, setEventsMountain] = useState<any[]>([]);
  const [eventsIFCH, setEventsIFCH] = useState<any[]>([]);
  const [eventsAll, setEventsAll] = useState<any[]>([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!isFetched) {
      // console.log('Fetching data... brotha');
      const fetchEventsMountain = async () => {
        const eventList: any[] = [];
        const querySnapshot = await getDocs(collection(db, 'eventsMountain'));
        querySnapshot.forEach((doc) => {
          eventList.push(doc.data());
        });
        // console.log('Mountain Events:', eventList);
        setEventsMountain(eventList);
      };

      const fetchEventsIFCH = async () => {
        const eventList: any[] = [];
        const querySnapshot = await getDocs(collection(db, 'eventsIFCH'));
        querySnapshot.forEach((doc) => {
          eventList.push(doc.data());
        });
        setEventsIFCH(eventList);
      };

      const fetchEventsAll = async () => {
        const eventList: any[] = [];
        const querySnapshot = await getDocs(collection(db, 'allEvents'));
        querySnapshot.forEach((doc) => {
          eventList.push(doc.data());
        });
        setEventsAll(eventList);
      };

      fetchEventsMountain();
      fetchEventsIFCH();
      fetchEventsAll();
      setIsFetched(true);
    }
  }, [isFetched]);

  return (
    <EventsContext.Provider value={{ eventsMountain, eventsIFCH, eventsAll }}>
      {children}
    </EventsContext.Provider>
  );
};

// Custom hook to use the events context
export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};

// Components to log the fetched data (for demonstration purposes)
const EventsFetcherMountain: React.FC = () => {
  const { eventsMountain } = useEvents();
  // console.log('EventsMountain:', eventsMountain);
  return null; // This component does not render anything
};

const EventsFetcherIFCH: React.FC = () => {
  const { eventsIFCH } = useEvents();
  // console.log('EventsIFCH:', eventsIFCH);
  return null; // This component does not render anything
};

const EventsFetcherAll: React.FC = () => {
  const { eventsIFCH } = useEvents();
  // console.log('EventsIFCH:', eventsIFCH);
  return null; // This component does not render anything
};

// New constant to extract and log all titles from eventsMountain
export const EventsMountainList: React.FC = () => {
    const { eventsMountain } = useEvents();
    const titles = eventsMountain.map(event => event.title);
    // console.log('Mountain Event Titles:', titles);
    return null; // This component does not render anything
  };

export { EventsFetcherMountain, EventsFetcherIFCH, EventsFetcherAll };