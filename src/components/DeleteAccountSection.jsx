import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";

const DeleteAccountSection = ({ 
  isLoading = false, 
  onDelete = () => console.warn('onDelete function not provided') 
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
      )
    ) {
      onDelete();
    }
  };

  return (
    <section className="bg-red-50 dark:bg-red-900/20 rounded-lg shadow-sm p-6 border border-red-200 dark:border-red-900/30">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Eliminar Cuenta
          </h3>
          <p className="text-sm text-red-600 dark:text-red-300 mt-1">
            Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten
            cuidado.
          </p>
        </div>
        <Button
          variant="destructive"
          onClick={() => setShowConfirm(true)}
          disabled={isLoading}
        >
          Eliminar Cuenta
        </Button>
      </div>

      {showConfirm && (
        <div className="mt-4 p-4 bg-white dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900/50">
          <p className="text-red-700 dark:text-red-200 mb-4">
            ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se
            puede deshacer.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Eliminando..." : "Sí, eliminar cuenta"}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

DeleteAccountSection.propTypes = {
  isLoading: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default DeleteAccountSection;
