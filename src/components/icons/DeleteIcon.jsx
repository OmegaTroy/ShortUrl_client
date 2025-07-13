import PropTypes from "prop-types";
import { forwardRef } from "react";

/**
 * Componente de ícono de eliminación personalizable
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {number|string} [props.size=18] - Tamaño del ícono en píxeles
 * @param {string} [props.color='currentColor'] - Color del trazo del ícono
 * @param {string} [props.bgColor='none'] - Color de fondo del ícono
 * @param {number|string} [props.strokeWidth=2] - Ancho del trazo
 * @returns {JSX.Element} Componente de ícono de eliminación
 */
const DeleteIcon = forwardRef(({
  className = "",
  size = 18,
  color = "currentColor",
  bgColor = "none",
  strokeWidth = 2,
  ...props
}, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={bgColor}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block cursor-pointer hover:text-red-600 transition-colors ${className}`}
      aria-hidden="true"
      focusable="false"
      role="img"
      ref={ref}
      {...props}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
});

DeleteIcon.displayName = 'DeleteIcon';

DeleteIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  bgColor: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default DeleteIcon;
