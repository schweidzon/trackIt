import { Link } from "react-router-dom"
import styled from "styled-components"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function  Menu() {
    const {concluded} = useContext(AppContext)

    return (
        <MenuStyle>
            <Link to={"/habitos"}>
            <p>Hábitos</p>
            </Link>
            <Link to="/hoje">
            <ToDayButton >
                <CircularProgressbar                    
                    value={concluded}                    
                    text={"Hoje"}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#3e98c7",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent",
                        
                        
                    })}
                />
            </ToDayButton>
            </Link>
            <p>Histórico</p>
        </MenuStyle>
    )
}

const MenuStyle = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 30px;
    position: fixed;
    bottom: 0;
    background-color: #FFFFFF;
    width: 100%;

   
        p {
            font-size: 18px;
            color: #52B6FF;
            cursor: pointer;
        }

`


const ToDayButton = styled.div `
    width: 91px;
    height: 91px;
    background: #52B6FF;
    border-radius: 100px;
    position: absolute;
    bottom: 10px;
    border-style: none;
    left: calc(50% - 46px);
    font-size: 18px;
    color: #FFFFFF;
    cursor: pointer;

`