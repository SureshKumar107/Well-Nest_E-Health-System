import React, { useEffect, useContext } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appointment from './pages/Appointment';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import Register from './pages/Register';
import Doctors from './pages/Doctors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import axios from "axios";
import { Context } from "./main";
import Footer from './components/Footer';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null); // Set to null or an empty object based on your context's initial state
      }
    };
    fetchUser();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment/:departmentname" element={<Appointment />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
}

export default App;
