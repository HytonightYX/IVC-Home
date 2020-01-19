import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router'

import Loadable from './component/Loadable'
import Auth from './component/Auth'
import NavWrapper from './component/NavWrapper'

export default () => (
	<Router>
		<Switch>
			<Route exact path='/login' component={Loadable({loader: () => import('./app/login')})}/>
			<Route path='/' render={() => (
				<Auth>
					<div className='app-root'>
						<NavWrapper>
							<Switch>
								<Route exact path='/' component={Loadable({loader: () => import('./app/member')})}/>
								<Route exact path='/post' component={Loadable({loader: () => import('./app/post')})}/>
								<Route exact path='/write' component={Loadable({loader: () => import('./app/write')})}/>
								<Route exact path='/err/304' component={Loadable({loader: () => import('./app/err/304')})}/>
								<Route component={Loadable({loader: () => import('./app/err/404')})}/>
							</Switch>
						</NavWrapper>
					</div>
				</Auth>
			)}/>
		</Switch>
	</Router>
)
