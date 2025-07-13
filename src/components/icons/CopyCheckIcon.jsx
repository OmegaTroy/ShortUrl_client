import PropTypes from "prop-types";
import { forwardRef } from "react";

const CopyCheckIcon = forwardRef(
  (
    {
      className = "",
      size = 18,
      color = "currentColor",
      bgColor = "none",
      strokeWidth = 2,
      isCopied = false,
      ...props
    },
    ref
  ) => {
    // If copied, show check icon, otherwise show copy icon
    const iconColor = isCopied ? "#10B981" : color;

    return (
      <div className="relative inline-flex items-center justify-center">
        {/* Copy Icon (always present but conditionally visible) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={bgColor}
          stroke={iconColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`flex transition-opacity duration-200 ${
            isCopied ? "opacity-0" : "opacity-100"
          } ${className}`}
          ref={ref}
          {...props}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
          <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
        </svg>

        {/* Checkbox Check Icon (always present but conditionally visible) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute left-0 top-0 transition-opacity duration-200 ${
            isCopied ? "opacity-100" : "opacity-0"
          } ${className}`}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 11l3 3l8 -8" />
          <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
        </svg>
      </div>
    );
  }
);

CopyCheckIcon.displayName = "CopyCheckIcon";

CopyCheckIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  bgColor: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isCopied: PropTypes.bool,
};

export default CopyCheckIcon;
