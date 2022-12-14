import { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [habits, setHabits] = useState([])

    return(
        <AppContext.Provider value = {{user,setUser, habits, setHabits}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider