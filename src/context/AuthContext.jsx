/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import {
  logoutRequest,
  loginRequest,
  registerRequest,
  tokenVerify,
} from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // registro de usuario
  const register = async (userData) => {
    try {
      const response = await registerRequest(userData);
      setUser(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      if (error.response) {
        if (Array.isArray(error.response.data)) {
          setErrors(error.response.data);
        } else if (error.response.data?.message) {
          setErrors([error.response.data.message]);
        } else {
          setErrors(['An error occurred during registration']);
        }
      } else {
        setErrors(['Network error. Please try again.']);
      }
      throw error;
    }
  };

  // login de usuario
  const signIn = async (userData) => {
    try {
      const response = await loginRequest(userData);
      setUser(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      if (error.response) {
        if (Array.isArray(error.response.data)) {
          setErrors(error.response.data);
        } else if (error.response.data?.message) {
          setErrors([error.response.data.message]);
        } else {
          setErrors(['An error occurred during login']);
        }
      } else {
        setErrors(['Network error. Please try again.']);
      }
      throw error;
    }
  };

  // cerrar sesión local
  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  // cerrar sesión con petición al servidor
  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Siempre limpiar el estado local
      signOut();
    }
  };

  // obtención de errores
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // verificando si el usuario está autenticado o no
  useEffect(() => {
    const verityToken = async () => {
      const cookie = Cookies.get();
      if (!cookie.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const response = await tokenVerify(cookie.token);
        if (!response.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setErrors([error.response.data.message]);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };
    verityToken();
  }, []);



  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        signOut,
        logout,
        register,
        loading,
        isAuthenticated,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
