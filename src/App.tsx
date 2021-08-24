import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navber/Navber";
import Profile from "./components/Profile/Profile";

function App() {
    return (
        <div className="app-wrapper-content">
            <Header />
            <Navbar />
            <Profile />
        </div>
    );
}

export default App;
