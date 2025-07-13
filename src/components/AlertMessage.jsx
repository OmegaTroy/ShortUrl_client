import PropTypes from "prop-types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const AlertMessage = ({ type = 'info', text = '' }) => {
  if (!text) return null;

  const alertVariants = {
    error: {
      variant: "destructive",
      icon: <AlertCircle className="h-4 w-4" />,
      title: "Error",
    },
    success: {
      variant: "success",
      icon: <CheckCircle2 className="h-4 w-4" />,
      title: "Éxito",
    },
    default: {
      variant: "default",
      icon: null,
      title: "Información",
    },
  };

  const { variant, icon, title } = alertVariants[type] || alertVariants.default;

  return (
    <Alert variant={variant} className="mb-6">
      {icon}
      <AlertTitle className="capitalize">{title}</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
};

AlertMessage.propTypes = {
  type: PropTypes.oneOf(["error", "success", "info"]),
  text: PropTypes.string,
};

export default AlertMessage;
