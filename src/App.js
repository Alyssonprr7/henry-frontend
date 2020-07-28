import React from 'react'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import Chat from './components/Chat/Chat'

const App = () => ( //Como está com parenteses, ele já é o retorno
	<Router>
		<Route path ="/" component={Chat} />
	</Router>

);


export default App