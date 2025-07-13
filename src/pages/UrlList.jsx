import { useEffect } from "react";
import { useShortUrl } from "../context/ShortContext";
import SubNav from "../components/SubNav";
import ButtonEdit from "../components/ButtonEdit";
import ButtonDelete from "../components/ButtonDelete";
import ButtonCreate from "../components/ButtonCreate";
import ButtonCopy from "../components/ButtonCopy";
import { Separator } from "../components/ui/separator";
import { API_URL } from "../config";

// Función para formatear la fecha de manera legible
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(dateString).toLocaleDateString("es-ES", options);
};

function UrlList() {
  const MAX_URLS = 15;
  const { getShortUrl, shortUrl, updateClickCount } = useShortUrl();

  useEffect(() => {
    getShortUrl();
  }, []);

  return (
    <div className="flex flex-col gap-5 pb-8">
      <div className="flex justify-between flex-col">
        <SubNav page="dashboard" />
        <div className="flex justify-end items-center gap-4 pt-6 pr-6">
          {shortUrl.length < MAX_URLS ? (
            <>
              <h2 className="text-gray-500 font-semibold bg-gray-200 dark:bg-gray-800 px-4 py-1 rounded-full dark:text-white">
                {shortUrl.length}/{MAX_URLS}
              </h2>
              <ButtonCreate />
            </>
          ) : (
            <>
              <h2 className="text-gray-500 font-semibold bg-gray-200 dark:bg-gray-800 px-4 py-1 rounded-full dark:text-white">
                {MAX_URLS}/{MAX_URLS}
              </h2>
              <span className="text-gray-500 font-semibold bg-red-500 dark:bg-red-300 dark:text-red-500 px-4 py-1 rounded-full">
                Has alcanzado el límite de enlaces
              </span>
            </>
          )}
        </div>
      </div>
      {shortUrl.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-6">
          {shortUrl.map((url) => (
            <div
              key={url._id}
              className="border dark:bg-white bg-[#101010] text-white dark:text-gray-900 hover:shadow-md transition-shadow duration-200 flex flex-col  justify-between rounded-lg p-5 w-full gap-3"
            >
              <div className="flex justify-between items-center w-full">
                <a
                  href={`${API_URL}/api/${url.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block space-x-[1px] overflow-hidden truncate text-lg font-bold transition-opacity duration-75 hover:opacity-80"
                  title={`Redirigir a: ${url.url}`}
                  onClick={() => {
                    // Actualizar el contador de clics antes de la redirección
                    updateClickCount(url._id);
                    // La redirección se manejará automáticamente por el navegador
                  }}
                >
                  <span className="text-lg font-bold opacity-70">/</span>
                  {url.shortUrl}
                </a>

                <div className="flex gap-2 mt-3 sm:mt-0 sm:ml-4">
                  <div className="flex items-center bg-gray-200 rounded-lg px-2 py-1 h-8 dark:bg-gray-800">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {url.clicks}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">clicks</span>
                  </div>
                  <Separator className="h-6 w-px bg-gray-200 dark:bg-gray-800 opacity-70 mx-1" />

                  <div className="flex items-center gap-1 h-8">
                    <ButtonEdit
                      url={url}
                      className="text-gray-500 hover:text-gray-700"
                    />
                    <ButtonDelete
                      url={url}
                      className="text-gray-500 hover:text-red-500"
                    />
                    <ButtonCopy
                      url={url}
                      className="text-gray-500 hover:text-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 whitespace-nowrap overflow-hidden text-ellipsis">
                <a
                  href={url.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium opacity-70 hover:underline break-all"
                >
                  {url.url}
                </a>
              </div>
              <div className="flex justify-end">
                <time
                  dateTime={url.createdAt}
                  className="text-xs text-gray-500 dark:text-gray-900"
                  title={new Date(url.createdAt).toLocaleString()}
                >
                  {formatDate(url.createdAt)}
                </time>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-900">
            No short URLs found. Create your first one!
          </p>
        </div>
      )}
    </div>
  );
}

export default UrlList;
