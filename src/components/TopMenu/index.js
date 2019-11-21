import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import IVC_LOGO from '../../assert/IVC_LOGO.png'
import { MENU } from '../../constant/config'

const TopMenu = withRouter(({fixed, location}) => {

	return (
		<Menu
			fixed={fixed ? 'top' : null}
			inverted={!fixed}
			pointing={!fixed}
			secondary={!fixed}
			size='large'
		>
			<Container>
				<Menu.Item position='left m-logo'>
					<img src={IVC_LOGO} alt=""/>
				</Menu.Item>
				{
					MENU.map((item) => (
						<Link to={item.path} key={item.name}>
							<Menu.Item active={location.pathname === item.path}>
								{item.name}
							</Menu.Item>
						</Link>
					))
				}
			</Container>
		</Menu>
	)
})

export default TopMenu
