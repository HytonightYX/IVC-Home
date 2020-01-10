import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
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
								<Route exact path='/' component={Loadable({loader: () => import('./app/dashboard')})}/>
								<Route exact path='/book' component={Loadable({loader: () => import('./app/book')})}/>
								<Route exact path='/rental' component={Loadable({loader: () => import('./app/rental')})}/>
								<Route exact path='/overdue' component={Loadable({loader: () => import('./app/overdue')})}/>
								<Route exact path='/userinfo' component={Loadable({loader: () => import('./app/userinfo')})}/>
								<Route exact path='/auth' component={Loadable({loader: () => import('./app/auth')})}/>
								<Route exact path='/sysconfig' component={Loadable({loader: () => import('./app/sysconfig')})}/>
								<Route exact path='/err/304' component={Loadable({loader: () => import('./app/err/304')})}/>
								<Route component={Loadable({loader: () => import('./app/err/404')})} />
							</Switch>
						</NavWrapper>
					</div>
				</Auth>
			)}/>
		</Switch>
	</Router>
)
