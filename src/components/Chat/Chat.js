import React, {useState, useEffect} from 'react'

import "./Chat.css"

import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'



const Chat = () => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
  	const [users, setUsers] = useState('');


	const sendMessage = (event) => {
		event.preventDefault()
		if(message){
			setMessages([...messages, message])
			setMessage("")
		}
	}

	console.log(message, messages)

	return (
		<div className="outerContainer">
			<div className="container">
				<Infobar />
				<Messages messages={messages}/>

				<Input message={message} setMessage={setMessage} sendMessage={sendMessage}/> 
			</div>
			<TextContainer/>
		</div>
	)
}

export default Chat;