import React, {useState,useEffect} from 'react'
import axios from 'axios'

import "./Chat.css"

import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

//TODO 
//Volanty no começo
//Responsividade
//Rever perguntas
//Não deixar enviar se a ultima pessoa que enviou foi typing
//Nao pergunta se quer confirmar preço se errar primeiro 
//Pergunta repetida na hora da confirmacao

const Chat = () => {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [answers, setAnswers] = useState([])
	const [price, setPrice] = useState(44000)
	const [finishQuestions, setFinishQuestions] = useState(false)
	const [rater, setRater] = useState(0)
	const [avaibleCars, setAvaibleCars] = useState()
	const [submitRate, setSubmitRate] = useState(false)
	const [data, setData] = useState([])

	const interactionQuestions = [`Ótimo, é um prazer falar com você!`,
	 `Beleza ${name}, esse é um bom valor para começar meus cálculos!`,
	 "Ótimo, esssa informação é importante", 
	 "Show, eu precisava muito dessa sua resposta, UFA!", 
	 "E lá vamos nós pra última pergunta!", 
	 "Ok, isso é suficiente! Estou selecionando o melhor carro pra você, aguarde um instante.",
	 "Ok, vou dar uma olhada em nosso estoque, só um minuto"]

	 const questions =  {
	 	"nameQuestion": "Como eu posso te chamar?", 
	 	"priceQuestion": `${name}, qual é a média de preço que você está procurando em um carro? Digite apenas o número, por favor...`,
	 	"anotherPriceQuestion": "Sem problemas, vamos de novo. Qual é o valor aproximado que deseja gastar?",
 		"confirmPriceQuestion":`Temos ${avaibleCars} carros nessa faixa de preço, deseja prosseguir?`,
	 	"childQuestion":`Vamos lá, agora eu peço pra que responda as perguntas seguintes somente com sim ou não.\n Você tem filhos, ${name}?`,
 		"marryQuestion":"Você é casado?",
 		"useQuestion":`${name}, você usará o carro diariamente?`,
 		"tripQuestion": "Vai usar o carro pra viajar frequentemente?"
	 }



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
				if (lastMessage.label === "welcomeMessage"){
					sendBotMessage(questions.nameQuestion, "nameQuestion")
				}
				else if (lastMessage.label === "meetingMessage"){
					if(thirdFromLastMessage.label==="nameQuestion"){
						sendBotMessage(questions.priceQuestion, "priceQuestion")
					}

					else if(thirdFromLastMessage.label==="priceQuestion" || thirdFromLastMessage.label==="warningPriceMessage"){
						sendBotMessage(questions.confirmPriceQuestion, "confirmPriceQuestion")
					}

					else if(thirdFromLastMessage.label==="confirmPriceQuestion" || thirdFromLastMessage.label==="warningConfirmPriceMessage"){
						sendBotMessage(questions.childQuestion, "childQuestion")
					}

					else if((thirdFromLastMessage.label==="childQuestion" || thirdFromLastMessage.label==="warningChildMessage")){
						if(convertPortugueseToBoolean(secondFromLastMessage.text)){
							sendBotMessage(questions.marryQuestion, "marryQuestion")
						}else{
							sendBotMessage(questions.useQuestion, "useQuestion")
						}
					}

					else if((thirdFromLastMessage.label==="marryQuestion" || thirdFromLastMessage.label==="warningMarryMessage")){
						sendBotMessage(questions.useQuestion, "useQuestion")
					}
					else if((thirdFromLastMessage.label==="useQuestion" || thirdFromLastMessage.label==="warningUseMessage")){
						sendBotMessage(questions.tripQuestion, "tripQuestion")
					}		
				}else if (lastMessage.label === "beforePreResultsMessage"){
					sendBotMessage(`Voilà, encontramos esses carros que dão match exato com você! Aproveite e avalie as escolhas ;)`, "preResultsMessage")
				}
				else if (lastMessage.label === "preResultsMessage"){
					setFinishQuestions(true)
				}

			}else{
				if(secondFromLastMessage.label === "nameQuestion"){
					setName(lastMessage.text)
					sendBotMessage(interactionQuestions[0], "meetingMessage", message)
				}else if (secondFromLastMessage.label === "priceQuestion" || secondFromLastMessage.label ==="warningPriceMessage"){
					if(isAnValidPrice(lastMessage.text)){
						setPrice(lastMessage.text)
						sendBotMessage(interactionQuestions[6], "meetingMessage", message)
					}else{
						sendBotMessage("Entre com apenas números, por favor!", "warningPriceMessage", message)
					}

				}else if (secondFromLastMessage.label === "confirmPriceQuestion" || secondFromLastMessage.label ==="warningConfirmPriceMessage"){
					if(validateYesOrNo(lastMessage.text)){
						if(convertPortugueseToBoolean(lastMessage.text)){
							sendBotMessage(interactionQuestions[1], "meetingMessage", message)

						} else{
							sendBotMessage(questions.anotherPriceQuestion, "priceQuestion")
						}
						

					}else{
						sendBotMessage("Entre com apenas números, por favor!", "warningConfirmPriceMessage", message)
					}

				}else if(secondFromLastMessage.label === "childQuestion" || secondFromLastMessage.label ==="warningChildMessage"){
					if(validateYesOrNo(lastMessage.text)){
						setAnswers([...answers, convertPortugueseToBoolean(lastMessage.text)])
						sendBotMessage(interactionQuestions[2], "meetingMessage", message)
					}else{
						sendBotMessage("Hey, apenas sim ou não! Foi o nosso trato, lembra?!", "warningChildMessage", message)
					}
				}else if (secondFromLastMessage.label === "marryQuestion" || secondFromLastMessage.label ==="warningMarryMessage"){
					if(validateYesOrNo(lastMessage.text)){
						setAnswers([...answers, convertPortugueseToBoolean(lastMessage.text)])
						sendBotMessage(interactionQuestions[3], "meetingMessage", message)
					}else{
						sendBotMessage("Hey, apenas sim ou não! Foi o nosso trato, lembra?!", "warningMarryMessage", message)
					}
				} else if (secondFromLastMessage.label === "useQuestion" || secondFromLastMessage.label ==="warningUseMessage"){
					if(validateYesOrNo(lastMessage.text)){
						setAnswers([...answers, convertPortugueseToBoolean(lastMessage.text)])
						sendBotMessage(interactionQuestions[4], "meetingMessage", message)
					}else{
						sendBotMessage("Hey, apenas sim ou não! Foi o nosso trato, lembra?!", "warningUseMessage", message)
					}
				} else if (secondFromLastMessage.label === "tripQuestion" || secondFromLastMessage.label ==="warningTripMessage"){
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

	useEffect(() =>{
		const fetchAvaibleCars = async () => {
			const response = await 
			axios.get(`https://henry-backend-volanty.herokuapp.com/checkprice?price=${price}`)
			setAvaibleCars(response.data)
		}

		fetchAvaibleCars()

	}, [price])


	useEffect(()=>{
		const fetchData = async () =>{
			if(answers.length === 3){
				const response = await
				axios.get(`https://henry-backend-volanty.herokuapp.com/carspec?answers=${capitalize(String(answers[0]))},${capitalize(String(answers[1]))},${capitalize(String(answers[2]))}&price=${price}`)
				setData(response.data)
				
			}else{
				const response = await
				axios.get(`https://henry-backend-volanty.herokuapp.com/carspec?answers=${capitalize(String(answers[0]))},${capitalize(String(answers[1]))},${capitalize(String(answers[2]))},${capitalize(String(answers[3]))}&price=${price}`)
				setData(response.data)
			}
		}

		fetchData()

	},[finishQuestions])


	const capitalize = (s) => {
	  if (typeof s !== 'string') return ''
	  return s.charAt(0).toUpperCase() + s.slice(1)
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

	const sendMessage = (event) => {
		event.preventDefault()
		if(message){
			if(lastMessage.label!=="typing" && lastMessage.label!=="meetingMessage" && lastMessage.label!=="welcomeMessage"){
				setMessages([...messages, {"user":"client", "label": "clientMessage", "text": message}])
				setMessage("")
			}
			
		}
	}

	const apiRater = async() =>{
		let married
		let children
		let travel
		let dailyUse
		let carsIds = ""
		data.map(car=> carsIds += `${car.id},`)

		if(answers.lenght === 3){
			children= capitalize(String(answers[0]))
			dailyUse= capitalize(String(answers[1]))
			travel = capitalize(String(answers[2]))
			await axios.post(`https://henry-backend-volanty.herokuapp.com/users?children=${children}&travel=${travel}&dailyUse=${dailyUse}&rating=${rater}&cars=${carsIds.slice(0,-1)}`) 
		}else{
			children= capitalize(String(answers[0]))
			married= capitalize(String(answers[1]))
			dailyUse= capitalize(String(answers[2]))
			travel = capitalize(String(answers[3]))
			await axios.post(`https://henry-backend-volanty.herokuapp.com/users?married=${married}&children=${children}&travel=${travel}&dailyUse=${dailyUse}&rating=${rater}&cars=${carsIds.slice(0,-1)}`) 
		}

		setSubmitRate(true)
	}

	return (
		<div className="outerContainer">
			<div className="container">
				<Infobar />
				<Messages name={name} messages={messages} finishQuestions={finishQuestions} cardData={data}/>
				<Input message={message}
				setMessage={setMessage} 
				sendMessage={sendMessage} 
				setRater={setRater} 
				apiRater={apiRater} 
				finishQuestions={finishQuestions}
				submitRate={submitRate} /> 
			</div>
			{/*<TextContainer/>*/}
		</div>
	)
}


export default Chat;