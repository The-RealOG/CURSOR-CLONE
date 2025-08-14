import React, { useState, useRef, useEffect } from 'react';
import { 
  Button, 
  Textarea, 
  Avatar,
  Divider
} from '@fluentui/react-components';
import { 
  Send24Regular, 
  Bot24Regular, 
  Person24Regular,
  Dismiss24Regular,
  Settings24Regular
} from '@fluentui/react-icons';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m Cursor AI, your coding assistant. I can help you write, debug, and improve your code. What would you like to work on today?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateMockResponse(userMessage.content),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateMockResponse = (userInput: string): string => {
    const responses = [
      "I'd be happy to help you with that! Let me analyze your code and provide some suggestions.",
      "That's a great question! Here's how I would approach this problem:",
      "I can see what you're trying to achieve. Let me help you implement this feature.",
      "This looks like a common pattern. I'll show you the best practices for handling this.",
      "I notice a few areas where we can optimize this code. Let me walk you through the improvements.",
      "Here's a clean and efficient solution for your use case:",
      "That's an interesting challenge! Let me break this down step by step for you."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="chat-panel">
      {/* Chat Header */}
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot24Regular style={{ color: '#007acc' }} />
          <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Cursor AI</span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button
            appearance="subtle"
            size="small"
            icon={<Settings24Regular />}
            title="Settings"
          />
          <Button
            appearance="subtle"
            size="small"
            icon={<Dismiss24Regular />}
            onClick={clearMessages}
            title="Clear Chat"
          />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-content">
        {messages.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            color: '#888',
            padding: '20px'
          }}>
            <Bot24Regular style={{ fontSize: '48px', marginBottom: '16px', color: '#007acc' }} />
            <h3 style={{ marginBottom: '8px', color: '#cccccc' }}>Welcome to Cursor AI</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.4' }}>
              I'm here to help you code faster and smarter. Ask me anything about your project!
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message.id} className={`chat-message ${message.type}`}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <Avatar
                    icon={message.type === 'user' ? <Person24Regular /> : <Bot24Regular />}
                    size={24}
                    style={{
                      backgroundColor: message.type === 'user' ? '#0078d4' : '#007acc',
                      color: 'white'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <span style={{ 
                        fontSize: '12px', 
                        fontWeight: 'bold',
                        color: message.type === 'user' ? '#0078d4' : '#007acc'
                      }}>
                        {message.type === 'user' ? 'You' : 'Cursor AI'}
                      </span>
                      <span style={{ fontSize: '11px', color: '#888' }}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="chat-message-content">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="chat-message assistant">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <Avatar
                    icon={<Bot24Regular />}
                    size={24}
                    style={{ backgroundColor: '#007acc', color: 'white' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#007acc' }}>
                        Cursor AI
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#888',
                      fontStyle: 'italic'
                    }}>
                      Typing...
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <Divider />

      {/* Chat Input */}
      <div className="chat-input-area">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <Textarea
            ref={textareaRef}
            placeholder="Ask Cursor AI anything..."
            value={inputValue}
            onChange={(e, data) => setInputValue(data.value)}
            onKeyDown={handleKeyPress}
            resize="vertical"
            style={{ 
              flex: 1,
              minHeight: '36px',
              maxHeight: '120px',
              backgroundColor: '#1e1e1e',
              border: '1px solid #3c3c3c',
              color: '#cccccc'
            }}
            disabled={isTyping}
          />
          <Button
            appearance="primary"
            icon={<Send24Regular />}
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            style={{ minWidth: '40px' }}
            title="Send Message"
          />
        </div>
        <div style={{ 
          fontSize: '11px', 
          color: '#888', 
          marginTop: '8px',
          textAlign: 'center'
        }}>
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
