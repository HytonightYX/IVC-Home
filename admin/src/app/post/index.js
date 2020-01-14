import React from 'react'
import { Form, Radio, Table, Input, Button, Modal, Tag, Select, Spin, Icon } from 'antd'
import { inject, observer } from 'mobx-react'

import './index.less'

@inject('userStore')
@observer
@Form.create()
class Post extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			search: false,
			visAddUser: false,
			members: []
		}
	}

	async componentDidMount() {
		this.setState({loading: true})
		const members = await this.props.userStore.listMember()
		this.setState({
			loading: false,
			members
		})
	}

	render() {
		const {members, loading} = this.state
		const {getFieldDecorator} = this.props.form
		const formItemLayout = {
			labelCol: {span: 5},
			wrapperCol: {span: 16}
		}
		const columns = [
			{
				title: '姓名',
				dataIndex: 'name',
				width: 150
			}, {
				title: '标签',
				dataIndex: 'tag',
				render: (text) => <Tag color="#108ee9">{text}</Tag>
			}, {
				title: '简介',
				dataIndex: 'bio',
				render: (text) => <span className="col-bio">{text}</span>,
			}, {
				title: '功能',
				key: 'action',
				width: 120,
				render: (text, record) => (
					<div className="m-fun">
						<Button type='primary' size='small' className="m-blue">修改</Button>
						<Button type='danger' size='small' className="m-blue">删除</Button>
					</div>
				),
			}
		]

		return (
			<div className='g-content-sub'>
				<div className="m-userlist">
					<Button type="primary" style={{marginBottom: 16}} onClick={() => this.setState({visAddUser: true})}><Icon
						type="user-add"/>添加用户</Button>

					<Spin
						tip="加载中"
						spinning={loading}
						indicator={<Icon type="loading" style={{fontSize: 24}} spin/>}
					>
						<Table size='small' dataSource={members} columns={columns} rowKey={item => item.id}/>
					</Spin>
				</div>

				<Modal
					title="创建用户"
					visible={this.state.visAddUser}
					onOk={() => this.setState({visAddUser: false})}
					onCancel={() => {
						this.setState({visAddUser: false})
					}}
				>
					<Form layout="horizontal">
						<Form.Item label="用户名" {...formItemLayout}>
							{
								getFieldDecorator('username', {
									initialValue: ''
								})(
									<Input type="text" placeholder="请输入用户名..."/>
								)
							}
						</Form.Item>
						<Form.Item label="姓名" {...formItemLayout}>
							{
								getFieldDecorator('name', {
									initialValue: ''
								})(
									<Input type="text" placeholder="请输入姓名..."/>
								)
							}
						</Form.Item>
						<Form.Item label="邮箱" {...formItemLayout}>
							{
								getFieldDecorator('email', {
									initialValue: ''
								})(
									<Input type="text" placeholder="请输入邮箱..."/>
								)
							}
						</Form.Item>
						<Form.Item label="手机" {...formItemLayout}>
							{
								getFieldDecorator('phone', {
									initialValue: ''
								})(
									<Input type="text" placeholder="请输入手机..."/>
								)
							}
						</Form.Item>
						<Form.Item label="性别" {...formItemLayout}>
							{
								getFieldDecorator('sex', {
									initialValue: '',
								})(
									<Radio.Group onChange={this.onChange} value={this.state.value}>
										<Radio value={1}>男</Radio>
										<Radio value={2}>女</Radio>
									</Radio.Group>
								)
							}
						</Form.Item>
						<Form.Item label="状态" {...formItemLayout}>
							{
								getFieldDecorator('state', {
									initialValue: 1
								})(
									<Select>
										<Select.Option value={1}>开启</Select.Option>
										<Select.Option value={0}>关闭</Select.Option>
									</Select>
								)}
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}
}

export default Post
