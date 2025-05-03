'use client'

import {createContext, useContext, useState, ReactNode} from 'react';

interface DateContextProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

const DateContext = createContext<DateContextProps | undefined>(undefined);

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};