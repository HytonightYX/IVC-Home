import React from 'react'
import { Form, Tree, Table, Input, Button, Skeleton, Modal, Tag, Divider, message, Card, Row, Col, Select, DatePicker, Drawer, Spin, Icon, Transfer } from 'antd'
import { inject, observer } from 'mobx-react'
const {Option} = Select
const {TreeNode} = Tree

import './index.less'

@inject('userStore')
@observer
class AuthPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			visAddRole: false,
			visRoleConf: false,
			visUserConf: false,
		}
	}

	role_list = [
		{role_id: '001', role_name: '管理员', role_code: 'ADMIN', status: true, create_time: '2019-11-11'},
		{role_id: '002', role_name: '普通用户', role_code: 'DEFAULT', status: true, create_time: '2019-11-11'},
		{role_id: '003', role_name: '采购员', role_code: 'BUYER', status: false, create_time: '2019-11-11'},
	]

	closeModal = () => {
		this.setState({
			visAddRole: false,
			visRoleConf: false,
			visUserConf: false
		})
	}

	render() {
		const {loading} = this.state
		console.log(this.state)
		const columns = [
			{
				title: '角色ID',
				dataIndex: 'role_id',
			}, {
				title: '角色名称',
				dataIndex: 'role_name',
			}, {
				title: '角色编码',
				dataIndex: 'role_code',
			}, {
				title: '创建时间',
				dataIndex: 'create_time',
			}, {
				title: '状态',
				dataIndex: 'status',
				render: t => {
					if (t) return <Tag color="green">启用</Tag>
					else return <Tag color="red">停用</Tag>
				}
			}, {
				title: '功能',
				key: 'action',
				render: (text, record) => (
					<div className="m-fun">
						<Button size='small' className="m-blue">{record.status ? '停用' : '启用'}</Button>
						<Button type='primary' size='small' className="m-blue"
						        onClick={() => this.setState({visRoleConf: true})}>权限设置</Button>
						<Button type='primary' size='small' className="m-blue"
						        onClick={() => this.setState({visUserConf: true})}>分配用户</Button>
					</div>
				),
			}
		]

		return (
			<div className='g-content-sub'>
				<div className="m-userlist">

					<Spin
						tip="加载中"
						spinning={loading}
						indicator={<Icon type="loading" style={{fontSize: 24}} spin/>}
					>
						<Button type='primary' style={{marginBottom: 10}} onClick={() => this.setState({visAddRole: true})}>新建角色</Button>
						<Table size='small' dataSource={this.role_list} columns={columns} rowKey={item => item.role_id}/>
					</Spin>
				</div>

				<Modal
					title="创建角色"
					visible={this.state.visAddRole}
					onOk={this.closeModal}
					onCancel={() => {
						this.setState({
							visAddRole: false
						})
					}}
				>
					<RoleForm />
				</Modal>

				<Modal
					title="权限设置"
					visible={this.state.visRoleConf}
					width={600}
					onOk={this.closeModal}
					onCancel={() => {
						this.setState({
							visRoleConf: false
						})
					}}>
					<PermEditForm />
				</Modal>

				<Modal
					title="用户授权"
					visible={this.state.visUserConf}
					width={800}
					onOk={this.closeModal}
					onCancel={() => {
						this.setState({
							visUserConf: false
						})
					}}>
					<RoleAuthForm/>
				</Modal>

			</div>
		)
	}
}

// 角色创建
class RoleForm extends React.Component {

	render() {
		const {getFieldDecorator} = this.props.form
		const formItemLayout = {
			labelCol: {span: 5},
			wrapperCol: {span: 16}
		}
		return (
			<Form layout="horizontal">
				<Form.Item label="角色名称" {...formItemLayout}>
					{
						getFieldDecorator('role_name', {
							initialValue: ''
						})(
							<Input type="text" placeholder="请输入角色名称"/>
						)
					}
				</Form.Item>
				<Form.Item label="状态" {...formItemLayout}>
					{
						getFieldDecorator('state', {
							initialValue: 1
						})(
							<Select>
								<Option value={1}>开启</Option>
								<Option value={0}>关闭</Option>
							</Select>
						)}
				</Form.Item>
			</Form>
		)
	}
}

RoleForm = Form.create({})(RoleForm)

// 设置权限
class PermEditForm extends React.Component {


	render() {
		const {getFieldDecorator} = this.props.form
		const formItemLayout = {
			labelCol: {span: 5},
			wrapperCol: {span: 18}
		}

		return (
			<Form layout="horizontal">
				<Form.Item label="角色名称：" {...formItemLayout}>
					<Input disabled defaultValue='测试角色1'/>
				</Form.Item>

				<Form.Item label="权限：" {...formItemLayout}>
					<Tree
						checkable
						defaultExpandedKeys={['0-0-0', '0-0-1']}
						defaultSelectedKeys={['0-0-0', '0-0-1']}
						defaultCheckedKeys={['0-0-0', '0-0-1']}
						onSelect={this.onSelect}
						onCheck={this.onCheck}
					>
						<TreeNode title="菜单" key="0">

							<TreeNode title="图书管理" key="0-0">
								<TreeNode title="库存管理" key="0-0-0"/>
								<TreeNode title="借阅管理" key="0-0-1" />
							</TreeNode>

							<TreeNode title="用户管理" key="0-1">
								<TreeNode title='用户列表' key="0-1-0" />
								<TreeNode title='超期罚款' key="0-1-1" />
							</TreeNode>

							<TreeNode title="权限设置" key="0-2" />
							<TreeNode title="系统设置" key="0-3" />

						</TreeNode>
					</Tree>
				</Form.Item>
			</Form>
		)
	}
}

PermEditForm = Form.create({})(PermEditForm)

// 用户授权
class RoleAuthForm extends React.Component {
	state = {
		mockData: [],
		targetKeys: [],
	}

	componentDidMount() {
		this.getMock()
	}

	getMock = () => {
		const targetKeys = []
		const mockData = []
		for (let i = 0; i < 20; i++) {
			const data = {
				key: i.toString(),
				title: `用户 ${i + 1}`,
				chosen: Math.random() * 2 > 1,
			}
			if (data.chosen) {
				targetKeys.push(data.key)
			}
			mockData.push(data)
		}
		this.setState({mockData, targetKeys})
	}

	handleChange = targetKeys => {
		this.setState({targetKeys})
	}

	renderFooter = () => (
		<Button size="small" style={{float: 'right', margin: 5}} onClick={this.getMock}>
			重新加载
		</Button>
	)

	render() {
		const formItemLayout = {
			labelCol: {span: 5},
			wrapperCol: {span: 18}
		}

		return (

			<Form layout="horizontal" {...formItemLayout}>
				<Form.Item label="角色名称：">
					<Input disabled maxLength={8} defaultValue='角色001'/>
				</Form.Item>

				<Form.Item label="选择用户：" {...formItemLayout}>
					<Transfer
						dataSource={this.state.mockData}
						showSearch
						listStyle={{
							width: 230,
							height: 400,
						}}
						operations={['加入', '移出']}
						targetKeys={this.state.targetKeys}
						onChange={this.handleChange}
						render={item => `${item.title}`}
						footer={this.renderFooter}
					/>
				</Form.Item>
			</Form>
		)
	}
}

RoleAuthForm = Form.create({})(RoleAuthForm)


export default AuthPage
