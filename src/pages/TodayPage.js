import styled from "styled-components";
import NavBar from "../components/Header";
import Menu from "../components/Menu";
import right from "../assets/images/correctSimb.png"
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";

export default function TodayPage() {
    const { user } = useContext(AppContext)
    const [todayHabits, setTodayHabits] = useState([])
    const [reload, setReload] = useState([])
    const [todayProgress, setTodayProgress] = useState([])
    let counter = 1
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

        // console.log(counter)
        // console.log(todayHabits.length)


    }, [reload])

    function render() {
     
       if(todayHabits.find((h) => h.done === true))  {
            let count = 0
            todayHabits.map((h) => {
               if(h.done === true ) {
                   console.log('true')
                   count = count + 1
               }
             
            })
            return `${((count/todayHabits.length)*100)}% dos hábitos concluídos`

        } else {
            return 'test'
        }
    
       
     
  
    
    }
   
    console.log(todayProgress)

    



    function finishHabit(habit) {
        console.log(todayProgress)
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const body = {}



        if (habit.done === true) {
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`, body, config)
                .then(() => {
                    setReload([])
                   
                })
            return
        }


        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`, body, config)
            .then(() => {
                setReload([])
            })
            .catch(err => console.log(err.response.data))



    }


    return (
        <>
            <NavBar />
            <HabitsPageStyle>

                <div>
                    <h1></h1>
                    <p>{render()}</p>
                </div>
                <>
                    {todayHabits.map((h) =>
                        <RegisteredHabits>
                            <div>
                                <h1>{h.name}</h1>
                                <p>Sequência atual: {h.currentSequence}</p>
                                <p>Record: {h.highestSequence}</p>
                            </div>
                            <DoneButton onClick={() => finishHabit(h)} done={h.done}></DoneButton>
                        </RegisteredHabits>


                    )}


                </>
            </HabitsPageStyle>
            <Menu />
        </>
    )
}

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

