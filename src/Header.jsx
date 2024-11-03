import React, { useContext } from "react"
import { Context } from "./App"

export default function Header() {
    const { func } = useContext(Context)

    const [time, setTime] = React.useState("")

    setInterval(()=>{
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes =  String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2,'0')
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
                <input type="time" className="task--input time" id="time" required />
                <button className="add--btn" type="submit">+</button>
            </form>
        </nav>
    )
}
