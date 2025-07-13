/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import {
  addShortUrlRequest,
  getShortUrlRequest,
  updateShortUrlRequest,
  deleteShortUrlRequest,
} from "../api/short";

const ShortUrlContext = createContext();

export const useShortUrl = () => {
  const context = useContext(ShortUrlContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksContextProvider");
  }
  return context;
};

export const ShortUrlContextProvider = ({ children }) => {
  const [shortUrl, setShortUrl] = useState([]);

  const getShortUrl = async () => {
    try {
      const response = await getShortUrlRequest();

      // Handle different response structures
      let urls = [];
      if (Array.isArray(response.data)) {
        urls = response.data;
      } else if (response.data && Array.isArray(response.data.urls)) {
        urls = response.data.urls;
      } else if (response.data && Array.isArray(response.data.shortUrls)) {
        urls = response.data.shortUrls;
      } else if (response.data) {
        // Handle case where response has data but not in expected array format
        console.log("Unexpected response format:", response.data);
      }

      setShortUrl(urls || []);
    } catch (error) {
      console.error("Error fetching URLs:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });

      // Handle 404 specifically (no URLs found for user)
      if (error.response?.status === 404) {
        setShortUrl([]); // Set empty array if no URLs found
        return;
      }

      // For other errors, you might want to show an error message to the user
      console.error("Error fetching URLs:", error);
    }
  };

  const addShortUrl = async (newShortUrl) => {
    const response = await addShortUrlRequest(newShortUrl);
    setShortUrl((prevUrls) => [...prevUrls, response.data]);
    return response;
  };

  const updateShortUrl = async (id, data) => {
    try {
      const response = await updateShortUrlRequest(id, data);
      // Actualizar la lista de URLs después de actualizar
      await getShortUrl();
      return response.data;
    } catch (err) {
      console.error("Error actualizando:", err.response?.data || err.message);
      throw err; // Propagar el error para manejarlo en el componente
    }
  };

  const deleteShortUrl = async (id) => {
    try {
      await deleteShortUrlRequest(id);
      await getShortUrl(); // Trae la lista actualizada desde el backend
    } catch (error) {
      console.error(error);
    }
  };

  // Función para actualizar el contador de clics
  const updateClickCount = (shortUrlId) => {
    setShortUrl(prevUrls => 
      prevUrls.map(url => 
        url._id === shortUrlId 
          ? { ...url, clicks: (url.clicks || 0) + 1 } 
          : url
      )
    );
  };

  return (
    <ShortUrlContext.Provider
      value={{
        shortUrl,
        setShortUrl,
        getShortUrl,
        addShortUrl,
        updateShortUrl,
        deleteShortUrl,
        updateClickCount,
      }}
    >
      {children}
    </ShortUrlContext.Provider>
  );
};
