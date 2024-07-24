import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/Header/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelProvider from "./components/context/HotelProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import AuthContextProvider from "./components/context/AuthProvider";
import LoginForm from "./components/Login/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <HotelProvider>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/hotels" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
          <Route index element={<Hotels/>}/>
          <Route path=":id" element={<SingleHotel/>}/>
        </Route>
      </Routes>
    </HotelProvider>
    </AuthContextProvider>
  );
}

export default App;
