import React, { useState } from 'react';
import { MdCheckCircle, MdDelete, MdEdit } from "react-icons/md";

function TodoList() {
    const [isComplete, setIsComplete] = useState('todo');
  return (
    
    <div className='todo-wrapper'>
        <div className='todo-input'>

            <div className='todo-input-item'>
                <label >Title:</label>
                <input type="text" placeholder="Enter title here"  />
            </div>

            <div className='todo-input-item'>
                <label >Description:</label>
                <input type="text" placeholder="Enter description here"  />
            </div>

            <div className='todo-input-item'>
                <button type='submit' className='primarybtn'>Add</button>
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
                <div className='todo-list-item'>
                    <div>
                        <h3>Task 1</h3>
                        <p>Description</p>
                    </div>

                    <div>
                        <MdDelete className='icon'/>
                        <MdEdit className='edit-icon'/>
                        <MdCheckCircle className='check-icon'/>
                    </div> 
                </div>   
            </div>
        
    </div>

  )
}

export default TodoList