import { useMemo, useState } from "react";
import { login, logout } from "../services/authService";
import { hasAccessToken } from "../services/tokenStorage";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAccessToken());

  const value = useMemo(
    () => ({
      isAuthenticated,
      async signIn(username, password) {
        await login(username, password);
        setIsAuthenticated(true);
      },
      async signOut() {
        await logout();
        setIsAuthenticated(false);
      },
    }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
