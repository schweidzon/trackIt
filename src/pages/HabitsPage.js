import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import Header from "../components/Header"
import AppContext from "../context/AppContext"
import trashCan from "../assets/images/trashCan.png"
import Menu from "../components/Menu"
import { ThreeDots } from "react-loader-spinner"

export default function HabitsPage() {
    const { user, habits, setHabits, todayHabits, setConcluded } = useContext(AppContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
            .then((res) => setHabits(res.data))
            .catch((err) => console.log(err.response.data))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setConcluded])

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
        if (habitsDays.includes(day.id)) {
            setHabitsDays(habitsDays.filter((h) => h !== day.id))
            return
        }
        const days = [...habitsDays, day.id]
        setHabitsDays(days)
    }

    function registerNewHabit(e) {
        e.preventDefault()
        if (habitsDays.length < 1) {
            alert("Escolhe pelo menos um dia da semana")
            return
        }

        setLoading(true)

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
                setIsAddingHabit(false)
                setLoading(false)
                setHabitName("")
                setHabitsDays([])

            })
            .catch((err) => {
                alert(err.response.data.message)
                setIsAddingHabit(false)
                setLoading(false)
                setHabitName("")
                setHabitsDays([])

            })


    }

    function deletHabit(habit) {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        if (window.confirm("Deseja apagar o hábito?")) {
            axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`, config)
                .then(() => {
                    setHabits(habits.filter((h) => h.id !== habit.id))
                })
        } else {
            return
        }


    }

    function cancel() {
        setIsAddingHabit(false)
    }

    return (
        <>
            <Header data-test="header" />
            <HabitsPageStyle>
                <AddHabitStyle>
                    <h1>Meus hábitos</h1>
                    <button data-test="habit-create-btn" onClick={addHabit}>+</button>
                </AddHabitStyle>
                <HabitsInfo data-test="habit-create-container" status={isAddingHabit} >
                    <form onSubmit={registerNewHabit}>
                        <div>
                            <input data-test="habit-name-input" disabled={loading} value={habitName} onChange={(e) => setHabitName(e.target.value)} type="text" placeholder="nome do hábito" />
                            <Days >
                                {DAYS.map((day) =>
                                    <DaysButtons disabled={loading} data-test="habit-day" key={day.id} day={habitsDays.includes(day.id)} onClick={() => selectDays(day)}>{day.name.toUpperCase()}</DaysButtons>
                                )}
                            </Days>
                            <SendInfos>
                                <button type="button" disabled={loading} data-test="habit-create-cancel-btn" onClick={cancel}>Cancelar</button>
                                {!loading ? <button data-test="habit-create-save-btn" disabled={loading} type="submit">Salvar</button> :
                                    <Loading disabled={true}>
                                        <ThreeDots
                                            color="#FFFFFF"
                                            height="60"
                                            width="60"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClassName=""
                                            visible={true}
                                        />
                                    </Loading>
                                }
                            </SendInfos>
                        </div>
                    </form>

                </HabitsInfo>
                {habits.map((h) =>
                    <RegisteredHabits data-test="habit-container" key={h.id}>
                        <h1 data-test="habit-name">{h.name}</h1>
                        <img data-test="habit-delete-btn" onClick={() => deletHabit(h)} src={trashCan} alt="deletHabit" />
                        <Days>
                            {DAYS.map((d) =>
                                <ChoosedDays data-test="habit-day" key={d.id} day={(h.days).includes(d.id)}>{d.name.toUpperCase()}</ChoosedDays>
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

                <Menu data-test="menu" />
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
            &:disabled {
                background-color: #CFCFCF;
            }
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
                &:disabled {
                background-color: #CFCFCF;
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
    background-color: ${props => props.day ? "#CFCFCF" : "#FFFFFF"};
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
    background-color: ${props => props.day ? "#CFCFCF" : "#FFFFFF"};
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
        button:first-of-type {
            width: 69px;
            height: 20px;
            font-size: 16px;
            color: #52B6FF;
            border: none;
            background-color: #FFFFFF;
            margin-right: 23px;
            cursor: pointer;
        }
        button{
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


const Loading = styled.button`
     width: 84px;
     height: 35px;
     background: #52B6FF;
     border-radius: 5px;
     font-size: 16px;
     color: #FFFFFF;
     border-style: none;
     display: flex;
     justify-content: center;
     align-items: center;
        
`