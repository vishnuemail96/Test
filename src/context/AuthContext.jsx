// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import * as tokenUtils from "../utils/token";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const refresh = tokenUtils.loadRefresh();
    return { user: null, access: null, refresh };
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
