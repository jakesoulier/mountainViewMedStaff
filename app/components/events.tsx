'use client';

import React, { useState } from 'react';
import "../assets/ButtonStyles.css";
import { z } from 'zod';
import { EventSchema } from '../validationSchemas';
import { useEvents } from '../eventsFetcher'; // Import the useEvents hook
import Modal from './modal';

// fields in event form
type EventForm = z.infer<typeof EventSchema>;

// Helper function to convert month name to month index
const getMonthIndex = (monthName: string) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months.indexOf(monthName);
};

// Table component
const Table = ({ events, color }: { events: EventForm[], color: string }) => {

  // Get the current date
  const currentDate = new Date();

  // Filter and sort the events based on their dates
  const upcomingEvents = events
  .filter(event => {
    const monthIndex = getMonthIndex(event.month);
    const day = parseInt(event.day, 10);
    if (monthIndex === -1 || isNaN(day)) {
      return false;
    }
    const eventDate = new Date(currentDate.getFullYear(), monthIndex, day);
    return eventDate >= currentDate;
  })
  .sort((a, b) => { // Sort the events by date to display most recent events first
    const monthIndexA = getMonthIndex(a.month);
    const dayA = parseInt(a.day, 10);
    const monthIndexB = getMonthIndex(b.month);
    const dayB = parseInt(b.day, 10);
    const dateA = new Date(currentDate.getFullYear(), monthIndexA, dayA);
    const dateB = new Date(currentDate.getFullYear(), monthIndexB, dayB);
    return dateB.getTime() - dateA.getTime();
  })
  .slice(0, 4); // Get the first INT() upcoming events


  // modal
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventForm | null>(null);

  const handleOpenModal = (event: EventForm) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEvent(null);
  };

  

  return (
    <>
    <table className="border-4 w-full" style={{ borderColor: color }}>
      <tbody>
        {upcomingEvents.reverse().map((event, index) => (
          <tr key={index} className='flex flex-col pl-5 pt-5 pr-5'>
            <div className="flex flex-col small:flex-row items-center flex-wrap w-full"> {/* Added 'items-center' class */}
              <td className='flex flex-col text-center'>
                <td className="text-5xl font-bold">{event.day}</td>
                <td>{event.month.toUpperCase()}</td>
              </td>
              <div className='flex flex-col p-2 pl-4 text-center small:text-left'>
                <td className=" text-2xl font-bold">{event.title}</td>
                <td className="">{event.time}</td>
              </div>
              <div className="ml-0 small:ml-auto">

                {event.type === 'details' ? (
                    <button onClick={() => handleOpenModal(event)} className="button" style={{ backgroundColor: color, borderColor: color }}>
                      Details
                    </button>
                  ) : event.type === 'cme' ? (
                    <a href="/cme#specific-section" className="button" style={{ backgroundColor: color }}> 
                      Register
                    </a>
                  ) : (
                    <a
                      href={`/form?title=${encodeURIComponent(event.title)}`}
                      className="button"
                      style={{ backgroundColor: color, borderColor: color }}
                    >
                      Register
                    </a>
                  )}
              </div>
            </div>
            <hr className="my-4 border-black mx-auto" style={{ width: "100%" }} />
          </tr>
        ))}
      </tbody>
    </table>
    <Modal show={showModal} onClose={handleCloseModal} event={currentEvent} />
   
  </>
  );
};

const EventsComponent: React.FC = () => {
  const { eventsMountain, eventsIFCH } = useEvents(); // Use the useEvents hook to get the events data
  // console.log('EventsMountain in events:', eventsMountain);
  const [activeTab, setActiveTab] = useState(0);

  const renderTable = () => {
    switch (activeTab) {
      case 0:
        return <Table events={eventsMountain} color="#416855" />;
      case 1:
        return <Table events={eventsIFCH} color="#1b274f" />;
      default:
        return null;
    }
  };

  return (
    <div>
      
      <div>
        <button onClick={() => setActiveTab(0)}  className={`px-3 py-1 mt-1 rounded-t-3xl bg-mountainview-green text-white ${activeTab === 0 ? '' : 'opacity-80'}`}>Mountain Events</button>
        <button onClick={() => setActiveTab(1)} className={`px-3 py-1 mt-1 ml-1 rounded-t-3xl bg-ifch-blue text-white ${activeTab === 1 ? '' : 'opacity-70'}`}>IFCH Events</button>
      </div>
      {renderTable()}
    </div>
  );
};

export default EventsComponent;