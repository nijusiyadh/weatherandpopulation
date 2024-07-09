import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import WeatherPage from "./Pages/WeatherPage";
import HeaderNav from "./Components/HomePageComponents/HeaderNav";

function App() {
  return (
    <>
      <HeaderNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </>
  );
}

export default App;
