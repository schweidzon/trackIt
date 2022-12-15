import { BrowserRouter, Route, Routes } from "react-router-dom";
import HabitsPage from "./pages/HabitsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GlobalStyle from "./style/globalStyle";
import AppProvider from "./context/Provider";
import TodayPage from "./pages/TodayPage";
import HistoricPage from "./pages/HistoricPage";



function App() {


  return (    
      <BrowserRouter>
        <GlobalStyle />
        <AppProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/habitos" element={<HabitsPage />} />
            <Route path="/hoje" element={<TodayPage />} />
            <Route path="/historico" element={<HistoricPage />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
  );
}

export default App;
