import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'

import Home from './pages/home'
import AcheVideo from './pages/ache_video'
import AcheImage from './pages/ache_image'
import About from './pages/about'

import Member from './pages/admin/member'
import Post from './pages/admin/post'
import Write from './pages/admin/write'

import ResponsiveContainer from './components/ResponsiveContainer'

import 'semantic-ui-css/semantic.min.css'
import './styles/global.less'

const App = () => (
	<Router history={history}>
		<Switch>
			<ResponsiveContainer>
				<Route exact path="/" component={Home}/>
				<Route exact path="/ache-image" component={AcheImage}/>
				<Route exact path="/ache-video" component={AcheVideo}/>
				<Route exact path="/about" component={About}/>
			</ResponsiveContainer>

			<Route path='/admin' render={() =>
				<Switch>
					<Route path='/admin/member' component={Member}/>
					<Route path='/admin/post' component={Post}/>
					<Route path='/admin/write' component={Write}/>
				</Switch>
			}/>
		</Switch>
	</Router>
)

export default App
