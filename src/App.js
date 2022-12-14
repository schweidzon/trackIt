import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HabitsPage from "./pages/HabitsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GlobalStyle from "./style/globalStyle";

function App() {

  const [token, setToken] = useState("")
  return (

    <>
      <BrowserRouter>
      <GlobalStyle />
      
      <Routes>
        <Route path="/" element={<LoginPage setToken={setToken} /> }/>
        <Route path="/cadastro" element={<RegisterPage/> }/>
        <Route path="/habitos" element={<HabitsPage token={token} /> }/>
      </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
