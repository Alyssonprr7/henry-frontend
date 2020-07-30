
import React, {useState} from 'react'

import "./Input.css"
import sendButton from "../../icons/send_icon.png"
import Rating from 'react-rating'
import ReactStars from "react-rating-stars-component";





const Input = ({message, setMessage,sendMessage, finishQuestions}) => {
	const [rater, setRater] = useState(0)

	function ApiRater(value){
		console.log(value)
	}

	return (
		<div>
		{finishQuestions 
			? <div className="rater">
				<p>Avalie se as escolhas foram certas</p>
				<ReactStars size={35} onChange={newValue=>{setRater(newValue)}} />
				<button onClick={event=>{ApiRater(rater)}}>Enviar</button>
			</div> 
			: <form className="form">
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
			</form>}
		</div> 
	)
}

	
	



export default Input;

