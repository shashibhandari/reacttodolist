import React, {useState,useRef, useEffect} from 'react';
import './App.css';
import Todos from './components/Todos';
import uuidv4 from 'uuid';
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  //const [todos, setTodos] = useState([{id:1,name:'Todo 1', complete:false, id:2,name:'Todo 2',complete:true}])
    const [todos, setTodos] = useState([])
 /* this.state = {
    todos: [
        {
          id: 1,
          title: 'Tell a tale about a tail',
          completed: false
        },
        {
          id: 2,
          title: 'Give Presentation',
          completed: false
        },
        {
          id: 3,
          title: 'Wait for response',
          completed: false
        },
    ]
  }
  console.log(this.state.todos)*/
const todoNameRef = useRef()

    useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
    },[])
    useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
    },[todos])

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos);
    }
 function addTodo(e) {
const name = todoNameRef.current.value
     if(name === '') return
     setTodos(prevTodos =>{
       return [...prevTodos, {id:uuidv4(),name:name,complete:false}]
     })
     todoNameRef.current.value = null;
 }

 function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
     setTodos(newTodos)
 }
  return (
    <>
    <div className="container">
        <h1>To-Do List</h1>
       <Todos todos={todos} toggleTodo={toggleTodo}/>

        <div className='todo'>
            <input className="form-control" ref={todoNameRef} type="text" />
            <button className ="btn-todo" onClick={addTodo}>Add Todo</button>
            <button  className ="btn-todo" onClick={handleClearTodos}>Clear Complete</button>
            <div className="remain-todo"><span class="remain-todo-num">{todos.filter(todo => !todo.complete).length} </span> left to do</div>
        </div>
    </div>
    </>
  );
}

export default App;
