import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import react-toastify
import CrossIcon from "./Icons/CrossIcon";
import { API_BASE_URL } from "../constants/api";

const Modal = ({ open, onClose }) => {
  const token = JSON.parse(localStorage.getItem("auth")) || "";
  const [itemName, setitemName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to track errors
  const [selectedLanguage, setSelectedLanguage] = useState("");
  // Define an array of language options
  const languageOptions = [
    { value: "eng", label: "English" },
    { value: "ara", label: "Arabic" },
    // Add more language options here
  ];
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", itemName);
      formData.append("language", selectedLanguage); 
      formData.append("pdf", pdfFile);

      await axios.post(`${API_BASE_URL}/api/v1/addItem`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      onClose();
      event.target.reset();
    } catch (error) {
      setError("An error occurred. Please try again later."); // Set error message
      toast.error("An error occurred. Please try again later."); // Display toast notification
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 dark:bg-slate-800 dark:bg-opacity-50">
      <div onClick={onClose} className="absolute inset-0 cursor-pointer"></div>
      <div className="modalContainer bg-white dark:bg-slate-800 p-4 rounded-lg z-50 relative max-w-md w-full">
        <div className="absolute top-4 right-4">
          <div
            className={`w-9 h-9 rounded-full flex justify-center items-center bg-white dark:bg-slate-800 cursor-pointer ${
              open
                ? "text-blue-500 dark:text-blue-500"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={onClose}
          >
            <CrossIcon width={18} height={18} />
          </div>
        </div>
        <div className="content mt-4 ">
          {loading ? (
            <div className="flex justify-center">
              <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                <div
                  role="status"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            <form
              className="flex flex-col"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <input
                required
                placeholder="Name"
                value={itemName}
                onChange={(e) => setitemName(e.target.value)}
                className={`inputField text-black dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500`}
                type="text"
              />
              <input
                required
                onChange={handleFileChange}
                className={`inputField text-black dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500`}
                type="file"
                name="pdf"
              />
                {/* Language dropdown list */}
                <select
                  required
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className={`inputField text-black dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500`}
                >
                  {/* Populate the options dynamically */}
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

              {pdfFile && <span>{pdfFile.name}</span>}
              <button
                className={`submitButton bg-blue-500 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  open
                    ? "hover:bg-blue-600"
                    : "hover:bg-blue-400 dark:hover:bg-blue-600"
                }`}
                type="submit"
              >
                Add
              </button>

              {error && (
                <div className="text-red-600 mt-2">{error}</div> // Display error message
              )}
            </form>
          )}
        </div>
        <div className="btnContainer flex justify-center mt-4">
          {/* Buttons here */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
