import { createContext, useContext, useState } from "react";
  const TodosContext = createContext([]); 

export default  function TodosProvider({children}){ 
   const  [todos , setTodos] = useState([]); 
  
  return ( 
    <TodosContext.Provider  value={{ todos ,  setTodos}}>
      {children}
    </TodosContext.Provider>
  )
};

export const useTodosContext = () => { 
  return useContext(TodosContext);
};