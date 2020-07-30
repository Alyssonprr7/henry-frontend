import React from 'react'
import menuIcon from '../../icons/menu.png'
import commentIcon from '../../icons/comment.png'
import volantyIcon from '../../icons/volanty-logo.png'

import "./Infobar.css"


const Infobar = () => (
	<div className="infoBar">
		<img className="onlineIcon" src={menuIcon} width={35} height={35} alt="menu" />
		<img className="logo" src={volantyIcon} width={120} height={35}  />
		<img src={commentIcon} alt="close" width={35} height={35}/>

	</div>
)


export default Infobar