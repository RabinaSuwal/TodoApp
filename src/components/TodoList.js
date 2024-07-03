import React, { useState } from 'react';
import { MdCheckCircle, MdDelete, MdEdit } from "react-icons/md";

function TodoList() {
    const [isComplete, setIsComplete] = useState('todo');
    const[allTodos, setAllTodos] = useState([]);
    const[newTitle, setNewTitle] = useState("");
    const[newDescription, setNewDescription] = useState("");

    const handleClick = () =>{
        let newTodoItems = {
            title:newTitle,
            description:newDescription
        }

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItems);
        setAllTodos(updatedTodoArr);
        setNewTitle("");
        setNewDescription("");
    }

  return (
    
    <div className='todo-wrapper'>
        <div className='todo-input'>

            <div className='todo-input-item'>
                <label >Title:</label>
                <input
                    type="text" 
                    placeholder="Enter title here" 
                    value={newTitle} 
                    onChange={(e)=>setNewTitle(e.target.value)} 
                />
            </div>

            <div className='todo-input-item'>
                <label >Description:</label>
                <input 
                    type="text" 
                    placeholder="Enter description here" 
                    value={newDescription} 
                    onChange={(e)=>setNewDescription(e.target.value)} 
                       
                />
            </div>

            <div className='todo-input-item'>
                <button  className='primarybtn'
                    type='submit'
                    onClick={handleClick}
                >
                    Add
                </button>
            </div>
        </div>

            <div className='btn-area'>
                <button 
                    type="button" 
                    className={`todo-btn ${isComplete==='todo' && 'active'}`} 
                    onClick={()=>setIsComplete('todo')}
                >
                    Todo
                </button>

                <button 
                    type="button" 
                    className={`todo-btn ${isComplete==='in-progress' && 'active'}`} 
                    onClick={()=>setIsComplete('in-progress')}
                >
                    In-progress
                </button>

                <button 
                    type="button" 
                    className={`todo-btn ${isComplete==='complete' && 'active'}`} 
                    onClick={()=>setIsComplete('complete')}
                >
                    Completed
                </button>
            
            </div>

            <div className='todo-list'>
            {allTodos.map((item, index)=>{
                return(
                    <div className='todo-list-item' key={index}>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>

                    <div>
                        <MdDelete className='icon'/>
                        <MdEdit className='edit-icon'/>
                        <MdCheckCircle className='check-icon'/>
                    </div> 
                </div>  
                )

            })}
                 
            </div>
        
    </div>

  )
}

export default TodoList