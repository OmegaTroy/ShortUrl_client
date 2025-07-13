/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import React from "react";
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
import { useShortUrl } from "../context/ShortContext";
import { useForm } from "react-hook-form";
import SettingIcon from "./icons/SettingIcon";

export function ButtonEdit({ url }) {
  const { updateShortUrl } = useShortUrl();
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm({
    defaultValues: {
      url: url.url,
      shortUrl: url.shortUrl,
    },
  });

  const { isSubmitting } = form.formState;

  const handleSave = async (data) => {
    try {
      console.log("Enviando datos:", { id: url._id, data });
      const update = await updateShortUrl(url._id, data);
      console.log("URL actualizada:", update);
      setIsOpen(false);
    } catch (error) {
      console.error("Error al actualizar la URL:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SettingIcon />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar URL corta</DialogTitle>
          <DialogDescription>
            Modifica la URL original o personaliza la URL corta según necesites.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ButtonEdit;
