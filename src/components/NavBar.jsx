import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GithubIcon from "./icons/GithubIcon.jsx";
import UserIcon from "./icons/UserIcon.jsx";
import LogoutIcon from "./icons/LogoutIcon.jsx";
import SettingsIcon from "./icons/SettingsIcon.jsx";
import HomeIcon from "./icons/HomeIcon.jsx";

function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between dark:bg-[#101010] bg-gray-200  p-5 shadow-lg">
      <Link to="/">Acorta tus enlaces</Link>
      <nav className="flex gap-5 items-center font-semibold">
        <GithubIcon />
        <ModeToggle />
        {logout ? (
          <Button onClick={() => navigate("/login")} className="cursor-pointer">
            Iniciar sesión
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/")}
                className="cursor-pointer"
              >
                <HomeIcon />
                Inicio
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/dashboard/settings")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <SettingsIcon />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-2 cursor-pointer hover:text-red-500"
              >
                <LogoutIcon />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
