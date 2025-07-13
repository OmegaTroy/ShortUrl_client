import { forwardRef } from "react";
import PropTypes from "prop-types";

/**
 * Home icon component.
 * @param {Object} props - Component properties
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {number|string} [props.size=24] - Icon size in pixels
 * @param {string} [props.color='currentColor'] - Icon stroke color
 * @param {string} [props.bgColor='none'] - Icon background color
 * @param {number|string} [props.strokeWidth=2] - Stroke width
 * @returns {JSX.Element} Home icon component
 */
const HomeIcon = forwardRef(
  (
    {
      className = " cursor-pointer",
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
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={bgColor}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
      </svg>
    );
  }
);

HomeIcon.displayName = "HomeIcon";

HomeIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  bgColor: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HomeIcon;
