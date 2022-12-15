
import axios from "axios"
import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import { Calendar } from "react-calendar"
import styled from "styled-components"
import Header from "../components/Header"
import Menu from "../components/Menu"
import AppContext from "../context/AppContext"





export default function HistoricPage() {
    const { user } = useContext(AppContext)
    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date)
    }

   



    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", config)
            .then(res => console.log(res.data))
            .catch((err) => console.log(err.responde.data))
    }, [])




    return (
        <>
            <Header data-test="header" />
            <HistoricPageStyle>

                <Day>
                    <h1>Histórico</h1>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                </Day>
                
                <Menu data-test="menu" />

            </HistoricPageStyle>

        </>

    )
}


const HistoricPageStyle = styled.div`
    width: 100vw;
    height: calc(100vh - 70px);
    background-color: #E5E5E5;
    display: flex;
    justify-content: center;


`

const Day = styled.div`
    width: 330px;
    h1 {
        font-size: 23px;
        color: #126BA5;
        margin-bottom: 5px;
        margin-top: 28px;
        width: 303px;
      
    }
    p {
        font-size: 18px;        
        margin-bottom: 28px;
        margin-top: 17px;
        color: #666666;
        line-height: 22px;


    }
`