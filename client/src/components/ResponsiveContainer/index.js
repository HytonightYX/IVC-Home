import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility } from 'semantic-ui-react'
import IVC_LOGO from '../../assert/IVC_LOGO.png'
import { MENU } from '../../constant/config'
import HomeCarousel from '../HomeCarousel'
import TopMenu from '../TopMenu'

const getWidth = () => {
	const isSSR = typeof window === 'undefined'
	return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const TopNav = withRouter(({fixed, location}) => (
	<Segment
		textAlign='center'
		style={{
			padding: 0
		}}
		vertical
	>
		<TopMenu fixed={fixed}/>
	</Segment>
))

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
									<Header inverted as='h4' content='About' style={{background: '#1c1b1c',}}/>
									<List link inverted>
										<List.Item as='a'>Sitemap</List.Item>
										<List.Item as='a'>Contact Us</List.Item>
										<List.Item as='a'>Religious Ceremonies</List.Item>
										<List.Item as='a'>Gazebo Plans</List.Item>
									</List>
								</Grid.Column>
								<Grid.Column width={3}>
									<Header inverted as='h4' content='Services' style={{background: '#1c1b1c',}}/>
									<List link inverted>
										<List.Item as='a'>Banana Pre-Order</List.Item>
										<List.Item as='a'>DNA FAQ</List.Item>
										<List.Item as='a'>How To Access</List.Item>
										<List.Item as='a'>Favorite X-Men</List.Item>
									</List>
								</Grid.Column>
								<Grid.Column width={7}>
									<Header as='h4' inverted style={{background: '#1c1b1c',}}>
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
		const {pathname} = this.props.location
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
					{
						MENU.map((item) => (
							<Link to={item.path} key={item.name}>
								<Menu.Item active={pathname === item.path}>
									{item.name}
								</Menu.Item>
							</Link>
						))
					}
				</Sidebar>

				<Sidebar.Pusher dimmed={sidebarOpened}>
					<Segment
						inverted
						textAlign='center'
						style={{padding: '1em 0em'}}
						vertical
					>
						<Container>
							<Menu inverted pointing secondary size='large'>
								<Menu.Item onClick={this.handleToggle}>
									<Icon name='sidebar'/>
								</Menu.Item>
								<Menu.Item position='right' style={{padding: 0}}>
									<Image src={IVC_LOGO} size='mini'/>
								</Menu.Item>
							</Menu>
						</Container>
						<HomeCarousel mobile/>
					</Segment>

					{children}

				</Sidebar.Pusher>
			</Responsive>
		)
	}
}

MobileContainer = withRouter(MobileContainer)

export default ({children}) => (
	<div>
		<DesktopContainer>{children}</DesktopContainer>
		<MobileContainer>{children}</MobileContainer>
	</div>
)
