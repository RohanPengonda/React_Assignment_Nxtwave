import React from "react";
import error_img from "../assets/error.png";

const ErrorPage = () => (
  <div className="flex items-center justify-center bg-white min-h-screen">
    <div className="bg-white p-6 rounded shadow text-center">
      <img
        className="w-150 h-140 border-none mx-auto"
        src={error_img}
        alt="Error"
      />
      <div className="flex items-center justify-center mt-10">
        <button
          onClick={() => window.location.reload()}
          className="py-1 px-4 text-white bg-blue-500 rounded hover:bg-blue-800"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
);

export default ErrorPage;
