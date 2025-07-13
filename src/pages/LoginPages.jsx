import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function LoginPages() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Login data:", data);
      await signIn(data);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] gap-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tu correo electrónico para iniciar sesión
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="••••••••@correo.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El correo electrónico es requerido",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Ingresa un correo electrónico válido",
                  },
                })}
              />
              {errors.email?.message && (
                <Badge variant="destructive">{errors.email?.message}</Badge>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              {errors.password?.message && (
                <Badge variant="destructive">{errors.password?.message}</Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
            <Button
              variant="link"
              className="w-full"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
