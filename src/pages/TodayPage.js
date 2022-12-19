import styled from "styled-components";
import Header from "../components/Header";
import Menu from "../components/Menu";
import right from "../assets/images/correctSimb.png"
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";





export default function TodayPage() {
    const { user, todayHabits, setTodayHabits, setConcluded } = useContext(AppContext)
    const weekday = (new Date().toLocaleString('pt-br', { weekday: 'long' }))
    const weekdayAbrev = weekday.split("-")[0]
    const day = (dayjs().format("DD/M"))
    const [reload, setReload] = useState([])
    const location = useLocation()






    useEffect(() => {

       

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
            .then(res => {
                const data = res.data
                setTodayHabits(data)
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])

    



    function render() {
        if (todayHabits.find((h) => h.done === true)) {
            let count = 0
            todayHabits.forEach((h) => {
                if (h.done === true) {

                    count = count + 1
                }

            })
            setConcluded(((count / todayHabits.length) * 100).toFixed(2))
            return `${((count / todayHabits.length) * 100).toFixed(2)}% dos hábitos concluídos`

        } else {
            setConcluded(0)
            return 'Nenhum hábito concluído ainda'
        }

    }


    function finishHabit(habit, i) {
     

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }


        if (habit.done === true) {
          

            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`, {}, config)
                .then(() => {
                    setReload([])
                })
            return
        } else {
           


            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`, {}, config)
                .then(() => {
                    setReload([])
                })
                .catch(err => console.log(err.response.data))
        }
    }








    return (
        <>
            <Header data-test="header" />
            <HabitsPageStyle >
                <Day concluded={(todayHabits.find((h) => h.done === true))}>
                    <h1 data-test="today">{`${weekdayAbrev.charAt(0).toUpperCase() + weekdayAbrev.slice(1)}, ${day}`}</h1>
                    <p data-test="today-counter">{location.pathname==="/hoje" && render()}</p>
                </Day>

                {todayHabits.map((h, i) =>
                    <RegisteredHabits data-test="today-habit-container" key={h.id} sequence={h.highestSequence === h.currentSequence && h.highestSequence > 0} >
                        <div>
                            <h1 data-test="today-habit-name">{h.name}</h1>
                            <p data-test="today-habit-sequence">Sequência atual: <span>{h.currentSequence} {h.currentSequence > 1 ? 'dias' : h.currentSequence === 0 ? '' : 'dia'}</span></p>
                            <p data-test="today-habit-record">Record: <span>{h.highestSequence} {h.highestSequence > 1 ? 'dias' : h.highestSequence === 0 ? '' : 'dia'}</span> </p>
                        </div>
                        <DoneButton data-test="today-habit-check-btn" onClick={() => finishHabit(h, i)} done={h.done}></DoneButton>
                    </RegisteredHabits>
                )}
            </HabitsPageStyle>
            <Menu data-test="menu" />
        </>
    )
}





const Day = styled.div`
    h1 {
        font-size: 23px;
        color: #126BA5;
        margin-bottom: 5px;
        margin-top: 28px;
        width: 303px;
      
    }
    p {
        font-size: 18px;        
        margin-bottom: 8px;
        color: ${props => props.concluded ? "#8FC549" : '#BABABA'};

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
    margin-top: 60px;
  
`

const RegisteredHabits = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 19px;    
    margin-top: 20px;
    background-color: #FFFFFF;
    width: 340px;
    border-radius: 5px;
    position: relative;
        h1 {
           font-size:20px ;
           color: #666666;
           margin-bottom: 8px;
           margin-top: 10px;
        }    
        
        p {
          font-size  :13px ;
          color: #666666;
          
        }
        span {
            color: ${props => props.sequence ? '#8FC549' : "#666666"};
        }
`

const DoneButton = styled.button`
    width: 69px;
    height: 69px;
    background-color: ${props => props.done ? "#8FC549" : "#EBEBEB"};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    background-image: url(${right});            
    background-repeat: no-repeat;
    background-position: center;
    text-align: center;
    cursor: pointer;
`

