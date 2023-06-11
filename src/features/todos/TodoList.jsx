import React, { useState } from "react";
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../api/apiSlice";
import {FaTrashAlt,FaAd} from 'react-icons/fa';
export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const {data:todos,isError,isLoading,isSuccess,error} = useGetTodosQuery();
  
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({userId:6,id:6,title:newTodo,completed:false});
    setNewTodo("");
  };
  const todoForm = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newTodo">Enter New Todo</label>
      <div className="newTodo">
        <input
          type="text"
          id="newTodo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      <button type="submit"><FaAd/></button>
      </div>
    </form>
  );

  let items;

  if(isLoading){
    items = <p>Loading...</p>
  }
  else if(isSuccess){
    // items = JSON.stringify(todos)
    items = todos.map(todo=>{
        return <article key={todo.id}>
            <div className="todo">
                <input type="checkbox"
                checked={todo?.completed}
                id={todo.id}
                onChange={()=>updateTodo({...todo,completed:!todo.completed})}
                />
                <label htmlFor="todoTitle">{todo.title}</label>
                <button onClick={()=>deleteTodo(todo.id)}>{<FaTrashAlt/>}</button>
            </div>
        </article>
    })
  }
  else if(isError){
    items = <p>{error}</p>
  }


  return <section>
        {todoForm}
        {items}
  </section>;
}
