import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer";

const initializer = () => {
    const todosFromStorage = localStorage.getItem('todos');
    return todosFromStorage ? JSON.parse(todosFromStorage) : [];
  };

export const useTodos = () => {
    
  const [todos, dispatch] = useReducer(todoReducer, [], initializer);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
      }, [todos])
      
  
      const handleNewTodo = (todo) => {
        const action = {
          type: '[TODO] Add Todo',
          payload: todo
        }
        dispatch(action)
      }
  
      const handleDeleteTodo = (id) => {
        dispatch({
          type: '[TODO] Remove Todo',
          payload: id
        })
      }    
      
      const handleToggleTodo = (id) => {
        dispatch({
          type: '[TODO] Toggle Todo',
          payload: id
        })
      }

      const pendingTodosCount = () => {
      }

      return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length
    }
    }