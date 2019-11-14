import { Container, Menu } from 'semantic-ui-react'
import IVC_LOGO from '../assert/IVC_LOGO.png'
import React from 'react'

const TopNav = ({fixed}) => (
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

			<Menu.Item as='a' active>
				主页
			</Menu.Item>
			<Menu.Item as='a'>成果</Menu.Item>
			<Menu.Item as='a'>联系我们</Menu.Item>
			<Menu.Item as='a'>关于我们</Menu.Item>
		</Container>
	</Menu>
)

export default TopNav
