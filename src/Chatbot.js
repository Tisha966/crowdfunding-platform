import React, { useState } from 'react';
import './chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! How can we assist you today?', type: 'bot' },
  ]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessages = [
        ...messages,
        { text: message, type: 'user' },
        { text: 'Thank you for your message!', type: 'bot' }, // Simulated bot reply
      ];
      setMessages(newMessages);
      setMessage(''); // Clear input field
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      sendMessage();
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-header">
        <h3>Chat with us</h3>
        <button onClick={toggleChatbot} className="close-btn">X</button>
      </div>
      {isOpen && (
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.type === 'bot' ? 'bot-message' : 'user-message'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      )}
      {isOpen && (
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <button className="chatbot-send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      )}
      <button className="chatbot-toggle-btn" onClick={toggleChatbot}>
        {isOpen ? 'Close Chat' : 'Chat with us'}
      </button>
    </div>
  );
};

export default Chatbot;
