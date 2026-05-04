
import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // Backend route matched: /profile
      const res = await api.get("/profile"); 
      setUser(res.data.user); // Backend response mein 'user' key hai
    } catch (err) {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    try {
      if (refreshToken) {
        // Route matched with backend: /logout
        await api.post("/logout", { refresh_token: refreshToken });
      }
    } catch (err) {
      console.error("Logout backend error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, loading, logout }}>
      {/* Loading state handle karna zaroori hai taake protected routes crash na hon */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// import { createContext, useState, useEffect } from "react";
// import api from "../api/axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUser = async () => {
//     try {
//       const res = await api.get("/profile");
//       setUser(res.data.user);
//     } catch (err) {
//       setUser(null);
//       localStorage.removeItem("access_token"); // ✅ fix
//       localStorage.removeItem("refresh_token");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     const refreshToken = localStorage.getItem("refresh_token");
//     try {
//       if (refreshToken) {
//         await api.post("/logout", { refresh_token: refreshToken });
//       }
//     } catch (err) {
//       console.error("Logout backend error:", err);
//     } finally {
//       localStorage.removeItem("access_token"); // ✅ fix
//       localStorage.removeItem("refresh_token");
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("access_token"); // ✅ fix
//     if (token) {
//       fetchUser();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, fetchUser, loading, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
