import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ show, onClose, onGroupCreate }) => {
    const [groupName, setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    if (!show) return null;

    const capitalizeFirstLetter = (text) => {
        return text
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const handleCreate = () => {
        if (!groupName.trim() || !selectedColor) {
            alert('Please enter a group name and select a color!');
            return;
        }

        // Capitalize the first letter of each word in the group name
        const formattedGroupName = capitalizeFirstLetter(groupName.trim());

        // Retrieve existing groups from local storage
        const groups = JSON.parse(localStorage.getItem('groups')) || [];

        // Add new group to the list
        const newGroup = { name: formattedGroupName, color: selectedColor };
        groups.push(newGroup);

        // Save updated list to local storage
        localStorage.setItem('groups', JSON.stringify(groups));

        onGroupCreate(formattedGroupName, selectedColor); // Pass both name and color to the parent
        setGroupName(''); // Clear the input field
        setSelectedColor(''); // Clear the selected color
        onClose(); // Close the popup
    };

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Create New Group</h2>

                <div className="CreateName">
                    <label htmlFor="group-name">Group Name</label>
                    <input 
                        type="text" 
                        id="group-name" 
                        className="group-input" 
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>
                
                <div className="CreateColor">
                    <label htmlFor="group-color">Choose Colour</label>
                    <div className="color-options">
                        <div 
                            className="color-circle" 
                            style={{ backgroundColor: "#B38BFA", border: selectedColor === "#B38BFA" ? '2px solid #23009d' : 'none' }}
                            onClick={() => handleColorClick("#B38BFA")}
                        ></div>
                        <div 
                            className="color-circle" 
                            style={{ backgroundColor: "#33FF57", border: selectedColor === "#33FF57" ? '2px solid #23009d' : 'none' }}
                            onClick={() => handleColorClick("#33FF57")}
                        ></div>
                        <div 
                            className="color-circle" 
                            style={{ backgroundColor: "#FF79F2", border: selectedColor === "#FF79F2" ? '2px solid #23009d' : 'none' }}
                            onClick={() => handleColorClick("#FF79F2")}
                        ></div>
                        <div 
                            className="color-circle" 
                            style={{ backgroundColor: "#F19576", border: selectedColor === "#F19576" ? '2px solid #23009d' : 'none' }}
                            onClick={() => handleColorClick("#F19576")}
                        ></div>
                        <div 
                            className="color-circle" 
                            style={{ backgroundColor: "#0047FF", border: selectedColor === "#0047FF" ? '2px solid #23009d' : 'none' }}
                            onClick={() => handleColorClick("#0047FF")}
                        ></div>
                        <div 
                            className="color-circle" 
                            style={{ backgroundColor: "#6691FF", border: selectedColor === "#6691FF" ? '2px solid #23009d' : 'none' }}
                            onClick={() => handleColorClick("#6691FF")}
                        ></div>
                    </div>
                </div>

                <button className="close-btn" onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
};

export default Popup;
