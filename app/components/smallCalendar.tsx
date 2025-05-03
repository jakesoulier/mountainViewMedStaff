'use client';

import React from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDate } from './dateContext';

const SmallCalendar: React.FC = () => {
  const { selectedDate, setSelectedDate } = useDate();

  const onChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  return (
    <div className=''>
      <h1 className='rounded-t-3xl bg-mountainview-green text-white text-center text-xl p-2'>Calendar</h1>
      <div className='p-1 bg-mountainview-green'>
        <Calendar
          onChange={onChange}
          value={selectedDate}
        />
      </div>
    </div>
  );
};

export default SmallCalendar;