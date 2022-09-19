import React, { ReactNode } from "react";
import { UserContextType, Tokens } from "../@types/user";

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<Tokens>({
    access_token: "",
    refresh_token: "",
  });

  const setAdmin = (admin: React.SetStateAction<Tokens>) => {
    setUser(admin);
  };
  return (
    <UserContext.Provider value={{ user, setAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
