import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useShortUrl } from "../context/ShortContext";
import { useNavigate } from "react-router-dom";

function AddShort() {
  const [error, setError] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const navigate = useNavigate();
  const { addShortUrl } = useShortUrl();

  const onSubmit = handleSubmit(async (data) => {
    setError('');
    try {
      await addShortUrl(data);
      reset();
      navigate("/url-list");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while creating the short URL');
      }
    }
  });

  return (
    <form
      className="m-10 flex flex-col items-center justify-center gap-5 bg-gray-700 text-white p-10 rounded-xl w-1/2"
      onSubmit={onSubmit}
    >
      <h2>Add Short Url</h2>
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-md w-full text-center">
          {error}
        </div>
      )}
      <span>{errors.url?.message}</span>
      <label htmlFor="url" className="w-full text-left">URL</label>
      <input
        type="text"
        className="w-full rounded-lg p-3 text-black outline-none"
        {...register("url", { required: "URL is required" })}
      />
      <label htmlFor="shortUrl" className="w-full text-left">Custom Short URL (optional)</label>
      <input
        type="text"
        className="w-full rounded-lg p-3 text-black outline-none"
        {...register("shortUrl")}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-3 w-full transition-colors"
      >
        Create Short URL
      </button>
    </form>
  );
}

export default AddShort;
