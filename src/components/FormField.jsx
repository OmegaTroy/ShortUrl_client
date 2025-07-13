import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormField = ({ 
  id, 
  label, 
  type = "text", 
  disabled = false, 
  error = null, 
  register = {} 
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-gray-500 dark:text-[#101010]">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      disabled={disabled}
      className="bg-white dark:bg-gray-100 text-[#101010] dark:text-gray-900"
      {...register}
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  register: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({})
  ]),
};

export default FormField;
