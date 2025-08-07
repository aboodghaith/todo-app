import TodoList from './Component/TodoList';
import "./App.css"
import TodosProvider from './Context/todosContext';


function App() {

   


  return (

      <div className='App'>
     
     <TodosProvider>
      <TodoList/>
     </TodosProvider>

        
        
      
      
    </div>
   

  
  )
}

export default App
