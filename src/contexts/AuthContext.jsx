import { createContext, useEffect, useState, useContext } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase.config";
import axios from "axios";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Get Firebase ID Token
          const token = await currentUser.getIdToken();
          localStorage.setItem("access-token", token);

          // Fetch role from backend
          const res = await axios.get(
            `https://my-assignment-12-server-kappa.vercel.app/users/role/${currentUser.email}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setUserRole(res.data.role || "user");
        } catch (err) {
          console.error("Failed to fetch user role:", err);
          setUserRole("user");
        }
      } else {
        localStorage.removeItem("access-token");
        setUserRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("access-token");
      setUser(null);
      setUserRole(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
