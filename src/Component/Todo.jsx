import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useTodosContext } from "../Context/todosContext";

export default function Todo({ todos }) {
  const todoContext = useTodosContext();
  const [cheackDelete, setCheackDelete] = useState(false);
  const [cheackUpdate, setCheackUpdate] = useState(false);
  const [todosInputUpdate, setTodosInputUpdate] = useState({
    title: todos.title,
    details: todos.details,
  });

  function handleCheckClick(id) {
    const updateTodos = todoContext.todos.map((t) => {
      if (t.id === id) {
        t.isComplete = !t.isComplete;
      }
      return t;
    });
    todoContext.setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  }

  function handleDelete(todos) {
    const todosUbdate = todoContext.todos.filter((t) => {
      return t.id !== todos.id;
    });
    todoContext.setTodos(todosUbdate);
    setCheackDelete(false);
    localStorage.setItem("todos", JSON.stringify(todosUbdate));
  }

  function handleUpdate() {
    const newTodos = todoContext.todos.map((t) => {
      if (t.id == todos.id) {
        return {
          ...t,
          title: todosInputUpdate.title,
          details: todosInputUpdate.details,
        };
      } else {
        return t;
      }
    });
    todoContext.setTodos(newTodos);
    setCheackUpdate(false);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  return (
    <div>
      {/* Delete Form */}
      {cheackDelete ? (
        <div className="relative z-10" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-black/25 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed  inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <svg
                        className="size-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-base  mr-5 mt-3 font-semibold text-gray-900"
                        id="modal-title"
                      >
                        هل انت متأكد من حذف المهمة
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          لا يمكنك التراجع عن الحذف بعد اتمامه
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto cursor-pointer"
                    onClick={() => handleDelete(todos)}
                  >
                    نعم,قم بالحذف
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto  ml-2 cursor-pointer"
                    onClick={() => setCheackDelete(false)}
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {/* Delete Form */}

      {/* Update Form */}
      {cheackUpdate ? (
        <div className="relative z-10" role="dialog" aria-modal="true">
          <div
            className="fixed  inset-0 bg-black/25 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed  inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center mb-3  sm:mt-0 sm:ml-4 sm:text-right">
                      <h3
                        className="text-base    font-semibold text-gray-900"
                        id="modal-title"
                      >
                        تعديل مهمة
                      </h3>
                    </div>
                    <div>
                      <div className="relative">
                        <input
                          onChange={(e) =>
                            setTodosInputUpdate({
                              ...todosInputUpdate,
                              title: e.target.value,
                            })
                          }
                          value={todosInputUpdate.title}
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                          المهمة
                        </label>
                      </div>
                      <div className="relative mt-5">
                        <input
                          onChange={(e) =>
                            setTodosInputUpdate({
                              ...todosInputUpdate,
                              details: e.target.value,
                            })
                          }
                          value={todosInputUpdate.details}
                          id="floating_filled2"
                          type="text"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_filled2"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                          التفاصيل
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={() => handleUpdate()}
                    type="button"
                    className="inline-flex w-full justify-center  py-2 text-sm font-semibold  text-rose-800 hover:bg-white transition-all shadow-xs sm:ml-3 sm:w-auto cursor-pointer"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => setCheackUpdate(false)}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center   px-3 py-2 text-sm font-semibold text-rose-800 hover:bg-white transition-all shadow-xs  sm:mt-0 sm:w-auto  ml-2 cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {/* Update Form */}

      {/* add props  todos  */}
      <div
        style={{ background: "#283593" }}
        className=" card mb-5 p-3 rounded-sm shadow-lg overflow-hidden "
      >
        <div className="grid grid-cols-3 hover:py-5 transition-all duration-300 gap-4 cursor-pointer">
          <div className="col-span-2">
            <h1
              style={{
                fontWeight: "normal",
                textDecorationLine: todos.isComplete ? "line-through" : "none",
              }}
              className=" content-start  text-2xl  text-white  ..."
            >
              {todos.title}
            </h1>
            <h2 className="text-white text-sm font-thin">{todos.details}</h2>
          </div>

          <div className=" tasks flex justify-end items-center  ...">
            <FontAwesomeIcon
              style={{
                backgroundColor: todos.isComplete
                  ? "oklch(0.648 0.2 131.684)"
                  : "white",
                color: todos.isComplete ? "white" : "oklch(0.648 0.2 131.684)",
              }}
              onClick={() => handleCheckClick(todos.id)}
              icon={faCheck}
              className="mx-1 p-2 h-24 w-12 rounded-full    text-xl  border-2 border-lime-500 text-lime-500 "
            />
            <FontAwesomeIcon
              onClick={() => setCheackUpdate(true)}
              icon={faEdit}
              className="mx-1 p-2 h-24 w-12 rounded-full bg-white text-xl border-2 border-sky-400 text-sky-400 "
            />
            <FontAwesomeIcon
              onClick={() => setCheackDelete(true)}
              icon={faTrash}
              className="mx-1 p-2 h-24 w-12 rounded-full bg-white text-xl border-2 border-red-400 text-red-400 "
            />
          </div>
        </div>
      </div>
      {/* add props  todos  */}
    </div>
  );
}
