import { Provider } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'
import injects from './store'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	<Provider {...injects}>
		<App/>
	</Provider>,
	document.getElementById('root'))

serviceWorker.unregister()
