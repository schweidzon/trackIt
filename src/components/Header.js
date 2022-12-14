import { useContext } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"

export default function NavBar() {
    const { user, setUser } = useContext(AppContext)
    return (
        <Header>
            <Link to="/">
                <h1>TrackIt</h1>
            </Link>
            <img src={user.image} />
        </Header>
    )
}

const Header = styled.div`
    width: 100%;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
        h1 {
            font-family: 'Playball';
            font-size: 39px;
            color: #FFFFFF;
        }

        img {
            width: 51px;
            height: 51px;
            border-radius: 100px;
        }

`