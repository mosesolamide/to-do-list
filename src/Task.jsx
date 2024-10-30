import React, { useContext } from "react"
import { IoCheckmarkDoneCircle } from "react-icons/io5"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { Context } from "./App"

export default function Task() {
    const { areYouDone, deleted } = useContext(Context)
    const storedTask = JSON.parse(localStorage.getItem("storedToDo") || "[]")

    return (
        <div>
            {storedTask.length > 0 ? (
                <div>
                    <ol>
                        {storedTask.map((task, index) => {
                            return task && task.task ? (
                                <div key={index} className="task--items">
                                    <li className="bold">{task.task}</li>
                                    <div className="task--things">
                                        <p>Due Date: {task.date}</p>
                                        <button 
                                            className="task--done" 
                                            onClick={() => areYouDone(task.id)} 
                                            disabled={task.isCompleted} // Disable button if task is completed
                                        >
                                            <IoCheckmarkDoneCircle />
                                        </button>
                                        <button className="task--delete" onClick={() => deleted(task.id)}>
                                            <RiDeleteBin5Fill />
                                        </button>
                                        <p className={`${task.isCompleted ? "task--done" : ""}`}>
                                            {task.isCompleted ? (
                                                <>
                                                    <IoCheckmarkDoneCircle /> Completed
                                                </>
                                            ) : "Not Completed"}
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        })}
                    </ol>
                </div>
            ) : (
                <p id="none">Create a task</p>
            )}
        </div>
    )
}
