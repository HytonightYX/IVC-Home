import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import 'moment/locale/zh-cn'

import injects from './store'
import App from './App'

import './less/global.less'
import './less/variables.less';

configure({enforceActions: 'observed'})

ReactDOM.render(
	<Provider {...injects}>
		<App/>
	</Provider>,
	document.getElementById('root')
)
