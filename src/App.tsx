import React, { useState, useEffect } from "react";
import "./App.css";

interface IAddItem {
  value: string | null;
  done: boolean;
}

function App() {
  const [addText, setAddText] = useState<string>("");
  const [addItem, setAddItem] = useState<IAddItem[]>([]);
  const [remainingTodos, setRemainingTodos] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setAddItem(JSON.parse(localStorage.getItem("todos") || "[]"));
    }
  }, []);

  useEffect(() => {
    let count: number = 0;
    localStorage.setItem("todos", JSON.stringify(addItem));
    if (addItem.length > 0) {
      addItem.forEach((val, i) => {
        if (val.done) {
          count++;
        }
      });
    }
    setRemainingTodos(count);
  }, [addItem]);
  const handleComplete = (val: IAddItem, key: number) => {
    const todoList: IAddItem[] = [...addItem];
    const index: number = todoList.findIndex((_, i) => i === key);
    const newTodo = {
      ...todoList[index],
      done: !todoList[index].done,
    };
    todoList[index] = newTodo;
    setAddItem(todoList);
  };

  const totalTodos: number = addItem && addItem.length;

  return (
    <div className="main-container">
      <div className="add-conatiner">
        <input
          className="add-input"
          value={addText}
          placeholder="Enter your todo here"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAddText(e.target.value)
          }
        />
        <button
          className={`btn add-btn ${!addText ? "btn-disable" : ""}`}
          onClick={() => {
            setAddItem([...addItem, { value: addText, done: false }]);
            setAddText("");
          }}
          type="submit"
          disabled={!addText}
        >
          ADD
        </button>
      </div>
      {totalTodos && (
        <span>
          Total todos remaining: {remainingTodos} out of {totalTodos}
        </span>
      )}
      <ul className="item-container">
        {addItem.map((item: IAddItem, i: number) => {
          return (
            <li
              key={i}
              className={`item ${item.done ? "item-cross" : ""}`}
              onClick={() => handleComplete(item, i)}
            >
              {item.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
