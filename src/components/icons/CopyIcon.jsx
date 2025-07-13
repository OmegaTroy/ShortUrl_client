import PropTypes from "prop-types";
import { forwardRef } from "react";

const CopyIcon = forwardRef(
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
    // If copied, change the color to green
    const iconColor = isCopied ? "#10B981" : color;
    return (
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
        className={`flex cursor-pointer ${className}`}
        ref={ref}
        {...props}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
        <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
      </svg>
    );
  }
);

CopyIcon.displayName = "CopyIcon";

CopyIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  bgColor: PropTypes.string,
  isCopied: PropTypes.bool,
  strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default CopyIcon;
