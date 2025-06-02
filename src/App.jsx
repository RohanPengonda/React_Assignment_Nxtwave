import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ListView from "./components/ListView";
import ListCreationView from "./components/ListCreationView";
import { fetchLists } from "./utils/api";
import { AiOutlineLoading } from "react-icons/ai";

import Error from "./pages/Error";

function App() {
  const [lists, setLists] = useState([]);
  const [checkedLists, setCheckedLists] = useState({});
  const [view, setView] = useState("home");
  const [newListItems, setNewListItems] = useState([]);
  const [originalLists, setOriginalLists] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        const allData = await fetchLists();

        if (!allData || allData.length === 0) {
          setError(true);
          setLists([]);
        } else {
          setLists([
            {
              id: 1,
              title: "List 1",
              items: allData.filter((item) => item.list_number === 1),
            },
            {
              id: 2,
              title: "List 2",
              items: allData.filter((item) => item.list_number === 2),
            },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch lists:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleCheckboxChange = (listId) => {
    setCheckedLists((prev) => ({
      ...prev,
      [listId]: !prev[listId],
    }));
  };

  const handleCreateNewList = () => {
    const selectedListIds = Object.keys(checkedLists).filter(
      (key) => checkedLists[key]
    );

    if (selectedListIds.length !== 2) {
      setMessage("You should select exactly 2 lists to create a new list ");
      return;
    }

    setOriginalLists(JSON.parse(JSON.stringify(lists)));
    setView("listCreation");
    setMessage("");
  };

  const moveItem = (from, to, item) => {
    if (from === to) return;
    const updatedLists = lists.map((list) => {
      if (list.title === from) {
        return {
          ...list,
          items: list.items.filter((i) => i.id !== item.id),
        };
      }
      if (list.title === to) {
        return {
          ...list,
          items: [...list.items, item],
        };
      }
      return list;
    });

    if (to === "New List") {
      setNewListItems((prev) => [...prev, item]);
    } else if (from === "New List") {
      setNewListItems((prev) => prev.filter((i) => i.id !== item.id));
    }

    setLists(updatedLists);
  };

  const handleCancel = () => {
    setLists(originalLists);
    setNewListItems([]);
    setView("home");
    setCheckedLists({});
  };

  const handleUpdate = () => {
    const newId = lists.length + 1;
    const newList = {
      id: newId,
      title: `List ${newId}`,
      items: newListItems,
    };
    setLists([...lists, newList]);
    setNewListItems([]);
    setCheckedLists({});
    setView("home");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <AiOutlineLoading className="text-4xl text-blue-600" />
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white p-2">
        {view === "home" && (
          <Header onCreate={handleCreateNewList} message={message} />
        )}
      </div>

      <div className="flex gap-4 px-6">
        {view === "home" ? (
          <ListView
            lists={lists}
            checkedLists={checkedLists}
            onCheckboxChange={handleCheckboxChange}
          />
        ) : (
          <ListCreationView
            lists={lists}
            checkedLists={checkedLists}
            newListItems={newListItems}
            moveItem={moveItem}
            onCancel={handleCancel}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default App;
