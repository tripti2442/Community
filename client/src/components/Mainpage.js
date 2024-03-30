import React, { useState } from "react";
import "./Mainpage.css"; // Import CSS file for styling
import FormComponent from "./Add";
import BuddySearch from "./BuddySearch";

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
                return <div>Home Feed Content</div>;
            case "Search Destination":
                return <div>Search Destination Content</div>;
            case "Find a Travel Buddy":
                return <BuddySearch/>;
            case "Add a Travel Buddy":
                return <FormComponent/>;
            case "Add a Post":
                return <div>Add a Post Content</div>;
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
                    <li className={selectedOption === "Find a Travel Buddy" ? "selected" : ""} onClick={() => handleOptionSelect("Find a Travel Buddy")}>Find a Travel Buddy</li>
                    <li className={selectedOption === "Add a Travel Buddy" ? "selected" : ""} onClick={() => handleOptionSelect("Add a Travel Buddy")}>Add a Travel Buddy</li>
                    <li className={selectedOption === "Add a Post" ? "selected" : ""} onClick={() => handleOptionSelect("Add a Post")}>Add a Post</li>
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
