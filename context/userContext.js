// UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  const value = React.useContext(UserContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be wrapped in a <UserProvider />");
    }
  }

  return value;
}

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
