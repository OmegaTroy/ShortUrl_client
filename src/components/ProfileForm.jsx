import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import AlertMessage from "./AlertMessage";
import FormField from "./FormField";

const ProfileForm = ({
  isEditing = false,
  isLoading = false,
  errors = {},
  register = () => ({}),
  onSubmit = () => {},
  onCancelEdit = () => {},
  message = { type: 'info', text: '' },
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <AlertMessage type={message.type} text={message.text} />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        id="username"
        label="Nombre de Usuario"
        disabled={!isEditing || isLoading}
        error={errors.username}
        register={register("username", {
          required: "El nombre de usuario es requerido",
          minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres",
          },
        })}
      />

      <FormField
        id="email"
        type="email"
        label="Correo Electrónico"
        disabled={!isEditing || isLoading}
        error={errors.email}
        register={register("email", {
          required: "El correo electrónico es requerido",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Correo electrónico inválido",
          },
        })}
      />
    </div>

    {isEditing && (
      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancelEdit}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    )}
  </form>
);

ProfileForm.propTypes = {
  isEditing: PropTypes.bool,
  isLoading: PropTypes.bool,
  errors: PropTypes.object,
  register: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancelEdit: PropTypes.func,
  message: PropTypes.shape({
    type: PropTypes.oneOf(["error", "success", "info"]),
    text: PropTypes.string,
  }),
};

export default ProfileForm;
