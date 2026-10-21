/// <reference types="vite/client" />

type User = {
  id: string;
  name: string;
  role: string;
};

interface Window {
  api: {
    getUser: (userId: string) => Promise<User>;
    getUsers: () => Promise<User[]>;
  };
}
