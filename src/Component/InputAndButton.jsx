import React, { useEffect, useState } from "react";
import { useTodosContext } from "../Context/todosContext";
import { v4 as uuidv4 } from "uuid";

export default function InputAndButton() {
  const { todos, setTodos } = useTodosContext();
  const [input, setInput] = useState("");
  const safeTodos = Array.isArray(todos) ? todos : [];

  function handleClick() {
    let newTodos = {
      id: uuidv4(),
      title: input,
      details: "",
      isComplete: false,
    };

    const updateTodos = [...safeTodos, newTodos];
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    setInput("");
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos);
  }, [setTodos]);
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <input
          value={input}
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="عنوان المهمة"
          className="task-input w-full rounded-md placeholder:text-black placeholder:text-end bg-white px-3 py-2 text-black outline-1 -outline-offset-1 outline-zinc-400  focus:outline-2 focus:-outline-offset-2 focus:outline-rose-900   focus:placeholder:text-start  col-span-2 "
        ></input>
        <button
          disabled={input.length == 0}
          onClick={() => handleClick()}
          className="inline-flex items-center justify-center rounded-md bg-rose-900 px-2 py-1 text-sm cursor-pointer hover:bg-rose-800 transition-all font-medium text-white ring-1 ring-red-600/10 ring-inset"
        >
          أضافة
        </button>
      </div>
    </>
  );
}
