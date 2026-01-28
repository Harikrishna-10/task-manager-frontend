import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim()) {
      // FIX 1: Create an Object to match Mongoose Schema
      // Schema: { title: String, completed: Boolean }
      const newItem = {
        title: option.trim(),
        completed: false,
      };

      setTodoList([...todoList, newItem]);
      setOption("");
    }
  };

  const handleDeletionOption = (index) => {
    const updatedArr = todoList.filter((_, idx) => idx !== index);
    setTodoList(updatedArr);
  };

  return (
    <div>
      {/* Safety check: ensure todoList is an array */}
      {Array.isArray(todoList) &&
        todoList.map((item, index) => {
          // FIX 2: Handle display of both Objects (new data) and Strings (old data)
          const itemTitle = typeof item === "object" ? item.title : item;

          return (
            <div
              key={index}
              className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
            >
              <p className="text-xs text-black">
                <span className="text-xs text-gray-400 font-semibold mr-2">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </span>
                {itemTitle}
              </p>
              <button
                type="button" // Important: Stop form submission on click
                className="cursor-pointer"
                onClick={() => handleDeletionOption(index)}
              >
                <HiOutlineTrash className="text-lg text-red-500" />
              </button>
            </div>
          );
        })}

      <div className="flex items-center gap-5 mt-4">
        <input
          type="text"
          placeholder="Enter Task"
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md"
        />
        <button
          type="button" // Important: Stop form submission on click
          className="card-btn text-nowrap"
          onClick={handleAddOption}
        >
          <HiMiniPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
