import React from "react"
import { v4 as uuidv4 } from "uuid"
import Header from "./Header"
import Task from "./Task"

export const Context = React.createContext()

export default function App() {
    
    const [times, setTime] = React.useState("")
    console.log(times)
    React.useEffect( () => {
        const interval = setInterval(()=>{
            const date = new Date();
            const hours = String(date.getHours()).padStart(2, '0')
            const minutes =  String(date.getMinutes()).padStart(2, '0')
            const currentTime = `Current Time: ${hours}:${minutes}`
            setTime(currentTime)
        },1000)

        return () => clearInterval(interval)
    }, [])

    const [task, setTask] = React.useState(() => {
        return JSON.parse(localStorage.getItem("storedToDo")) || []
    })

    //generate current date
    const date = new Date()
    const currentDate = String(date.getDate()).padStart(2, '0')
    const currentMonth =  String(date.getMonth() + 1).padStart(2, '0') //
    const currentYear = date.getFullYear()
    const correctDate = `${currentYear}-${currentMonth}-${currentDate}`

    //function that addtask the task the user set
    function addTask(e) {
        e.preventDefault()
        const newTask = document.getElementById("task--input").value
        const date = document.getElementById("date").value
        const time = document.getElementById("time").value
        console.log(time)

        if (!newTask && !date && !time) {
            alert("Please enter a task and a due date and also the due time.")
            return
        }

        const newId = uuidv4()

        setTask((prev) => {
            const updatedTasks = [...prev, { id: newId, task: newTask, date: date, isCompleted: false, time:time }]
            localStorage.setItem("storedToDo", JSON.stringify(updatedTasks))
            return updatedTasks
        })

        document.getElementById("task--input").value = ""
        document.getElementById("date").value = ""
         document.getElementById("time").value = ""
    }

    //function that marks the current task as completed
    function areYouDone(currentId) {
        setTask(prevTasks => {
            const updatedTasks = prevTasks.map((t) => {
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
    const dueTasks = task.filter(t => t.date === correctDate)
    const dueTime = task.filter(t => t.time >= times)

    const dueAndNotCompleted = dueTasks.filter(t => !t.isCompleted)
    //this part check if the current date and date the user input is equals to each other and also check if completedtask == 0
    if (dueAndNotCompleted.length > 0 && dueTime.length > 0) {
        alert("You have a task that has not been done and is due today")
    }
}, [])

//delete task function
function Delete(currentId){
    setTask(prevTasks => {
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
    return (
        <div className="body">
            <Context.Provider value={listedEl}>
                <Header />
                <Task />
            </Context.Provider>
        </div>
    )
}

// import React from "react"
// import { v4 as uuidv4 } from "uuid"
// import Header from "./Header"
// import Task from "./Task"

// export const Context = React.createContext()

// export default function App() {
    
//     const [times, setTime] = React.useState("")
//     console.log(times)
    
//     React.useEffect(() => {
//         const interval = setInterval(() => {
//             const date = new Date();
//             let hours = date.getHours();
//             const minutes = String(date.getMinutes()).padStart(2, '0');
//             const ampm = hours >= 12 ? 'PM' : 'AM';
//             hours = hours % 12; // Convert to 12-hour format
//             hours = hours ? String(hours).padStart(2, '0') : '12'; // the hour '0' should be '12'
//             const currentTime = `Current Time: ${hours}:${minutes} ${ampm}`;
//             setTime(currentTime);
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [])

//     const [task, setTask] = React.useState(() => {
//         return JSON.parse(localStorage.getItem("storedToDo")) || []
//     })

//     //generate current date
//     const date = new Date()
//     const currentDate = String(date.getDate()).padStart(2, '0')
//     const currentMonth =  String(date.getMonth() + 1).padStart(2, '0') //
//     const currentYear = date.getFullYear()
//     const correctDate = `${currentYear}-${currentMonth}-${currentDate}`

//     //function that addtask the task the user set
//     function addTask(e) {
//         e.preventDefault()
//         const newTask = document.getElementById("task--input").value
//         const date = document.getElementById("date").value
//         const time = document.getElementById("time").value
//         console.log(time)

//         if (!newTask && !date && !time) {
//             alert("Please enter a task and a due date and also the due time.")
//             return
//         }

//         const newId = uuidv4()

//         setTask((prev) => {
//             const updatedTasks = [...prev, { id: newId, task: newTask, date: date, isCompleted: false, time:time }]
//             localStorage.setItem("storedToDo", JSON.stringify(updatedTasks))
//             return updatedTasks
//         })

//         document.getElementById("task--input").value = ""
//         document.getElementById("date").value = ""
//          document.getElementById("time").value = ""
//     }

//     //function that marks the current task as completed
//     function areYouDone(currentId) {
//         setTask(prevTasks => {
//             const updatedTasks = prevTasks.map((t) => {
//                 if (t.id === currentId) {
//                     return { ...t, isCompleted: true }
//                 }
//                 return t
//             })
//             localStorage.setItem("storedToDo", JSON.stringify(updatedTasks))
//             return updatedTasks
//         })
//     }

//     //the parts that check if the current date is equal too the date the user as set
//   React.useEffect(() => {
//     const dueTasks = task.filter(t => t.date === correctDate)
//     const dueTime = task.filter(t => t.time >= times)

//     const dueAndNotCompleted = dueTasks.filter(t => !t.isCompleted)
//     //this part check if the current date and date the user input is equals to each other and also check if completedtask == 0
//     if (dueAndNotCompleted.length > 0 && dueTime.length > 0) {
//         alert("You have a task that has not been done and is due today")
//     }
// }, [])

// //delete task function
// function Delete(currentId){
//     setTask(prevTasks => {
//         const updatedTasks = prevTasks.filter(t => t.id !== currentId)
//         localStorage.setItem("storedToDo", JSON.stringify(updatedTasks))
//         return updatedTasks
//     })
// }

//     const listedEl = {
//         func: addTask,
//         areYouDone: areYouDone,
//         deleted:Delete
//     }
    
//     return (
//         <div className="body">
//             <Context.Provider value={listedEl}>
//                 <Header />
//                 <Task />
//             </Context.Provider>
//         </div>
//     )
// }
