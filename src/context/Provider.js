
import { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [concluded, setConcluded] = useState(0)
    const [todayHabits, setTodayHabits] = useState([])




    return (
        <AppContext.Provider value={{ user, setUser, concluded, setConcluded, todayHabits, setTodayHabits }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider