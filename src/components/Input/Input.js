import React from 'react'

import "./Input.css"
import sendButton from "../../icons/send_icon.png"


const Input = ({message, setMessage,sendMessage}) => (
	<form className="form">
		<input 
		className="input"
		type="text" 
		placeholder="Type a message..."
		value={message}
		onChange={(event)=>setMessage(event.target.value)}
		onKeyPress={event=>event.key==='Enter' ? sendMessage(event) : null}
		 />
		<div className="test">
			<button className="sendButton" onClick={(event)=>sendMessage(event)}><img src={sendButton} alt="send-icon" /></button>
		</div>
	</form> 
	
)


export default Input;

