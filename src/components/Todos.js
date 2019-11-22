import React from 'react';
import Todo from './Todo'
function Todos({todos, toggleTodo}) {
    return (
        todos.map(todo => {
            return <Todo key = {todo.id}  toggleTodo={toggleTodo} todo ={todo} />
        })
    );
}

export default Todos;
