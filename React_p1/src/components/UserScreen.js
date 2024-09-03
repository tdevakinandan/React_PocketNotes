import React, { useState, useEffect, useRef } from 'react';
import './UserScreen.css';
import './Popup.css'; // Import your Popup stylesheet
import Popup from './Popup'; // Import the Popup component


const UserScreen = ({ selectedGroup }) => {
    const [message, setMessage] = useState('');
    const [messageContainers, setMessageContainers] = useState([]);
    const messagesEndRef = useRef(null); // Ref for scrolling to the bottom

      const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        if (selectedGroup) {
            // Retrieve stored message containers for the selected group from localStorage
            const storedContainers = JSON.parse(localStorage.getItem(`messageContainers_${selectedGroup.name}`)) || [];
            setMessageContainers(storedContainers);
        }
    }, [selectedGroup]);

    useEffect(() => {
        // Scroll to the bottom whenever messages change
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messageContainers]);

    const handleTextChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        if (message.trim() && selectedGroup) {
            // Format the date as "9 Mar 2024 10:10 AM"
            const formattedDate = new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            }).format(new Date()).replace(',', ''); // Remove comma after year

            const newContainer = {
                messages: [message],
                timestamp: formattedDate, // Add formatted timestamp
            };

            const updatedContainers = [...messageContainers, newContainer];
            setMessageContainers(updatedContainers);

            // Save to localStorage using the group name as the key
            localStorage.setItem(`messageContainers_${selectedGroup.name}`, JSON.stringify(updatedContainers));
            setMessage(''); // Clear the textarea after sending
        }
    };

    const getInitials = (name) => {
        const words = name.split(' ');
        return words.length === 1
            ? words[0].substring(0, 2).toUpperCase()
            : (words[0][0] + words[1][0]).toUpperCase();
    };

    return (
        <div className="user-screen">
            {selectedGroup && (
                <>
                    <div className="top-nav">
                        <div className="group-logo" style={{ backgroundColor: selectedGroup.color }}>
                            {getInitials(selectedGroup.name)}
                        </div>
                        <h1 className="user-name">{selectedGroup.name}</h1>
                    </div>
                    {/* Messages container with scrollbar */}
                    <div className="messages-wrapper">
                        {messageContainers.map((container, index) => (
                            <div key={index} className="messages-container">
                                {container.messages.map((msg, msgIndex) => (
                                    <div key={msgIndex} className="saved-message">
                                        {msg}
                                        <div className="message-date">{container.timestamp}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <div ref={messagesEndRef} /> {/* Empty div to scroll to */}
                    </div>

                    {/* Text Area Design */}
                    <div className="placeholder">
                        <textarea
                            className="styled-textarea"
                            rows="5"
                            placeholder="Here’s the sample text for sample work"
                            value={message}
                            onChange={handleTextChange}
                        />
                        <button
                            className="send-button"
                            onClick={handleSend}
                            disabled={!message.trim()} // Disable button if message is empty
                        >
                            <i className="material-icons">send</i>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserScreen;
