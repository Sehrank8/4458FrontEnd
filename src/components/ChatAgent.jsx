import React, { useState } from 'react';
import api from '../api';
import '../App.css';
import axios from 'axios';

const ChatAgent = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! What job are you looking for?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');

    try {
      const res = await axios.post('https://four458aiagent.onrender.com/api/v1/agent', { message: input });
      const aiMsg = res.data.response || 'There was a problem.';

      setMessages((prev) => [...prev, { role: 'ai', text: aiMsg }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'ai', text: 'AI couldnt respond.' }]);
    }
  };

  return (
    <div className="chat-agent">
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-bubble ${msg.role === 'ai' ? 'left' : 'right'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Please write your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Gönder</button>
      </div>
    </div>
  );
};

export default ChatAgent;
