import React from 'react';
import './MainContent.css';

const MainContent = ({ selectedGroup }) => {
    return (
        <div className="main-content">
            <div className="content-wrapper">
                <img
                    src={`${process.env.PUBLIC_URL}/image.png`} // Replace this with your image URL
                    alt="Illustration"
                    className="illustration"
                />
                <h1>{selectedGroup ? `Session for ${selectedGroup.name}` : 'Pocket Notes'}</h1>
                {selectedGroup ? (
                    <>
                        <p>Group color: <span style={{ color: selectedGroup.color }}>{selectedGroup.color}</span></p>
                        <p>Send and receive messages with {selectedGroup.name} without keeping your phone online.</p>
                    </>
                ) : (
                    <p>Send and receive messages without keeping your phone online.</p>
                )}
                <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
                <p className="encryption">🔒 end-to-end encrypted</p>
            </div>
        </div>
    );
};

export default MainContent;
