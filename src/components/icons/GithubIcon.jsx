import { forwardRef } from "react";
import PropTypes from "prop-types";

/**
 * Ícono de GitHub.
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {number|string} [props.size=24] - Tamaño del ícono en píxeles
 * @param {string} [props.color='currentColor'] - Color del trazo del ícono
 * @param {string} [props.bgColor='none'] - Color de fondo del ícono
 * @param {number|string} [props.strokeWidth=2] - Ancho del trazo
 * @returns {JSX.Element} Componente de ícono de GitHub
 */
const GithubIcon = forwardRef(
  (
    {
      className = "",
      size = 18,
      color = "currentColor",
      bgColor = "none",
      strokeWidth = 2,
      ...props
    },
    ref
  ) => {
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
        className={`inline-block cursor-pointer ${className}`}
        aria-hidden="true"
        focusable="false"
        role="img"
        ref={ref}
        {...props}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
      </svg>
    );
  }
);

GithubIcon.displayName = "GithubIcon";

GithubIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  bgColor: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default GithubIcon;
