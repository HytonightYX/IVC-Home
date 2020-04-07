import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import IVC_LOGO from '../../assert/64x64.png'
import { MENU } from '../../constant/config'

const TopMenu = withRouter(({ fixed, location }) => {
	return (
		<Menu
			inverted
			pointing={!fixed}
			secondary={!fixed}
			size='large'
			style={{ background: '#1c1b1c', padding: '5px' }}
		>
			<Container>
				<Menu.Item position='left' className="m-logo">
					<img src={IVC_LOGO} alt="" />
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
