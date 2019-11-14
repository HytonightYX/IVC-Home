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
import { HashRouter as Router, Route, Switch } from 'react-router-dom'


import 'semantic-ui-css/semantic.min.css'
import './styles/global.less'

import Home from './pages/home'
import Ache from './pages/ache'


import TopMenu from './components/TopNav'

const getWidth = () => {
	const isSSR = typeof window === 'undefined'

	return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({mobile}) => (
	<Container text className="m-head">
		<Header
			as='h1'
			inverted
			icon
			style={{
				fontSize: mobile ? '2em' : '4em',
				fontWeight: 'normal',
				marginBottom: 0,
				marginTop: mobile ? '1.5em' : '3em',
				background: '#1c1b1c'
			}}
			className="team-name"
		>智能视频编码课题组</Header>

		<Header
			as='h2'
			inverted
			icon
			content='Intelligent Video Compression'
			style={{
				fontSize: mobile ? '1.5em' : '1.7em',
				fontWeight: 'normal',
				marginTop: '10px',
				marginBottom: '3em',
				background: '#1c1b1c',
				display: 'block'
			}}
		/>
		<Button size='huge inverted download'>
			成果展示
		</Button>

		<Button size='huge inverted basic'>
			关于我们
		</Button>

	</Container>
)

const TopNav = ({fixed}) => (
	<Segment
		inverted
		textAlign='center'
		style={{minHeight: 700, padding: '1em 0em'}}
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

				<Segment inverted vertical style={{ padding: '5em 0em' }}>
					<Container>
						<Grid divided inverted stackable>
							<Grid.Row>
								<Grid.Column width={3}>
									<Header inverted as='h4' content='About' />
									<List link inverted>
										<List.Item as='a'>Sitemap</List.Item>
										<List.Item as='a'>Contact Us</List.Item>
										<List.Item as='a'>Religious Ceremonies</List.Item>
										<List.Item as='a'>Gazebo Plans</List.Item>
									</List>
								</Grid.Column>
								<Grid.Column width={3}>
									<Header inverted as='h4' content='Services' />
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
					<Menu.Item as='a' active>
						Home
					</Menu.Item>
					<Menu.Item as='a'>Work</Menu.Item>
					<Menu.Item as='a'>Company</Menu.Item>
					<Menu.Item as='a'>Careers</Menu.Item>
					<Menu.Item as='a'>Log in</Menu.Item>
					<Menu.Item as='a'>Sign Up</Menu.Item>
				</Sidebar>

				<Sidebar.Pusher dimmed={sidebarOpened}>
					<Segment
						inverted
						textAlign='center'
						style={{minHeight: 350, padding: '1em 0em'}}
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
	<ResponsiveContainer classNam="g-home">
		<Router>
			<Switch>
				<Route exact path="/" component={() => <Home/>} />
				<Route exact path="/achievement" component={() => <Ache />} />
			</Switch>
		</Router>
	</ResponsiveContainer>
)

export default App
