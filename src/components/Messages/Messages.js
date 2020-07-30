import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import "./Messages.css"
import Message from './Message/Message'
import Card from '../Card/Card'


const Messages = ({messages, name, finishQuestions, cardData}) => (


	<ScrollToBottom className="messages">
	{messages.map((message,i)=> <div key={i}><Message message={message} name={name}/></div>)}
	{finishQuestions ? cardData.map((car, i) => <Card key={i} data={car} />) : null}	
	</ScrollToBottom>
	
)



export default Messages;