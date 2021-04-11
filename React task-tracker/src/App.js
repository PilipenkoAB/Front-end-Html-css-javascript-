
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import Task from './components/Task'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {

  //toggle add section
  const [showAddTask, setShowAddTask] = useState(false)

  //imitate db
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  },[])

  // Fetch tasks
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

    // Fetch task
    const fetchTask = async(id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
  
      return data
    }

// function add task
const addTask = async (task) => {
  //making random number for id (imitating backend here)
  // const id = Math.floor(Math.random() * 1000) + 1
  // const newTask = {id, ...task}
  // setTasks([...tasks, newTask])

  // send to server new data to add
  const res = await fetch('http://localhost:5000/tasks',{
  method: 'POST',
  headers: 
  {
    'Content-type' :'application/json',
  },
  body: JSON.stringify(task), 
})

 //get answer with data that was accepted
 const data = await res.json()
 //add this data to local storage to show it after
 setTasks([...tasks, data]) 
}

// function delete task
const deleteTask = async ( id ) => {
  //to server request
  await fetch(`http://localhost:5000/tasks/${id}`,
  {method: 'DELETE'
  })

  //local variable
  setTasks(tasks.filter((task)=> task.id !== id))
}

// toggle reminder

const toggleReminder =  async ( id ) => {
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle, 
  reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`,
  {
    method: 'PUT',
    headers: 
    {
      'Content-type' :'application/json',
    },
    body: JSON.stringify(updTask), 
  })

  const data = await res.json()

  setTasks(
    tasks.map((task) =>
     task.id === id ? {...task, reminder: data.reminder} : task
    )
  )
  
}

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd = {showAddTask}/>

      <Route path='/' exact render={(props)=>(
        <>
         {showAddTask && <AddTask onAdd={addTask}/>} 
         {tasks.length > 0 ? <Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/> : 'No tasks to show'}   
        </>
      )}
      />

      <Route path ='/about' component={About}/>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
