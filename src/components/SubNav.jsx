import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LinkIcon from "./icons/LinkIcon";
import SettingIcon from "./icons/SettingIcon";

export default function SubNav({ page }) {
  return (
    <header className="h-16">
      <ul className="flex gap-5 w-full h-full dark:bg-[#101010] bg-gray-200 text-[#101010] dark:text-[#f5f5f5] px-5  font-semibold">
        <Link
          to="/dashboard"
          className={`flex items-center px-5 gap-2 border-b transition-colors ${
            page === "dashboard" ? "border-blue-500" : "border-transparent"
          }`}
        >
          <LinkIcon />
          Enlaces
        </Link>
        <Link
          to="/dashboard/settings"
          className={`flex items-center p-5 gap-2 border-b transition-colors ${
            page === "settings" ? "border-blue-500" : " border-transparent"
          }`}
        >
          <SettingIcon />
          Configuración
        </Link>
      </ul>
    </header>
  );
}

SubNav.propTypes = {
  page: PropTypes.oneOf(["dashboard", "settings"]).isRequired,
};
