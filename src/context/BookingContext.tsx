
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import { Doctor } from '../data/doctors';

export type Booking = {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  patientName: string;
  age: string;
  gender: string;
  description: string;
  price: number | null;
  status: 'pending' | 'confirmed' | 'cancelled';
};

type BookingContextType = {
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  booking: Booking | null;
  setBooking: (booking: Booking | null) => void;
};

const BookingContext =
  createContext<BookingContextType | undefined>(
    undefined
  );

export function BookingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedDoctor, setSelectedDoctor] =
    useState<Doctor | null>(null);

  const [booking, setBooking] =
    useState<Booking | null>(null);

  return (
    <BookingContext.Provider
      value={{
        selectedDoctor,
        setSelectedDoctor,
        booking,
        setBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      'BookingProvider is not connected'
    );
  }

  return context;
}
