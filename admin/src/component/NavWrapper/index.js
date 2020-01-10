import React from 'react'
import { Layout, Row, Col, Drawer, Dropdown, Icon, Menu, Avatar, BackTop, Button, Badge } from 'antd'
import './index.less'
import { navIconList } from '@constant/data'
import { MENU_MAIN } from '@constant/data'
import { Link, NavLink } from 'react-router-dom'
import FullScreen from '../FullScreen'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'

const {Header, Sider, Content} = Layout
const {SubMenu} = Menu

@inject('userStore')
@observer
class NavWrapper extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active: 0,
			collapsed: false,
		}
	}

	@computed
	get currUser() {
		return this.props.userStore.currUser
	}

	recursion = (dataSource) => {
		return (
			dataSource.map((menu) => {
				if (menu.children) {
					return (
						<SubMenu key={'menu-' + menu.title} title={
							<span>
                <Icon type={menu.icon}/>
                <span>{menu.title}</span>
              </span>
						}>
							{this.recursion(menu.children)}
						</SubMenu>
					)
				} else {
					return (
						<Menu.Item key={menu.path}>
							<Link to={menu.path}>
								<Icon type={menu.icon}/>
								<span>{menu.title}</span>
							</Link>
						</Menu.Item>
					)
				}
			})
		)
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		})
	}

	render() {
		const {collapsed} = this.state

		const DropdownList = (
			<Menu className="drop-list">
				<Menu.Item key="user">
					<Icon type="user"/>
					管理员
				</Menu.Item>
				<Menu.Item key="logout" onClick={this.props.userStore.logout}>
					<Icon type="logout"/>
					退出登录
				</Menu.Item>
			</Menu>
		)

		return (
			<Layout className="g-menu">
				<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
					<div className="m-logo">{collapsed ? <Icon type='read'/> : <span><Icon type='read' style={{marginRight: 5}}/>图书后台管理</span>}</div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
						{this.recursion(MENU_MAIN)}
					</Menu>
				</Sider>
				<Layout>
					<Header style={{background: '#fff', padding: 0}} className="m-header">
						<Icon
							className="trigger"
							type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.toggle}
						/>

						<div className="header-right">
							<div className="full-screen">
								<FullScreen />
							</div>
							<div className="setting">
								<Icon style={{fontSize: '21px', cursor: 'pointer'}} type="setting" onClick={this.setting}/>
							</div>
							<div className="news-wrap">
								<Badge count={3}>
									<Icon style={{fontSize: '21px', cursor: 'pointer'}} type="bell" onClick={this.toNews}/>
								</Badge>
							</div>
							<div className="dropdown-wrap" id="dropdown-wrap" style={{cursor: 'pointer'}}>
								<Dropdown getPopupContainer={() => document.getElementById('dropdown-wrap')} overlay={DropdownList}>
									<div style={{paddingBottom: 10}}>
										<span style={{marginRight: 10}}>{this.currUser.name}</span>
										<Avatar src="https://semantic-ui.com/images/avatar2/large/matthew.png"/>
										<Icon style={{color: 'rgba(0,0,0,.3)', cursor: 'pointer'}} type="caret-down"/>
									</div>
								</Dropdown>
							</div>
						</div>
					</Header>
					<Content className="g-content">
						{this.props.children}
					</Content>
				</Layout>
			</Layout>
		)
	}
}

export default NavWrapper
