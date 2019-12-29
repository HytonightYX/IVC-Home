import React from 'react'
import { HashRouter as Router, Link, Route, Switch, withRouter } from 'react-router-dom'
import Home from './pages/home'
import AcheVideo from './pages/ache_video'
import AcheImage from './pages/ache_image'
import About from './pages/about'

import ResponsiveContainer from './components/ResponsiveContainer'

import 'semantic-ui-css/semantic.min.css'
import './styles/global.less'

const App = () => (
	<Router>
		<Switch>
			<ResponsiveContainer>
				<Route exact path="/" component={() => <Home/>}/>
				<Route exact path="/ache-image" component={AcheImage}/>
				<Route exact path="/ache-video" component={AcheVideo}/>
				<Route exact path="/about" component={About}/>
			</ResponsiveContainer>
		</Switch>
	</Router>
)

export default App
