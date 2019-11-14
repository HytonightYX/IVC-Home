import React, { Component } from 'react'
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Visibility,
} from 'semantic-ui-react'
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './styles/global.less'

import HomepageHeading from './components/HomePageHeading'
import Home from './pages/home'
import Ache from './pages/ache'

import TopMenu from './components/TopNav'

const getWidth = () => {
	const isSSR = typeof window === 'undefined'

	return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


const TopNav = ({fixed}) => (
	<Segment
		inverted
		textAlign='center'
		style={{padding: '1em 0em 4em'}}
		vertical
	>
		<TopMenu fixed={fixed}/>

		<HomepageHeading/>

	</Segment>
)

class DesktopContainer extends Component {
	state = {}

	hideFixedMenu = () => this.setState({fixed: false})
	showFixedMenu = () => this.setState({fixed: true})

	render() {
		const {children} = this.props
		const {fixed} = this.state

		console.log(this.props)

		return (
			<Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
				<Visibility
					once={false}
					onBottomPassed={this.showFixedMenu}
					onBottomPassedReverse={this.hideFixedMenu}
				>
					<TopNav fixed={fixed}/>
				</Visibility>

				{children}

				<Segment inverted vertical style={{padding: '5em 0em'}}>
					<Container>
						<Grid divided inverted stackable>
							<Grid.Row>
								<Grid.Column width={3}>
									<Header inverted as='h4' content='About'/>
									<List link inverted>
										<List.Item as='a'>Sitemap</List.Item>
										<List.Item as='a'>Contact Us</List.Item>
										<List.Item as='a'>Religious Ceremonies</List.Item>
										<List.Item as='a'>Gazebo Plans</List.Item>
									</List>
								</Grid.Column>
								<Grid.Column width={3}>
									<Header inverted as='h4' content='Services'/>
									<List link inverted>
										<List.Item as='a'>Banana Pre-Order</List.Item>
										<List.Item as='a'>DNA FAQ</List.Item>
										<List.Item as='a'>How To Access</List.Item>
										<List.Item as='a'>Favorite X-Men</List.Item>
									</List>
								</Grid.Column>
								<Grid.Column width={7}>
									<Header as='h4' inverted>
										Footer Header
									</Header>
									<p>
										Extra space for a call to action inside the footer that could help re-engage users.
									</p>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Container>
				</Segment>
			</Responsive>
		)
	}
}

class MobileContainer extends Component {
	state = {}

	handleSidebarHide = () => this.setState({sidebarOpened: false})

	handleToggle = () => this.setState({sidebarOpened: true})

	render() {
		const {children} = this.props
		const {sidebarOpened} = this.state

		return (
			<Responsive
				as={Sidebar.Pushable}
				getWidth={getWidth}
				maxWidth={Responsive.onlyMobile.maxWidth}
			>
				<Sidebar
					as={Menu}
					animation='push'
					inverted
					onHide={this.handleSidebarHide}
					vertical
					visible={sidebarOpened}
				>
					<Menu.Item as='a' active>主页</Menu.Item>
					<Menu.Item as='a'>成果</Menu.Item>
					<Menu.Item as='a'>联系我们</Menu.Item>
					<Menu.Item as='a'>关于我们</Menu.Item>
				</Sidebar>

				<Sidebar.Pusher dimmed={sidebarOpened}>
					<Segment
						inverted
						textAlign='center'
						style={{ padding: '1em 0em'}}
						vertical
					>
						<Container>
							<Menu inverted pointing secondary size='large'>
								<Menu.Item onClick={this.handleToggle}>
									<Icon name='sidebar'/>
								</Menu.Item>
								<Menu.Item position='right'>
									<Button as='a' inverted>
										Log in
									</Button>
									<Button as='a' inverted style={{marginLeft: '0.5em'}}>
										Sign Up
									</Button>
								</Menu.Item>
							</Menu>
						</Container>
						<HomepageHeading mobile/>
					</Segment>

					{children}

				</Sidebar.Pusher>
			</Responsive>
		)
	}
}

const ResponsiveContainer = ({children}) => (
	<div>
		<DesktopContainer>{children}</DesktopContainer>
		<MobileContainer>{children}</MobileContainer>
	</div>
)

const App = () => (
	<Router>
		<Switch>
			<ResponsiveContainer classNam="g-home">
				<Route exact path="/" component={() => <Home/>}/>
				<Route exact path="/achievement" component={() => <Ache/>}/>
			</ResponsiveContainer>
		</Switch>
	</Router>
)

export default App
