import React, { useState } from "react";
import "./Mainpage.css"; // Import CSS file for styling
import Post from "./Post";
import Home from "./Home.js";
import HomeFeed from "./feedposts.js";

export default function Mainpage() {
    // State to track the selected option
    const [selectedOption, setSelectedOption] = useState("Home");



    // Function to handle option selection
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    // Content for each option
    const renderContent = () => {
        switch (selectedOption) {
            case "Home":
                return <div><Post></Post><HomeFeed></HomeFeed></div>
            case "Search Destination":
                return <div>Search Destination Content</div>;
            case "Travel Buddy":
                return <Home/>;
            case "User Profile":
                return <div>User Profile Content</div>;
        }
    };

    return (
        <div className="main-page">
            <div className="sidebar">
                {/* Sidebar content goes here */}
                <ul>
                    <li className={selectedOption === "Home" ? "selected" : ""} onClick={() => handleOptionSelect("Home")}>Home</li>
                    <li className={selectedOption === "Search Destination" ? "selected" : ""} onClick={() => handleOptionSelect("Search Destination")}>Search Destination</li>
                    <li className={selectedOption === "Travel Buddy" ? "selected" : ""} onClick={() => handleOptionSelect("Travel Buddy")}>Travel Buddy</li>
                    <li className={selectedOption === "User Profile" ? "selected" : ""} onClick={() => handleOptionSelect("User Profile")}>User Profile</li>
                </ul>
            </div>
            <div className="main-content">
                {/* Render content based on the selected option */}
                {renderContent()}
            </div>
        </div>
    );
}
