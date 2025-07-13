import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className=" ">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-300 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Link2 className="w-4 h-4" />
            <span>Acorta tus enlaces de forma rápida y segura</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Acorta, personaliza y comparte tus enlaces
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Proyecto realizado con el Stack MERN, puedes crear enlaces
            acortados, personalizarlo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="default"
              size="lg"
              className="text-lg px-8 h-12"
            >
              {user ? (
                <Link to="/dashboard">Crear Short</Link>
              ) : (
                <Link to="/login">Iniciar sesión</Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
