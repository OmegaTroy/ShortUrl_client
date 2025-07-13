import { forwardRef } from "react";
import PropTypes from "prop-types";

/**
 * Ícono de Usuario.
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {number|string} [props.size=24] - Tamaño del ícono en píxeles
 * @param {string} [props.color='currentColor'] - Color del trazo del ícono
 * @param {string} [props.bgColor='none'] - Color de fondo del ícono
 * @param {number|string} [props.strokeWidth=2] - Ancho del trazo
 * @returns {JSX.Element} Componente de ícono de Usuario
 */
const UserIcon = forwardRef(
  (
    {
      className = "",
      size = 24,
      color = "currentColor",
      bgColor = "none",
      strokeWidth = 2,
      ...props
    },
    ref
  ) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={bgColor}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`icon icon-tabler icons-tabler-outline icon-tabler-user ${className}`}
        {...props}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 7a4 4 0 1 0 8 0 4 4 0 0 0 -8 0" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </svg>
    );
  }
);

UserIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  bgColor: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

UserIcon.displayName = "UserIcon";

export default UserIcon;
