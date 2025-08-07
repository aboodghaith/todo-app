import Todo from "./Todo";
import InputAndButton from "./InputAndButton";

import { useTodosContext } from "../Context/todosContext";
import { useMemo, useState } from "react";

export default function TodoList() {
  const todoContext = useTodosContext();
  const [displayTodosType, setDisplayTodosType] = useState("all");

  const compeletedTodos = useMemo(() => {
    return todoContext.todos?.filter((t) => {
      return t.isComplete;
    });
  }, [todoContext.todos]);

  const nonCompeletedTodos = useMemo(() => {
    return todoContext.todos?.filter((t) => {
      return !t.isComplete;
    });
  }, [todoContext.todos]);

  let tChange = todoContext.todos; // because we need check about todos stats >>> all - completed - non-completed
  if (displayTodosType == "complete") {
    tChange = compeletedTodos;
  } else if (displayTodosType == "non-complete") {
    tChange = nonCompeletedTodos;
  } else {
    tChange = todoContext.todos;
  }

  const todosList = tChange?.map((t) => {
    return <Todo key={t.id} todos={t} />;
  });

  let allBackground =
    displayTodosType == "all" ? "oklch(0.892 0.058 10.001)" : "white";
  let compeleteBackground =
    displayTodosType == "complete" ? "oklch(0.892 0.058 10.001)" : "white";
  let nonCompeleteBackground =
    displayTodosType == "non-complete" ? "oklch(0.892 0.058 10.001)" : "white";

  return (
    <div className="container mx-auto max-w-lg">
      <div
        style={{
          maxHeight: "80vh",
          overflowY: "scroll",
          scrollbarColor: "oklch(0.41 0.159 10.272)",
        }}
        className=" card bg-white p-5 rounded-sm shadow-lg overflow-hidden "
      >
        <h1 style={{ fontWeight: "bold" }} className="text-6xl text-center ">
          مهامي
        </h1>
        <hr className="text-neutral-300 text-sm" />
        <div className="mt-10 mb-5 text-center">
          <button
            onClick={() => setDisplayTodosType("all")}
            value="all"
            style={{ fontWeight: "normal", background: allBackground }}
            className="active text-base border cursor-pointer transition hover:ease hover:duration-700   border-zinc-300  text-zinc-700 hover:bg-slate-100   p-2 ..."
          >
            الكل
          </button>

          <button
            onClick={() => setDisplayTodosType("complete")}
            value="complete"
            style={{ fontWeight: "normal", background: compeleteBackground }}
            className="text-base border cursor-pointer transition hover:ease hover:duration-700 border-zinc-300 text-zinc-700 hover:bg-slate-100  p-2 ..."
          >
            منجز
          </button>

          <button
            onClick={() => setDisplayTodosType("non-complete")}
            value="non-complete"
            style={{ fontWeight: "normal", background: nonCompeleteBackground }}
            className="text-base border cursor-pointer transition hover:ease hover:duration-700 border-zinc-300 text-zinc-700 hover:bg-slate-100  p-2 ..."
          >
            غير المنجز
          </button>
        </div>

        {/* todo  */}
        {todosList}
        {/* todo  */}

        {/* Input + Add Button  */}
        <InputAndButton />
        {/* Input + Add Button  */}
      </div>
    </div>
  );
}
