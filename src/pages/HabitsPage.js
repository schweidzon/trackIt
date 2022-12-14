import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import NavBar from "../components/Header"
import AppContext from "../context/AppContext"
import trashCan from "../assets/images/trashCan.png"
import Menu from "../components/Menu"

export default function HabitsPage() {
    const { user, setUser, habits, setHabits } = useContext(AppContext)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        console.log(user)
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
            .then((res) => setHabits(res.data))
            .catch((err) => console.log(err.response.data))

    }, [])

    const DAYS = [
        { name: 's', id: 1 },
        { name: 't', id: 2 },
        { name: 'q', id: 3 },
        { name: 'q', id: 4 },
        { name: 's', id: 5 },
        { name: 's', id: 6 },
        { name: 'd', id: 7 }
    ]



    const [isAddingHabit, setIsAddingHabit] = useState(false)
    const [habitsDays, setHabitsDays] = useState([])
    const [habitName, setHabitName] = useState("")

    function addHabit() {
        setIsAddingHabit(true)
    }

    function selectDays(day) {
        const days = [...habitsDays, day.id]
        setHabitsDays(days)
        console.log(days)

    }



    function registerNewHabit(e) {
        e.preventDefault()
        setIsAddingHabit(false)
        const body = {
            name: habitName,
            days: habitsDays
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
            .then((res) => {
                setHabits([...habits, res.data])
                console.log(habits)
            })
            .catch((err) => console.log(err.response.data))

        setHabitName("")
        setHabitsDays([])
    }

    function deletHabit(habit) {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        if(window.confirm("Deseja apagar o hábito?")) {
            axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`, config)
            .then(() => {
             setHabits(habits.filter((h) => h.id !== habit.id))
            })
        } else {
            return
        }
        
      
    }





    return (
        <>
            <NavBar />
            <HabitsPageStyle>
                <AddHabitStyle>
                    <h1>Meus hábitos</h1>
                    <button onClick={addHabit}>+</button>
                </AddHabitStyle>
                <HabitsInfo status={isAddingHabit} >
                    <form onSubmit={registerNewHabit}>
                        <div>
                            <input value={habitName} onChange={(e) => setHabitName(e.target.value)} type="text" placeholder="nome do hábito" />
                            <Days >
                                {DAYS.map((day) =>
                                    <DaysButtons color={habitsDays.includes(day.id)} onClick={() => selectDays(day)} key={day.id}>{day.name.toUpperCase()}</DaysButtons>
                                )}
                            </Days>
                            <SendInfos>
                                <p>Cancelar</p>
                                <button type="submit">Salvar</button>
                            </SendInfos>
                        </div>
                    </form>

                </HabitsInfo>
                {habits.map((h) =>
                    <RegisteredHabits>
                        <h1>{h.name}</h1>
                        <img onClick={()=>deletHabit(h)} src={trashCan}/>
                        <Days>
                            {DAYS.map((d, i) =>
                                <ChoosedDays color={(h.days).includes(d.id)}>{d.name.toUpperCase()}</ChoosedDays>
                            )}

                        </Days>

                    </RegisteredHabits>
                )}

                {habits.length < 1 &&

                    <NoHabitsText>
                        <p>
                            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                        </p>
                    </NoHabitsText>
                 }

                 <Menu/>
            </HabitsPageStyle>
        </>
    )
}

const NoHabitsText = styled.div`
    width: 338px;
    margin-top: 25px;
        p {
            font-size: 18px;
            color: #666666;
        }

`

const HabitsPageStyle = styled.div`
    padding-top: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #E5E5E5;
    width: 100vw;
    overflow-y: auto;
    padding-bottom: 130px;
    min-height: calc(100vh - 70px);
  
`

const AddHabitStyle = styled.div`
    padding:0 15px 0 15px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;   
    width: 303px;

        h1 {
            font-weight: 400;
            font-size: 22.976px;
            color: #126BA5;
        }
        button {
            width: 40px;
            height: 35px;
            background: #52B6FF;
            border-radius: 4px;
            font-size: 27px;
            color: #FFFFFF;
            text-align: center;
            border-style: none;
        }
`

const HabitsInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 19px;    
    margin-top: 20px;
    background-color: #FFFFFF;
    width: 340px;
    height: 180px;
    border-radius: 5px;
    display: ${props => props.status ? "block" : "none"};
        input {
            width: 303px;
            height: 45px;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            padding: 10px;
                &::placeholder {
                    font-size: 20px;
                    color: #DBDBDB;;
                }
        }

`



const Days = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 10px;
      
`

const DaysButtons = styled.div`
     width: 30px;
    height: 30px;
    background-color: ${props => props.color ? "#CFCFCF" : "#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    color: #DBDBDB;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

`

const ChoosedDays = styled.div`
    width: 30px;
    height: 30px;
    background-color: ${props => props.color ? "#CFCFCF" : "#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    color: #DBDBDB;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;


`


const SendInfos = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  
    margin-top: 15px;
        p {
            width: 69px;
            height: 20px;
            font-size: 16px;
            color: #52B6FF;
            border: none;
            background-color: #FFFFFF;
            margin-right: 23px;
            cursor: pointer;
        }
        button:nth-child(2) {
            width: 84px;
            height: 35px;
            background: #52B6FF;
            border-radius: 5px;
            font-size: 16px;
            color: #FFFFFF;
            border-style: none;
        }
`

const RegisteredHabits = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 19px;    
    margin-top: 20px;
    background-color: #FFFFFF;
    width: 340px;
    border-radius: 5px;
    position: relative;
        h1 {
           font-size:20px ;
           color: #666666
        }
        img {
            position: absolute;
            top: 15px;
            right: 15px;
            cursor: pointer;
        }

`