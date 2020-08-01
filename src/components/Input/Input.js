
import React from 'react'

import "./Input.css"
import sendButton from "../../icons/send_icon.png"
import ReactStars from "react-rating-stars-component";
import VLogo from "../../icons/v-logo.png"





const Input = ({message, setMessage,sendMessage, finishQuestions, setRater, apiRater, submitRate}) => {

	

	return (
		<div>
		{finishQuestions 
			? submitRate ? 
				<div className="rateSubmited">
					<img src={VLogo} alt="just V from volanty logo"/>
					<p> Avaliação enviada com sucesso! </p>
				</div>

			:( 
				<div className="rater">
					<p>Avalie se as escolhas foram certas</p>
					<ReactStars size={35} onChange={newValue=>{setRater(newValue)}} />
					<button onClick={event=>{apiRater()}}>Enviar</button>
				</div>
			) 
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

