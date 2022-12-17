
import { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [habits, setHabits] = useState([])
    const [concluded, setConcluded] = useState(0)
    const [todayHabits, setTodayHabits] = useState([])
    const [count, setCount] = useState([])



    return (
        <AppContext.Provider value={{ user, setUser, habits, setHabits, concluded, setConcluded, todayHabits, setTodayHabits, count, setCount }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider