import React, { useContext } from "react"
import { Context } from "./App"

export default function Header() {
    const { func } = useContext(Context)

    const [time, setTime] = React.useState("")

    setInterval(()=>{
        const date = new Date();
        const hours = date.getHours(); // 0-23
        const minutes = date.getMinutes(); // 0-59
        const seconds = date.getSeconds(); // 0-59
        const currentTime = `Current Time: ${hours}:${minutes}:${seconds}`
        setTime(currentTime)
    },1000)
    

    return (
        <nav className="nav--list">
            <h3>To-Do List</h3>
            <p>{time}</p>
            <form onSubmit={func}>
                <input type="text" placeholder="To-Do List" id="task--input" required />
                <input type="date" className="task--input" id="date" required/>
                <button className="add--btn" type="submit">+</button>
            </form>
        </nav>
    )
}
