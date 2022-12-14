import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "../assets/images/logo.png"
import AppContext from "../context/AppContext"

export default function LoginPage() {
    const {user, setUser} = useContext(AppContext)
    console.log(user)
    const navigate = useNavigate()
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const [disabled, setDisabled] = useState(false)

    function login(e) {
        e.preventDefault()
        setDisabled(true)

        const body = {
            email,
            password
        }

        console.log(body)

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
        .then((res) => {
            console.log(res.data)
            setUser({
                email: res.data.email,
                id: res.data.id,
                image: res.data.image,
                name: res.data.name,
                password: res.data.password,
                token: res.data.token
            })
            setDisabled(false)
            navigate("/habitos")
            
        })
        .catch((err) => console.log(err.response.data))

    }

    return (
        <LoginContainer>
            <Login>
                <img src={logo} alt="trackItLogo" />
                <div>
                    <form disabled={disabled} onSubmit={login}>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="senha" />
                        <button type="submit">Entrar</button>
                    </form>
                </div>
                <Link to={"/cadastro"}>
                <p>Não tem conta? Cadastre-se</p>
                </Link>

            </Login>
        </LoginContainer>

    )
}

const LoginContainer = styled.div`
    margin: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
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

const Login = styled.div`
     width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


