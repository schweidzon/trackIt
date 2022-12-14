import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "../assets/images/logo.png"

export default function RegisterPage() {
    const navigate = useNavigate()
    const [name, setName ] = useState("")
    const [password, setPassword ] = useState("")
    const [email, setEmail ] = useState("")
    const [image, setImage ] = useState("")

    function register(e) {
        e.preventDefault()

        const body = {
            email,
            name,
            image,
            password
        }
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body)
        .then((res) =>{
            console.log(res.data)
            navigate("/")
            
        } )
        .catch((err) => alert(err.response.data.message))
    }

    return (
        <RegisterContainer >
            <Register>
                <img src={logo} alt="trackItLogo" />
                <div>
                    <form onSubmit={register}>
                        <input type="email" onChange={(e) => setEmail(e.target.value)}placeholder="email" />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="senha" />
                        <input type="name" onChange={(e) => setName(e.target.value)} placeholder="nome" />
                        <input type="url" onChange={(e) => setImage(e.target.value)} placeholder="foto" />
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>

                <p>Já tem uma conta? Faça login!</p>
            </Register>
        </RegisterContainer>

    )
}

const RegisterContainer = styled.div`
    margin: auto;   
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
        img {
            width: 180px;
            height: 178px;
        }
        form {
            display: flex;
            flex-direction: column;
            input {
                margin-bottom: 5px;
                width: 303px;
                height: 45px;
                border: 1px solid #D5D5D5;
                border-radius: 5px;
                padding: 7px;
                &::placeholder {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 20px;
                    color: #DBDBDB;
                }
            }
        }
        button {
            width: 303px;
            height: 45px;
            background: #52B6FF;
            border-radius: 5px;
            border-style: none;
            cursor: pointer;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 20.976px;
            color: #FFFFFF;
             &:active {
                box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 30px -12px inset, rgba(0, 0, 0, 0.3) 0px 10px 30px -18px inset;
             }

        }
        p {
           margin-top: 10px;
           font-weight: 400;
            font-size: 14px;
            text-decoration-line: underline;
            color: #52B6FF;
            cursor: pointer;
        }
`

const Register = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


