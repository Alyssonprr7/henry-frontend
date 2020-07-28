import React from 'react'
import onlineIcon from '../../icons/onlineIcon.png'
import closeIcon from '../../icons/closeIcon.png'

import "./Infobar.css"


const Infobar = () => (
	<div className="infoBar">
		<div className="leftInnerContainer">
			<img className="onlineIcon" src={onlineIcon} alt="online" />
			<h3>room</h3>
		</div>
		<div className="rightInnerContainer">
			<img src={closeIcon}alt="close"/>
		</div>	 
	</div>
)


export default Infobar