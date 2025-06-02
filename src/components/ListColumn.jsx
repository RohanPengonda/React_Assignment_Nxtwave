import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
const ListColumn = ({
  title,
  data,
  checked,
  onCheckboxChange,
  view,
  moveLeft,
  moveRight,
}) => {
  return (
    <div className="bg-blue-100 p-4 w-60 rounded-md shadow-md h-[600px] overflow-y-scroll">
      {view !== "listCreation" ? (
        <div className="flex justify-baseline mb-2">
          <input
            type="checkbox"
            checked={checked || false}
            onChange={onCheckboxChange}
            className=""
          />
          <strong className="px-2">{title}</strong>
          {/* <h2 className="px-2">{title}</h2> */}
        </div>
      ) : (
        <h2 className="font-semibold text-lg mb-2">
          {title} ({data.length})
        </h2>
      )}

      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white p-3 mb-2 rounded-md border flex items-center justify-between"
        >
          {moveLeft && (
            <button onClick={() => moveLeft(item)}>
              <FaArrowLeft size={18} />
            </button>
          )}
          <div className="flex-1 px-2">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-gray-600 italic">{item.description}</p>
          </div>
          {moveRight && (
            <button onClick={() => moveRight(item)}>
              <FaArrowRight size={18} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListColumn;
