import React from 'react'

function TodoList() {
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

            <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" class="btn btn-outline-primary">Todo</button>
            <button type="button" class="btn btn-outline-primary">In-Progress</button>
            <button type="button" class="btn btn-outline-primary">Completed</button>
            </div>

            <div className='todo-list'>
                <div className='todo-list-item'>
                    <h3>Task 1</h3>
                    <h3>Description</h3>
                </div>    
            </div>
        
    </div>

  )
}

export default TodoList