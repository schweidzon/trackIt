import styled from "styled-components"

export default function NavBar() {
    return (
        <Header>
            <h1>TrackIt</h1>
            <img src="https://akamai.sscdn.co/uploadfile/letras/fotos/5/9/6/2/59625c6b8950a0b058b325f92e478dc9.jpg"/>
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