import { forwardRef } from "react";
import PropTypes from "prop-types";

/**
 * Ícono de Cerrar Sesión.
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {number|string} [props.size=24] - Tamaño del ícono en píxeles
 * @param {string} [props.color='currentColor'] - Color del trazo del ícono
 * @param {string} [props.bgColor='none'] - Color de fondo del ícono
 * @param {number|string} [props.strokeWidth=2] - Ancho del trazo
 * @returns {JSX.Element} Componente de ícono de Cerrar Sesión
 */
const LogoutIcon = forwardRef(
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
        className={`icon icon-tabler icons-tabler-outline icon-tabler-logout ${className}`}
        {...props}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
        <path d="M9 12h12l-3 -3" />
        <path d="M18 15l3 -3" />
      </svg>
    );
  }
);

LogoutIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  bgColor: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

LogoutIcon.displayName = "LogoutIcon";

export default LogoutIcon;
