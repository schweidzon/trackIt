import styled from "styled-components"

export default function  Menu() {
    return (
        <MenuStyle>
            <p>Hábitos</p>
            <ToDayButton>Hoje</ToDayButton>
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


const ToDayButton = styled.button `
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