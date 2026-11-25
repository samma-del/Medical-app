
export type Doctor = {
  id: number;
  name: string;
  specialty: string;
  gender: 'female' | 'male';
  experience: number;
  rating: number | null;
  reviews: number;
  clinic: string;
  address: string;
  city: string;
  price: number | null;
  image: string | null;
};

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Сарсенова Майя Магауияевна',
    specialty: 'Дерматолог, трихолог',
    gender: 'female',
    experience: 34,
    rating: 5.0,
    reviews: 30,
    clinic: 'ALLERGO clinic',
    address: 'ул. Навои, 208',
    city: 'Алматы',
    price: 15000,
    image: null,
  },
  {
    id: 2,
    name: 'Бектурсынов Ержан Бейбитович',
    specialty: 'Дерматолог',
    gender: 'male',
    experience: 17,
    rating: 5.0,
    reviews: 22,
    clinic: 'ALLERGO clinic',
    address: 'ул. Навои, 208',
    city: 'Алматы',
    price: 15000,
    image: null,
  },
  {
    id: 3,
    name: 'Амиров Рустем-Бек Болатбекович',
    specialty: 'Дерматолог',
    gender: 'male',
    experience: 13,
    rating: 4.7,
    reviews: 11,
    clinic: 'HealthCity',
    address: 'ул. Мусабаева, 8',
    city: 'Алматы',
    price: null,
    image: null,
  },
  {
    id: 4,
    name: 'Бекмырза Ұлдана Әділханқызы',
    specialty: 'Дерматолог',
    gender: 'female',
    experience: 6,
    rating: 5.0,
    reviews: 10,
    clinic: 'ALLERGO clinic',
    address: 'ул. Навои, 208',
    city: 'Алматы',
    price: 13000,
    image: null,
  },
  {
    id: 5,
    name: 'Касенова Ольга Вадимовна',
    specialty: 'Дерматолог, трихолог',
    gender: 'female',
    experience: 39,
    rating: 5.0,
    reviews: 8,
    clinic: 'Асар Медикус',
    address: 'ул. Брусиловского, 163',
    city: 'Алматы',
    price: 12000,
    image: null,
  },
  {
    id: 6,
    name: 'Сатвалдинова Марал Давлетовна',
    specialty: 'Дерматокосметолог',
    gender: 'female',
    experience: 22,
    rating: 5.0,
    reviews: 5,
    clinic: 'On Clinic',
    address: 'ул. Абдуллиных, 30',
    city: 'Алматы',
    price: 13000,
    image: null,
  },
  {
    id: 7,
    name: 'Сарсебаева Альфия Маратовна',
    specialty: 'Дерматолог, трихолог',
    gender: 'female',
    experience: 14,
    rating: 5.0,
    reviews: 5,
    clinic: 'Anagen Trichology Clinic',
    address: 'мкр. Самал-2, 78',
    city: 'Алматы',
    price: 20000,
    image: null,
  },
  {
    id: 8,
    name: 'Пивоварова Татьяна Олеговна',
    specialty: 'Дерматолог',
    gender: 'female',
    experience: 15,
    rating: 5.0,
    reviews: 1,
    clinic: 'KAZMED',
    address: 'мкр. Аксай-5, 12а',
    city: 'Алматы',
    price: 15750,
    image: null,
  },
  {
    id: 9,
    name: 'Тлейбергенова Мадина Сабитовна',
    specialty: 'Дерматолог',
    gender: 'female',
    experience: 13,
    rating: null,
    reviews: 0,
    clinic: 'OHKZ',
    address: 'ул. Яссауи, 13',
    city: 'Алматы',
    price: 15000,
    image: null,
  },
  {
    id: 10,
    name: 'Строганов Эмиль Яковлевич',
    specialty: 'Дерматолог',
    gender: 'male',
    experience: 27,
    rating: null,
    reviews: 0,
    clinic: 'Клиника Век',
    address: 'ул. Кашгарская, 69/102',
    city: 'Алматы',
    price: null,
    image: null,
  },
];

export const getDoctorById = (id: number) => {
  return doctors.find((doctor) => doctor.id === id);
};

export const searchDoctors = (query: string) => {
  const search = query.toLowerCase().trim();

  return doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search) ||
    doctor.specialty.toLowerCase().includes(search) ||
    doctor.clinic.toLowerCase().includes(search) ||
    doctor.city.toLowerCase().includes(search)
  );
};

export default doctors;
