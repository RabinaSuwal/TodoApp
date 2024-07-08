import React, { useEffect, useState } from 'react';
import { GrInProgress } from "react-icons/gr";
import { MdCheckCircle, MdDelete, MdEdit } from "react-icons/md";

function TodoList() {
    const [isComplete, setIsComplete] = useState('todo');
    const[allTodos, setAllTodos] = useState([]);
    const[newTitle, setNewTitle] = useState("");
    const[newDescription, setNewDescription] = useState("");
    const [inProgressTodos, setInProgressTodos] = useState([]);
    const[completedTodos, setCompletedTodos] =useState([]);
          
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
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
    }

    const handleDelete = (index, type) =>{
        let updatedList;
        switch (type) {
            case 'todo':
                updatedList = [...allTodos];
                updatedList.splice(index, 1);
                setAllTodos(updatedList);
                localStorage.setItem('todolist', JSON.stringify(updatedList));
                break;
            case 'in-progress':
                updatedList = [...inProgressTodos];
                updatedList.splice(index, 1);
                setInProgressTodos(updatedList);
                localStorage.setItem('inprogresslist', JSON.stringify(updatedList));
                break;
            case 'complete':
                updatedList = [...completedTodos];
                updatedList.splice(index, 1);
                setCompletedTodos(updatedList);
                localStorage.setItem('completedlist', JSON.stringify(updatedList));
                break;
            default:
                break;
        }

    } 

    const handleComplete = (index) =>{
        let now =new Date();
        let dd = now.getDate();
        let mm = now.getMonth()+1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes ();
        let s = now.getSeconds();
        let completedOn = dd + '-' + mm + '-' +yyyy + 'at' + h + ':' + m + ':' + s;

        let filteredItem = {
            ...allTodos[index],
            completedOn:completedOn
        }

        let updatedCompletedArr = [...completedTodos];
        updatedCompletedArr.push(filteredItem);
        setCompletedTodos(updatedCompletedArr);
        localStorage.setItem('completedlist', JSON.stringify(updatedCompletedArr))
        handleDelete(index, 'todo');
    }


    const handleProgress = (index) =>{
        let now = new Date();
        let progressOn = now.toLocaleString();

        let filteredItem = {
            ...allTodos[index],
            progressOn: progressOn
        };

        let updatedInProgressArr = [...inProgressTodos];
        updatedInProgressArr.push(filteredItem);
        setInProgressTodos(updatedInProgressArr);
        localStorage.setItem('inprogresslist', JSON.stringify(updatedInProgressArr));
        handleDelete(index, 'todo');
    }

    useEffect(() => {
        try {
            let savedTodo = JSON.parse(localStorage.getItem('todolist'));
            let savedInProgress = JSON.parse(localStorage.getItem('inprogresslist'));
            let savedCompleted = JSON.parse(localStorage.getItem('completedlist'));
            if (savedTodo) {
                setAllTodos(savedTodo);
            }
            if (savedInProgress) {
                setInProgressTodos(savedInProgress);
            }
            if (savedCompleted) {
                setCompletedTodos(savedCompleted);
            }
        } catch (error) {
            console.error("Error loading todos from localStorage:", error);
        }
    }, []);

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
            {isComplete==='todo' && allTodos.map((item, index)=>{
                return(
                    <div className='todo-list-item' key={index}>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>

                    <div>
                        <MdDelete className='icon' onClick={()=> handleDelete(index, 'todo')} title='Delete?'/>
                        <MdEdit className='edit-icon'/>
                        <MdCheckCircle className='check-icon' title='Complete?' onClick={()=>handleComplete(index)}/>
                        <GrInProgress className='in-progress-icon' title='In-progress' onClick={()=>handleProgress(index)}/>
                    </div> 
                </div>  
                )
            })}     
            </div>


            <div className='todo-list'>
            {isComplete==='complete' && completedTodos.map((item, index)=>{
                return(
                    <div className='todo-list-item' key={index}>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p><small>progress on: {item.progressOn}</small></p>
                    </div>

                    <div>
                        <MdDelete className='icon' onClick={()=> handleDelete(index, 'complete')} title='Delete?'/>
                        {/* <MdCheckCircle className='check-icon' title='Complete?' onClick={()=>handleComplete(index)}/> */}
                    </div> 
                </div>  
                )
            })}     
            </div>


            <div className='todo-list'>
            {isComplete==='in-progress' && inProgressTodos.map((item, index)=>{
                return(
                    <div className='todo-list-item' key={index}>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p><small>Progress on: {item.progressOn}</small></p>
                    </div>

                    <div>
                        <MdDelete className='icon' onClick={()=> handleDelete(index, 'in-progress')} title='Delete?'/>
                        {/* <MdCheckCircle className='check-icon' title='Complete?' onClick={()=>handleComplete(index)}/> */}
                    </div> 
                </div>  
                )
            })}     
            </div>
        
    </div>

  )
}

export default TodoList