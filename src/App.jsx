import React from "react"
import { v4 as uuidv4 } from "uuid"
import Header from "./Header"
import Task from "./Task"

export const Context = React.createContext()

export default function App() {
    
    const [task, setTask] = React.useState(() => {
        return JSON.parse(localStorage.getItem("storedToDo")) || []
    })

    //generate current date
    const date = new Date()
    const currentDate = date.getDate()
    const currentMonth = date.getMonth() + 1
    const currentYear = date.getFullYear()
    const correctDate = `${currentYear}-${currentMonth}-${currentDate}`

    //function that addtask the task the user set
    function addTask(e) {
        e.preventDefault()
        const newTask = document.getElementById("task--input").value
        const date = document.getElementById("date").value

        if (!newTask || !date) {
            alert("Please enter a task and a due date.")
            return
        }

        const newId = uuidv4()

        setTask((prev) => {
            const updatedTasks = [...prev, { id: newId, task: newTask, date: date, isCompleted: false }]
            localStorage.setItem("storedToDo", JSON.stringify(updatedTasks))
            return updatedTasks
        })

        document.getElementById("task--input").value = ""
        document.getElementById("date").value = ""
    }

    //function that check the currect task click on and once it mark as completed as the is displays completed
    function areYouDone(currentId) {
        setTask(prevTasks => {
            const updatedTasks = prevTasks.map((t) => {
                console.log(t)
                if (t.id === currentId) {
                    return { ...t, isCompleted: true }
                }
                return t
            })
            localStorage.setItem("storedToDo", JSON.stringify(updatedTasks))
            return updatedTasks
        })
    }

    //the parts that check if the current date is equal too the date the user as set
  React.useEffect(() => {
    const dueTasks = task.filter(t => t.date === correctDate);
    const completedTasks = task.filter(t => t.isCompleted === true);
    //this part check if the current date and date the user input is equals to each other and also check if completedtask == 0
    if (dueTasks.length > 0 && completedTasks){
        alert("You have a task that has not been done and is due today");
    }

}, [task, correctDate])

//delete task function
function Delete(currentId){
    setTask(prevTasks => {
        console.log(prevTasks)
        const updatedTasks = prevTasks.filter(t => t.id !== currentId)
        localStorage.setItem("storedToDo", JSON.stringify(updatedTasks))
        return updatedTasks
    })
}

    const listedEl = {
        func: addTask,
        areYouDone: areYouDone,
        deleted:Delete
    }
// localStorage.removeItem("storedToDo")
    return (
        <div className="body">
            <Context.Provider value={listedEl}>
                <Header />
                <Task />
            </Context.Provider>
        </div>
    )
}
