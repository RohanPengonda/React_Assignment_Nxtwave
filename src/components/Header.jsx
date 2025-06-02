import React from "react";

const Header = ({ onCreate, message }) => (
  <div className="mb-6">
    <h1 className="text-3xl font-bold text-center mb-6">List Creation</h1>
    <div className="flex justify-center mb-2">
      <button
        onClick={onCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create a new list
      </button>
    </div>
    {message && <p className="text-center text-red-600 mb-2">{message}</p>}
  </div>
);

export default Header;
