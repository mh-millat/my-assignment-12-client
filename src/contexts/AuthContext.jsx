import { createContext, useEffect, useState, useContext } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

export const useAuth = () => {
  return useContext(AuthContext);
};

const adminEmails = [
  "info.admin@gmail.com",
];

const memberEmails = [
  "info.member@gmail.com",
];

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const email = currentUser.email;

        if (adminEmails.includes(email)) {
          setUserRole("admin");
        } else if (memberEmails.includes(email)) {
          setUserRole("member");
        } else {
          setUserRole("user");
        }

        const token = await currentUser.getIdToken();
        localStorage.setItem("access-token", token);
      } else {
        setUserRole(null);
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
