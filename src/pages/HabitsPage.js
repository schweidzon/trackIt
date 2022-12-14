import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import NavBar from "../components/NavBar"

export default function HabitsPage({token}) {

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        .then((res) => console.log(res.data))
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
        const days = [...habitsDays, day]
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
                Authorization: `Bearer ${token}`
            }
        }
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response.data))
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
                            <input  value ={habitName} onChange={(e) => setHabitName(e.target.value)} type="text" placeholder="nome do hábito" />
                            <Days >
                                {DAYS.map((day) =>
                                    <DaysButtons color={habitsDays.includes(day.id)}  onClick={() => selectDays(day.id)} key={day.id}>{day.name.toUpperCase()}</DaysButtons>
                                )}
                            </Days>
                            <SendInfos>
                                <p>Cancelar</p>
                                <button type="submit">Salvar</button>
                            </SendInfos>
                        </div>
                    </form>
                   
                </HabitsInfo>
                <NoHabitsText>
                        <p>
                            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                        </p>
                    </NoHabitsText>

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
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    margin-top: 20px;
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


const SendInfos = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
        p {
            width: 69px;
            height: 20px;
            font-size: 16px;
            color: #52B6FF;
            border: none;
            background-color: #FFFFFF;
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