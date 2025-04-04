
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  joinDate: string;
  avatar?: string;
  full_name?: string;
  email_contact?: string;
  country?: string;
}

export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "María García",
    email: "maria.garcia@example.com",
    role: "admin",
    active: true,
    joinDate: "2023-01-10",
    avatar: "https://i.pravatar.cc/150?img=1",
    full_name: "María Concepción García López",
    email_contact: "maria.personal@example.com",
    country: "Spain"
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    role: "editor",
    active: true,
    joinDate: "2023-02-15",
    avatar: "https://i.pravatar.cc/150?img=8",
    full_name: "Carlos Alberto Rodríguez Méndez",
    country: "Mexico"
  },
  {
    id: "3",
    name: "Ana López",
    email: "ana.lopez@example.com",
    role: "author",
    active: true,
    joinDate: "2023-03-22",
    avatar: "https://i.pravatar.cc/150?img=5",
    email_contact: "ana.writer@example.com",
    country: "Colombia"
  },
  {
    id: "4",
    name: "Javier Martínez",
    email: "javier.martinez@example.com",
    role: "contributor",
    active: false,
    joinDate: "2023-04-05",
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: "5",
    name: "Isabel Fernández",
    email: "isabel.fernandez@example.com",
    role: "subscriber",
    active: true,
    joinDate: "2023-05-12",
    avatar: "https://i.pravatar.cc/150?img=23",
    country: "Argentina"
  },
  {
    id: "6",
    name: "Miguel González",
    email: "miguel.gonzalez@example.com",
    role: "author",
    active: true,
    joinDate: "2023-06-18",
    avatar: "https://i.pravatar.cc/150?img=12",
    full_name: "Miguel Ángel González Pérez"
  },
  {
    id: "7",
    name: "Laura Sánchez",
    email: "laura.sanchez@example.com",
    role: "editor",
    active: true,
    joinDate: "2023-07-24",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: "8",
    name: "David Pérez",
    email: "david.perez@example.com",
    role: "contributor",
    active: false,
    joinDate: "2023-08-30",
    avatar: "https://i.pravatar.cc/150?img=53",
    full_name: "David Alejandro Pérez Ramírez",
    email_contact: "david.work@example.com",
    country: "Chile"
  },
];
