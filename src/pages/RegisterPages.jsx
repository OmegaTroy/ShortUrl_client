import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function RegisterPages() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur', // Valida los campos cuando se desenfocan
  });
  const { register: singUp, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (value) => {
    await singUp(value);
    navigate("/");
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Crear una cuenta</CardTitle>
            <CardDescription>
              Ingresa tus datos para crear una cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                type="text"
                placeholder="••••••••"
                {...register("username", {
                  required: {
                    value: true,
                    message: 'El nombre de usuario es requerido'
                  },
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener al menos 3 caracteres'
                  }
                })}
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@correo.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: 'El correo electrónico es requerido'
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Ingresa un correo electrónico válido'
                  }
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password", {
                  required: {
                    value: true,
                    message: 'La contraseña es requerida'
                  },
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                  }
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              Registrarse
            </Button>
            <Button
              variant="link"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Iniciar sesión
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
