import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
const steps = [
    {
        id: '0',
        message: 'Hey I am chitti the robo , ',
 
        // This calls the next id
        // i.e. id 1 in this case
       

    }
];

// Creating our own theme
const theme = {
	background: '#325252',
	headerBgColor: '#197B22',
	headerFontSize: '20px',
	botBubbleColor: '#0F3789',
	headerFontColor: 'white',
	botFontColor: 'white',
	userBubbleColor: '#FF5733',
	userFontColor: 'white',
};

// Set some properties of the bot
const config = {
	botAvatar: "https://cdn.dribbble.com/users/2382289/screenshots/5664064/media/d9fcf8d4813a840a7b8f6f508f9e236e.jpg?compress=1&resize=400x300",
	floating: true,
};

function Chatbot() {
    const [userMessage, setUserMessage] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');
  let { user } = useContext(AuthContext)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send an HTTP request to the Django view function using axios
    const response = await axios.post('/chatbot-response', {
      message: userMessage
    });

    // Update the chatbot's output in the React frontend
    setChatbotResponse(response.data.response);
  };

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<ChatBot

					// This appears as the header
					// text for the chat bot
					headerTitle= {user?.username}
					steps={steps}
					{...config}

				/>
			</ThemeProvider>
		</div>
	);
}

export default Chatbot;




