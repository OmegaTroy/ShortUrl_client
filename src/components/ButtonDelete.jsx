import React from "react";
import PropTypes from "prop-types";
import { useShortUrl } from "../context/ShortContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteIcon from "./icons/DeleteIcon";

/**
 * Componente de botón para eliminar una URL corta
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.url - Objeto con los datos de la URL a eliminar
 * @returns {JSX.Element} Componente de botón de eliminación
 */
const ButtonDelete = ({ url }) => {
  const { deleteShortUrl } = useShortUrl();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!url?._id) return;

    try {
      setIsDeleting(true);
      await deleteShortUrl(url._id);
      // No es necesario hacer nada más, el contexto actualizará la lista
    } catch (error) {
      console.error("Error al eliminar la URL:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DeleteIcon />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de eliminar esta URL?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará la URL corta y todos
            sus datos asociados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

ButtonDelete.propTypes = {
  url: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    url: PropTypes.string,
    shortUrl: PropTypes.string,
  }).isRequired,
};

export default ButtonDelete;
