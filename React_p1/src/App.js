import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import UserScreen from './components/UserScreen'; // Import the new component
import './App.css';

function App() {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [view, setView] = useState('main'); // New state to track which screen to show

    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
        setView('user'); // Switch to UserScreen when a group is selected
    };

    const handleBackToMain = () => {
        setView('main'); // Switch back to MainContent
    };

    return (
        <div className="app-container">
            <Sidebar onSelectGroup={handleGroupSelect} />
            {view === 'main' ? (
                <MainContent selectedGroup={selectedGroup} />
            ) : (
                <UserScreen selectedGroup={selectedGroup} onBack={handleBackToMain} />
            )}
        </div>
    );
}

export default App;
