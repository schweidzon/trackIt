import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/Header";
import HabitsPage from "./pages/HabitsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GlobalStyle from "./style/globalStyle";
import AppProvider from "./context/Provider";
import Menu from "./components/Menu";

function App() {


  return (

    <>
      <BrowserRouter>
        <GlobalStyle />
        <AppProvider>
          <Routes>
            <Route path="/" element={<LoginPage  />} />
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/habitos" element={<HabitsPage  />} />
          </Routes>
          <Menu/>
        </AppProvider>
      </BrowserRouter>
    </>

  );
}

export default App;
