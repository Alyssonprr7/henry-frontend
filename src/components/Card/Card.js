import React, {useState,useEffect} from 'react'
import Image from "../../icons/car_test.jpg"
import "./Card.css"



const Card = () => {
	return(
		<div className="card-container">
			<div className="card-content">
				<img src={Image} width={"40%"} height={"80%"}/>
				<div className="attributes">
					<div className = "brandModelVersion">
						<p className="brandModel"> VOLKSWAGEN CROSSFOX</p>
						<p className="version">1.6 MSI PEPPER 16V</p>
					</div>
					<p className="price">R$ 39.000</p>
				</div>
			</div>
			
			
		</div>
	)
}



export default Card