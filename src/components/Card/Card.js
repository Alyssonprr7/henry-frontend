import React from 'react'
import "./Card.css"



const Card = ({data:{brand, model, year, version, img, price, link}}) => {
	return(
		<div className="card-container">
			<div className="card-content">
				<img src={img} width={"40%"} height={"80%"} alt="car"/>
				<div className="attributes">
					<div className = "brandModelVersion">
						<p className="brandModel"> {brand} {model}</p>
						<p className="version">{version} | {year}</p>
					</div>
					<div className="valueMore">
						<p className="price"> R${(price.value).toLocaleString('pt-BR')}</p>
						<button onClick={(event) => {window.open(link, "_blank")}}> SAIBA MAIS</button>
					</div>
				</div>
			</div>
		</div>
	)
}



export default Card