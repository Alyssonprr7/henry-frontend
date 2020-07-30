import React, {useState,useEffect} from 'react'

import "./Chat.css"

//import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'
import Card from '../Card/Card'


const Chat = () => {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [answers, setAnswers] = useState([])

	const realQuestions = [ "Como eu posso te chamar?", `${name}, qual é a média de preço que você está procurando em um carro? Digite apenas o número, por favor...`,
	 `Vamos lá, agora eu peço pra que responda as perguntas seguintes somente com sim ou não.\n Você tem filhos, ${name}?`, "Você é casado?", `${name}, você usará o carro diariamente?`]
	const interactionQuestions = [`Ótimo, é um prazer falar com você!`,
	 `Beleza ${name}, esse é um bom valor para começar meus cálculos!`,
	 "Ótimo, esssa informação é importante", "Show, eu precisava muito dessa sua resposta, UFA!", "Ok, isso basta para calcularmos o melhor pra você!"]

	const possibleNo = ["nao", "não", "n", "no"] 
	const possibleYes = ["sim", "s", "yes"]

	let lastMessage = messages[messages.length -1]
	let secondFromLastMessage = messages[messages.length -2]
	let thirdFromLastMessage = messages[messages.length -3]

	const sendBotMessage = (text,label, userMessage) => {
		if (!userMessage) {
			setTimeout(()=>{
				setMessages([...messages, {"user":"bot", "label": "typing", "text": ""}])	
			}, 1000)
			setTimeout(()=>{
				setMessages([...messages, {"user":"bot", "label":label, "text": text}])	
			}, 3000)
		}else{
			setTimeout(()=>{
				setMessages([...messages, {"user":"client", "label": "clientMessage", "text": userMessage}, {"user":"bot", "label": "typing", "text": ""}])	
			}, 1000)
			setTimeout(()=>{
				setMessages([...messages, {"user":"client", "label": "clientMessage", "text": userMessage},{"user":"bot", "label": label, "text": text}])	
			}, 3000)
		}
	}

	useEffect(()=>{
		sendBotMessage("Olá, seja bem vindo! Eu me chamo Henry e vou te ajudar a escolher o melhor carro!","welcomeMessage")
	},[])

	useEffect(()=>{
		if (lastMessage) {
			if(lastMessage.user==="bot"){
				if (lastMessage.label == "welcomeMessage"){
					sendBotMessage(realQuestions[0], "nameQuestion")
				}
				else if (lastMessage.label == "meetingMessage"){
					if(thirdFromLastMessage.label==="nameQuestion"){
						sendBotMessage(realQuestions[1], "priceQuestion")
					}

					else if(thirdFromLastMessage.label=="priceQuestion" || thirdFromLastMessage.label=="warningPriceMessage"){
						sendBotMessage(realQuestions[2], "childQuestion")
					}

					else if((thirdFromLastMessage.label=="childQuestion" || thirdFromLastMessage.label=="warningChildMessage")){
						if(convertPortugueseToBoolean(secondFromLastMessage.text)){
							sendBotMessage(realQuestions[3], "marryQuestion")
						}else{
							sendBotMessage(realQuestions[4], "useQuestion")
						}
					}

					else if((thirdFromLastMessage.label=="marryQuestion" || thirdFromLastMessage.label=="warningMarryMessage")){
						sendBotMessage(realQuestions[4], "useQuestion")
					}		
				}
			}else{
				if(secondFromLastMessage.label == "nameQuestion"){
					setName(lastMessage.text)
					sendBotMessage(interactionQuestions[0], "meetingMessage", message)
				}else if (secondFromLastMessage.label == "priceQuestion" || secondFromLastMessage.label =="warningPriceMessage"){
					if(isAnValidPrice(lastMessage.text)){
						setAnswers([...answers, lastMessage.text])
						sendBotMessage(interactionQuestions[1], "meetingMessage", message)
					}else{
						sendBotMessage("Entre com apenas números, por favor!", "warningPriceMessage", message)
					}
				}else if(secondFromLastMessage.label == "childQuestion" || secondFromLastMessage.label =="warningChildMessage"){
					if(validateYesOrNo(lastMessage.text)){
						setAnswers([...answers, convertPortugueseToBoolean(lastMessage.text)])
						sendBotMessage(interactionQuestions[2], "meetingMessage", message)
					}else{
						sendBotMessage("Hey, apenas sim ou não! Foi o nosso trato, lembra?!", "warningChildMessage", message)
					}
				}else if (secondFromLastMessage.label == "marryQuestion" || secondFromLastMessage.label =="warningMarryMessage"){
					if(validateYesOrNo(lastMessage.text)){
						setAnswers([...answers, convertPortugueseToBoolean(lastMessage.text)])
						sendBotMessage(interactionQuestions[3], "meetingMessage", message)
					}else{
						sendBotMessage("Hey, apenas sim ou não! Foi o nosso trato, lembra?!", "warningMarryMessage", message)
					}
				} else if (secondFromLastMessage.label == "useQuestion" || secondFromLastMessage.label =="warningUseMessage"){
					if(validateYesOrNo(lastMessage.text)){
						setAnswers([...answers, convertPortugueseToBoolean(lastMessage.text)])
						sendBotMessage(interactionQuestions[4], "meetingMessage", message)
					}else{
						sendBotMessage("Hey, apenas sim ou não! Foi o nosso trato, lembra?!", "warningUseMessage", message)
					}
				}

			}
		}
	}, [messages])



	const isAnValidPrice = (value) =>{
		if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
	    return true;
	  return false;
	}

	
	const validateYesOrNo = (value) => {
		if(possibleNo.includes(value.toLowerCase()) || possibleYes.includes(value.toLowerCase()) ){
			return true
		}
		return false
	}
	
	const convertPortugueseToBoolean = (portugueseValue) => {
		if( possibleYes.includes(portugueseValue.toLowerCase())){
			return true
		}
		return false
	}

	console.log(answers)

	const sendMessage = (event) => {
		event.preventDefault()

		if(message){
			setMessages([...messages, {"user":"client", "label": "clientMessage", "text": message}])
			setMessage("")
		}
	}

	return (
		<div className="outerContainer">
			<div className="container">
				{/*<Card />*/}
				<Messages name={name} messages={messages}/>

				<Input message={message} setMessage={setMessage} sendMessage={sendMessage}/> 
			</div>
			{/*<TextContainer/>*/}
		</div>
	)
}


export default Chat;