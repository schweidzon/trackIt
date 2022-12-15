import styled from "styled-components"
import NavBar from "../components/Header"
import Menu from "../components/Menu"


export default function HistoricPage() {

    return (
        <>
            <NavBar />
            <HistoricPageStyle>

                <Day>
                    <h1>Histórico</h1>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                </Day>


                <Menu />
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