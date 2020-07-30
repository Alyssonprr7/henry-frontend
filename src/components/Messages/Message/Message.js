import React, {useState} from 'react'
import ReactEmoji from 'react-emoji'
import Loader from 'react-loader-spinner'
import Card from '../../Card/Card'



import "./Message.css"

//<p className="sentText">Henry está digitando...</p>

const Message = ({message: {user, label, text}, name}) => {
	const [isSentByCurrentUser, setIsSentByCurrentUser] = useState(false)

	setTimeout(()=>{
		setIsSentByCurrentUser(!isSentByCurrentUser)
	},[10000])
	
	return(
		label === "clientMessage"
		? (
			<div className="messageContainer justifyEnd">
				<p className="sentText pr-10"> {name} </p>
				<div className="messageBox backgroundOrange">
					<p className="messageText colorWhite">{text}</p>
				</div>
			</div>
		)

		: label !=="typing" ?
			(
				<div className="messageContainer justifyStart">
					<div className="messageBox backgroundBlue henry">
						<p className="messageText colorWhite">{text}</p>
					</div>
					<p className="sentText pl-10"> Henry </p>
					
				</div>
			)

		: (
			<div className="justifyStart">
				 <Loader
				     type="ThreeDots"
				     color="#072647"
				     height={40}
				     width={40}
				  />
			</div>
		)

		
	)
}


export default Message;