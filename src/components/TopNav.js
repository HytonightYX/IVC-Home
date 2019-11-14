import { Container, Menu } from 'semantic-ui-react'
import IVC_LOGO from '../assert/IVC_LOGO.png'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { MENU } from '../constant/config'

const TopNav = withRouter(({fixed, location}) => {

	return (
		<Menu
			fixed={fixed ? 'top' : null}
			inverted={!fixed}
			pointing={!fixed}
			secondary={!fixed}
			size='large'
		>
			<Container>
				<Menu.Item position='left'>
					<img src={IVC_LOGO} alt=""/>
				</Menu.Item>
				{
					MENU.map((item) => (
						<Link to={item.path}>
							<Menu.Item as='a' key={item.name} active={location.pathname === item.path}>
								{item.name}
							</Menu.Item>
						</Link>
					))
				}
			</Container>
		</Menu>
	)
})

export default TopNav
