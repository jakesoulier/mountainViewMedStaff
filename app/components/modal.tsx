import { useState } from 'react';
import { z } from 'zod';
import { EventSchema } from '../validationSchemas'; // Import EventSchema

type EventForm = z.infer<typeof EventSchema>; // Define EventForm type

interface ModalProps {
  show: boolean;
  onClose: () => void;
  event: EventForm | null;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, event }) => {
  const [notification, setNotification] = useState('');

  if (!show || !event) {
    return null;
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(event.email).then(() => {
      setNotification('Email copied to clipboard!');
      setTimeout(() => setNotification(''), 2000); // Clear notification after 2 seconds
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-xl z-50">
      <div className="bg-white p-2 rounded-lg shadow-lg relative z-50">
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-700 border border-white hover:border-red-800">x</button>
        </div>
        <div className='border border-gray-400 rounded-sm m-5 text-left'>
          <h1 className='m-4'>Title: {event.title}</h1>
          <h1 className='m-4 mt-0'>Time: {event.time}</h1>
          <h1 className='m-4 mt-0'>Details: {event.description}</h1>
          <h1 className='m-4 mt-0'>
            Email: 
            <button onClick={handleCopyEmail} className="text-blue-500 underline ml-2">
              {event.email}
            </button>
          </h1>
          <h1 className='m-4 mt-0'>Date: {event.month} {event.day}</h1>
        </div>
        {notification && (
          <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-center py-2">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;