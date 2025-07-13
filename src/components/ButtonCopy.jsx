import { useState } from "react";
import PropTypes from "prop-types";
import CopyCheckIcon from "./icons/CopyCheckIcon";
import API_URL from "@/config";

export default function ButtonCopy({ url }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Copy URL to clipboard
      await navigator.clipboard.writeText(`${API_URL}/api/${url.shortUrl}`);
      setIsCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Error al copiar la URL:", error);
    }
  };

  return (
    <div onClick={handleCopy} className="flex cursor-pointer">
      <CopyCheckIcon isCopied={isCopied} />
    </div>
  );
}

ButtonCopy.propTypes = {
  url: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    clicks: PropTypes.number,
  }).isRequired,
};
