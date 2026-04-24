export interface UserInterface {
  id: string;
  email: string;
  password: string;
  name: string;
  bi: string;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserContextType = {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
};
