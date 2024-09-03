import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import './Sidebar.css';

const Sidebar = ({ onSelectGroup }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Retrieve groups from localStorage when the component mounts
        const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
        setGroups(savedGroups);
    }, []);

    useEffect(() => {
        // Save groups to localStorage whenever the groups state changes
        if (groups.length > 0) {
            localStorage.setItem('groups', JSON.stringify(groups));
        }
    }, [groups]);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleGroupCreate = (name, color) => {
        // Prevent adding duplicate group names
        if (groups.some(group => group.name === name)) {
            alert('A group with this name already exists!');
            return;
        }
        const newGroup = { name, color };
        setGroups([...groups, newGroup]);
    };

    const getInitials = (name) => {
        const words = name.split(' ');
        return words.length === 1
            ? words[0].substring(0, 2).toUpperCase()
            : (words[0][0] + words[1][0]).toUpperCase();
    };

    return (
        <div className="sidebar">
            <h2 className="head_note">Pocket Notes</h2>
            <div className="floating-button">
                <button className="btn" onClick={togglePopup}>+</button>
            </div>
            <Popup show={showPopup} onClose={togglePopup} onGroupCreate={handleGroupCreate} />
            
            {/* Display the list of groups */}
            <div className="group-list">
                {groups.map((group, index) => (
                    <div key={index} className="group-item" onClick={() => onSelectGroup(group)}>
                        <div className="group-logo" style={{ backgroundColor: group.color }}>
                            {getInitials(group.name)}
                        </div>
                        <span className="group-name">{group.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
