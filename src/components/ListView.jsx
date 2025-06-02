import React from "react";
import ListColumn from "./ListColumn";

const ListView = ({ lists, checkedLists, onCheckboxChange }) => {
  return (
    <>
      {lists.map((list) => (
        <ListColumn
          key={list.id}
          title={list.title}
          data={list.items}
          checked={checkedLists[list.id]}
          onCheckboxChange={() => onCheckboxChange(list.id)}
          view="home"
        />
      ))}
    </>
  );
};

export default ListView;
