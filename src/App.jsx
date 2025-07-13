import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPages from "./pages/loginPages";
import RegisterPages from "./pages/registerPages";
import { AuthContextProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import ProtectedPages from "./ProtectedPages";
import { ShortUrlContextProvider } from "./context/ShortContext";
import UrlList from "./pages/UrlList";
import { ThemeProvider } from "./components/theme-provider";
import AddShort from "./pages/AddShort";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthContextProvider>
        <ShortUrlContextProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPages />} />
              <Route path="/register" element={<RegisterPages />} />

              <Route element={<ProtectedPages />}>
                <Route path="/dashboard" element={<UrlList />} />
                <Route path="/dashboard/settings" element={<ProfilePage />} />
                <Route path="/dashboard/add-url" element={<AddShort />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ShortUrlContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
