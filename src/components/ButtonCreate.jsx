import { useState } from "react";
import { useShortUrl } from "../context/ShortContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

/**
 * Componente de botón para crear una nueva URL corta
 * @returns {JSX.Element} Componente de creación de URL
 */
const ButtonCreate = () => {
  const { addShortUrl } = useShortUrl();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      url: "",
      shortUrl: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      await addShortUrl(data);
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error al crear la URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Crear URL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear nueva URL corta</DialogTitle>
          <DialogDescription>
            Ingresa la URL que deseas acortar. Opcionalmente, puedes
            personalizar la URL corta.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL original</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://ejemplo.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL personalizada (opcional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ejemplo"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creando..." : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

ButtonCreate.propTypes = {};

export default ButtonCreate;
