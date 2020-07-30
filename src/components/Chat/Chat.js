import React, {useState,useEffect} from 'react'

import "./Chat.css"

import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'
import Card from '../Card/Card'

//TODO adicionar pergunta 
//Lógica das perguntas sobre o preço
//Volanty no começo
//Responsividade
//Rever perguntas
//Não deixar enviar se a ultima pessoa que enviou foi typing



const Chat = () => {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [answers, setAnswers] = useState([])
	const [price, setPrice] = useState()
	const [finishQuestions, setFinishQuestions] = useState(false)
	const [numbersOfCars, setNumberOfCars] = useState()

	const interactionQuestions = [`Ótimo, é um prazer falar com você!`,
	 `Beleza ${name}, esse é um bom valor para começar meus cálculos!`,
	 "Ótimo, esssa informação é importante", "Show, eu precisava muito dessa sua resposta, UFA!", "E lá vamos nós pra última pergunta!", "Ok, isso é suficiente! Estou selecionando o melhor carro pra você, aguarde um instante."]

	 const questions =  {
	 	"nameQuestion": "Como eu posso te chamar?", 
	 	"priceQuestion": `${name}, qual é a média de preço que você está procurando em um carro? Digite apenas o número, por favor...`,
 		"confirmPriceQuestion":`Temos ${numbersOfCars} carros, deseja prosseguir?`,
	 	"childQuestion":`Vamos lá, agora eu peço pra que responda as perguntas seguintes somente com sim ou não.\n Você tem filhos, ${name}?`,
 		"marryQuestion":"Você é casado?",
 		"useQuestion":`${name}, você usará o carro diariamente?`,
 		"tripQuestion": "Vai usar o carro pra viajar frequentemente?"
	 }



	const possibleNo = ["nao", "não", "n", "no"] 
	const possibleYes = ["sim", "s", "yes"]

	let data = [
  {
    "brand": "Volkswagen",
    "model": "Fox",
    "year": 2018,
    "version": "ALGUMA COISA AI",
    "img":"https://img.volanty.com/zoom/inspecao/6082321945985024/20190213/1550071234198.jpg",
    "price": 39000,
    "link": "https://www.volanty.com/comprar/volkswagen/fox/6082321945985024/volkswagen-fox-1.0-mi-silverfox-8v-flex-4p-manual-91090km.html?utm_volanty=search"
  },
  {
    "brand": "Fiat",
    "model": "Uno",
    "year": 2019,
    "version": "OUTRA COISA AI",
    "img":"https://img.volanty.com/zoom/inspecao/6141186370699264/20191007/1570471591924.jpg",
    "price": 29000,
    "link": "https://www.volanty.com/comprar/fiat/uno/6141186370699264/fiat-uno-1.0-evo-vivace-8v-flex-4p-manual-84944km.html?utm_volanty=search"
  },
  {
    "brand": "Renault",
    "model": "Kwid",
    "year": 2020,
    "version": "MAIS UMA COISA AI",
    "img":"https://img.volanty.com/zoom/inspecao/4929857676902400/20200307/1583601609455.jpg",
    "price": 69000,
    "link": "https://www.volanty.com/comprar/renault/kwid/4929857676902400/renault-kwid-1.0-12v-sce-flex-zen-manual-28539km.html?utm_volanty=search"
  }
]


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
					sendBotMessage(questions.nameQuestion, "nameQuestion")
				}
				else if (lastMessage.label == "meetingMessage"){
					if(thirdFromLastMessage.label==="nameQuestion"){
						sendBotMessage(questions.priceQuestion, "priceQuestion")
					}

					else if(thirdFromLastMessage.label=="priceQuestion" || thirdFromLastMessage.label=="warningPriceMessage"){
						sendBotMessage(questions.confirmPriceQuestion, "confirmPriceQuestion")
					}

					else if(thirdFromLastMessage.label=="confirmPriceQuestion" || thirdFromLastMessage.label=="warningConfirmPriceMessage"){
						sendBotMessage(questions.childQuestion, "childQuestion")
					}

					else if((thirdFromLastMessage.label=="childQuestion" || thirdFromLastMessage.label=="warningChildMessage")){
						if(convertPortugueseToBoolean(secondFromLastMessage.text)){
							sendBotMessage(questions.marryQuestion, "marryQuestion")
						}else{
							sendBotMessage(questions.useQuestion, "useQuestion")
						}
					}

					else if((thirdFromLastMessage.label=="marryQuestion" || thirdFromLastMessage.label=="warningMarryMessage")){
						sendBotMessage(questions.useQuestion, "useQuestion")
					}
					else if((thirdFromLastMessage.label=="useQuestion" || thirdFromLastMessage.label=="warningUseMessage")){
						sendBotMessage(questions.tripQuestion, "tripQuestion")
					}		
				}else if (lastMessage.label == "beforePreResultsMessage"){
					sendBotMessage("Voilà, esses são os carros que dão match com você! Aproveite e avalie as escolhas ;)", "preResultsMessage")
				}
				else if (lastMessage.label == "preResultsMessage"){
					setFinishQuestions(true)
				}

			}else{
				if(secondFromLastMessage.label == "nameQuestion"){
					setName(lastMessage.text)
					sendBotMessage(interactionQuestions[0], "meetingMessage", message)
				}else if (secondFromLastMessage.label == "priceQuestion" || secondFromLastMessage.label =="warningConfirmPriceMessage"){
					if(isAnValidPrice(lastMessage.text)){
						setPrice(lastMessage.text)
						checkNumbersOfCars(lastMessage.text)

						sendBotMessage(interactionQuestions[1], "meetingMessage", message)
					}else{
						sendBotMessage("Entre com apenas números, por favor!", "warningConfirmPriceMessage", message)
					}

				}else if (secondFromLastMessage.label == "confirmPriceQuestion" || secondFromLastMessage.label =="warningPriceMessage"){
					if(validateYesOrNo(lastMessage.text)){
						if(convertPortugueseToBoolean(lastMessage.text)){
							sendBotMessage(interactionQuestions[1], "meetingMessage", message)

						} else{
							sendBotMessage(questions.priceQuestion, "priceQuestion")
						}
						

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
				} else if (secondFromLastMessage.label == "tripQuestion" || secondFromLastMessage.label =="warningTripMessage"){
					if(validateYesOrNo(lastMessage.text)){
						setAnswers([...answers, convertPortugueseToBoolean(lastMessage.text)])
						sendBotMessage(interactionQuestions[5], "beforePreResultsMessage", message)
					}else{
						sendBotMessage("Hey, apenas sim ou não! Foi o nosso trato, lembra?!", "warningTripMessage", message)
					}
				}

			}
		}
	}, [messages])




	const checkNumbersOfCars = (price) => {
		if(price < 30000){
			setNumberOfCars(10)
		}else{
			setNumberOfCars(20)
		}
		
	}




	if(lastMessage){
		console.log(lastMessage.label)
	}


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
				<Infobar />
				<Messages name={name} messages={messages} finishQuestions={finishQuestions} cardData={data}/>
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} finishQuestions={finishQuestions}/> 
			</div>
			{/*<TextContainer/>*/}
		</div>
	)
}


export default Chat;