import React, { useState } from "react";
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../api/apiSlice";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const {data:todos,isError,isLoading,isSuccess,error} = useGetTodosQuery();
  
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({userId:4,id:5,title:newTodo,completed:false});
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
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );

  let items;

  if(isLoading){
    items = <p>Loading...</p>
  }
  else if(isSuccess){
    items = JSON.stringify(todos)
  }
  else if(isError){
    items = <p>{error}</p>
  }


  return <section>
        {todoForm}
        {items}
  </section>;
}
