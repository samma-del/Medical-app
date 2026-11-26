
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import { doctors, Doctor } from '../data/doctors';

type FavoritesContextType = {
  favoriteIds: number[];
  favoriteDoctors: Doctor[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext =
  createContext<FavoritesContextType | undefined>(
    undefined
  );

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favoriteIds, setFavoriteIds] =
    useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavoriteIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const isFavorite = (id: number) =>
    favoriteIds.includes(id);

  const favoriteDoctors = doctors.filter(
    (doctor) => favoriteIds.includes(doctor.id)
  );

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        favoriteDoctors,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'FavoritesProvider is not connected'
    );
  }

  return context;
}
