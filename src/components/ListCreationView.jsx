import React from "react";
import ListColumn from "./ListColumn";

const ListCreationView = ({
  lists,
  checkedLists,
  newListItems,
  moveItem,
  onCancel,
  onUpdate,
}) => {
  const selectedListIds = Object.keys(checkedLists).filter(
    (key) => checkedLists[key]
  );
  const firstList = lists.find((l) => l.id === Number(selectedListIds[0]));
  const secondList = lists.find((l) => l.id === Number(selectedListIds[1]));

  return (
    <div>
      <div className="flex gap-4">
        <ListColumn
          title={firstList.title}
          data={firstList.items}
          view="listCreation"
          moveRight={(item) => moveItem(firstList.title, "New List", item)}
        />
        <ListColumn
          title="New List"
          data={newListItems}
          view="listCreation"
          moveLeft={(item) => moveItem("New List", firstList.title, item)}
          moveRight={(item) => moveItem("New List", secondList.title, item)}
        />
        <ListColumn
          title={secondList.title}
          data={secondList.items}
          view="listCreation"
          moveLeft={(item) => moveItem(secondList.title, "New List", item)}
        />
      </div>
      <div className="flex justify-center gap-4 mt-6 mb-10">
        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ListCreationView;
