'use client';

import React, { useState } from 'react';
import "../assets/ButtonStyles.css";
import { z } from 'zod';
import { EventSchema } from '../validationSchemas';
import { useEvents } from '../eventsFetcher'; // Import the useEvents hook
import Modal from './modal';
import { useDate } from './dateContext';

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
const Table = ({ events }: { events: EventForm[] }) => {
  const { selectedDate } = useDate(); // Use the selected date from the context
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
    .sort((a, b) => {
      const monthIndexA = getMonthIndex(a.month);
      const dayA = parseInt(a.day, 10);
      const monthIndexB = getMonthIndex(b.month);
      const dayB = parseInt(b.day, 10);
      const dateA = new Date(currentDate.getFullYear(), monthIndexA, dayA);
      const dateB = new Date(currentDate.getFullYear(), monthIndexB, dayB);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5); // Get the first five upcoming events

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
    {/* <h1 className="text-2xl font-bold mb-4">Selected Date: {selectedDate.toDateString()}</h1> */}
    <table className='w-full'>
      <tbody>
        {upcomingEvents.map((event, index) => {
          const eventDate = new Date(currentDate.getFullYear(), getMonthIndex(event.month), parseInt(event.day, 10));
          // console.log('Event Date:', eventDate.toDateString()); // Log the event date
          // console.log('Selected Date:', selectedDate.toDateString()); // Log the selected date
          // console.log('Dates are equal:', eventDate.toDateString() === selectedDate.toDateString()); // Log if dates are equal
          const isSelected = eventDate.toDateString() === selectedDate.toDateString();
          const companyClass = event.company === 'ifch' ? 'bg-ifch-blue opacity-50' : 'bg-mountain-color';
          const textShadowStyle = isSelected ? { textShadow: '5px 5px #558abb' } : {};
          const bgColor = event.company === 'mountain' ? 'bg-mountainview-light-green' : event.company === 'ifch' ? 'bg-ifch-light-blue' : 'bg-mountainview-cream';
          const buttonColor = event.company === 'mountain' ? 'bg-mountainview-green' : event.company === 'ifch' ? 'bg-ifch-blue' : 'bg-mountainview-green';
          return (
            <tr key={index} className={`flex flex-col`}>
              <div className={`flex flex-col small:flex-row items-center flex-wrap w-full p-2 ${bgColor} ${isSelected ? 'text-white' : ''}`} style={isSelected ? { textShadow: '1px 1px 20px black' } : {}}>
                <td className='flex flex-col text-center'>
                  <div className="text-5xl font-bold">{event.day}</div>
                  <div>{event.month.toUpperCase()}</div>
                </td>
                <div className='flex flex-col p-2 pl-4 text-center small:text-left'>
                  <div className="text-2xl font-bold">{event.title}</div>
                  <div>{event.time}</div>
                </div>
                  <div className='ml-0 mr-3 small:ml-auto'>
                    <div className="ml-0 small:ml-auto flex flex-col items-center">
                      <h1 className='text-center'>{event.company === 'ifch' ? 'IFCH' : event.company === 'mountain' ? 'Mountain View' : event.company}</h1>
                    </div>
                    <div className="ml-0 small:ml-auto flex flex-col items-end">
                      {event.type === 'details' ? (
                        <button onClick={() => handleOpenModal(event)} className={`button ${buttonColor}`} style={{ textShadow: 'none' }}>
                          Details
                        </button>
                      ) : event.type === 'cme' ? (
                        <a href="/cme#specific-section" className={`button ${buttonColor}`} style={{ textShadow: 'none' }}>
                          Register
                        </a>
                      ) : (
                        <a
                          href={`/form?title=${encodeURIComponent(event.title)}`}
                          className={`button ${buttonColor}`}
                        >
                          Register
                        </a>
                      )}
                    </div>
                </div>
              </div>
              <hr className="border-black bg-white" style={{ width: "100%" }} />
            </tr>
          );
        })}
      </tbody>
    </table>
    <Modal show={showModal} onClose={handleCloseModal} event={currentEvent} />
  </>
  );
};

const EventsSecureComponent: React.FC = () => {
  const { eventsAll } = useEvents(); // Use the useEvents hook to get the events data

  return (
    <div className=''>
      <div className="px-5 py-2 rounded-t-3xl bg-mountainview-green w-1/6 text-2xl text-center text-white">
      Events
      </div>
      <div className="p-5" style={{ backgroundImage: `linear-gradient(to right, #376452 30%, #1b284f 70%)` }}>
        <Table events={eventsAll} />
      </div>
    </div>
  );
};

export default EventsSecureComponent;