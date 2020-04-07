import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'

import Home from './pages/home'
import AcheVideo from './pages/ache_video'
import AcheImage from './pages/ache_image'
import About from './pages/about'
import Post from './pages/post'

import ResponsiveContainer from './components/ResponsiveContainer'

import './styles/global.less'

const App = () => (
	<Router history={history}>
		<ResponsiveContainer>
			<Route exact path="/" component={Home} />
			<Route exact path="/ache-image" component={AcheImage} />
			<Route exact path="/ache-video" component={AcheVideo} />
			<Route exact path="/about" component={About} />
			<Route exact path="/post/:id" component={Post} />
		</ResponsiveContainer>
	</Router>
)

export default App
