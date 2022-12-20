import styled from "styled-components"
import Header from "../components/Header"
import Menu from "../components/Menu"

export default function HistoricPage() {
   
    // useEffect(() => {
    //     const config = {
    //         headers: {
    //             Authorization: `Bearer ${user.token}`
    //         }
    //     }

    //     axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", config)
    //         .then(res => console.log(res.data))
    //         .catch((err) => console.log(err.responde.data))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps  
    // }, [])

    return (
        <>
            <Header data-test="header" />
            <HistoricPageStyle>

                <Day>
                    <h1>Histórico</h1>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                </Day>

                <Menu  />

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
    margin-top: 65px;
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