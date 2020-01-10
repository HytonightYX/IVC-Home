import React from 'react'
import { Icon, Form, Table, Input, Button, Skeleton, Modal, Tag, Divider, message, Card, Row, Col, Select, DatePicker, Drawer } from 'antd'
import { inject, observer } from 'mobx-react'

import './index.less'
import books from '../../constant/books'

const {Option} = Select
const pStyle = {
	fontSize: 16,
	color: 'rgba(0,0,0,0.85)',
	lineHeight: '24px',
	display: 'block',
	marginBottom: 16,
}

const DescriptionItem = ({title, content}) => (
	<div
		style={{
			fontSize: 14,
			lineHeight: '22px',
			marginBottom: 7,
			color: 'rgba(0,0,0,0.65)',
		}}
	>
		<p
			style={{
				marginRight: 8,
				display: 'inline-block',
				color: 'rgba(0,0,0,0.85)',
			}}
		>
			{title}:
		</p>
		{content}
	</div>
)

@inject('userStore')
@observer
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			userlist: [],
			visible: false,
			showDrawer: false
		}
	}

	handleCancel = () => {
		this.setState({visible: false})
	}

	getFields() {
		const count = this.state.expand ? 10 : 4
		const children = []
		for (let i = 0; i < 10; i++) {
			children.push(
				<Col span={6} key={i} style={{display: i < count ? 'block' : 'none'}}>
					<Form.Item label={`Field ${i}`}>
						<Input placeholder="placeholder"/>
					</Form.Item>
				</Col>,
			)
		}
		return children
	}

	toggle = () => {
		const {expand} = this.state
		this.setState({expand: !expand})
	}

	showDrawer = () => {
		this.setState({showDrawer: true})
	}

	onClose = () => {
		this.setState({visible: false})
	}

	render() {
		const booklist = books.booklist
		const {visible, loading} = this.state

		const columns = [
			{
				title: '书籍编号',
				dataIndex: 'id',
			}, {
				title: '书名',
				dataIndex: 'title',
			}, {
				title: 'ISBN',
				dataIndex: 'isbn13',
			}, {
				title: '作者',
				dataIndex: 'author',
			}, {
				title: '出版社',
				dataIndex: 'publisher',
			}, {
				title: '出版日期',
				dataIndex: 'pubdate',
			}, {
				title: '功能',
				key: 'action',
				render: (text, record) => (
					<div className="m-fun">
						<Button type='primary' size='small' className="m-blue"
						        onClick={() => this.setState({visible: true})}>详情</Button>
					</div>
				),
			}
		]

		const formItemLayout = {
			labelCol: {span: 4},
			wrapperCol: {span: 14},
		}

		return (
			<div className='g-user'>
				<Card>
					<Form layout="inline">
						<Form.Item label="书籍编号">
							<Input/>
						</Form.Item>
						<Form.Item label="书名关键字">
							<Input/>
						</Form.Item>
						<Form.Item label="ISBN">
							<Input/>
						</Form.Item>
						<Form.Item label="作者">
							<Input/>
						</Form.Item>
						<Form.Item>
							<Button type="primary">
								搜索
							</Button>
							<Button style={{marginLeft: 8}} onClick={this.handleReset}>
								重置
							</Button>
						</Form.Item>
					</Form>
				</Card>

				<div className="m-userlist">
					<Table size='small' dataSource={booklist} columns={columns} rowKey={item => item.id}/>
				</div>

				<Drawer
					width={640}
					placement="right"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					<p style={{...pStyle, marginBottom: 24}}>书籍详情</p>
					<p style={pStyle}>Personal</p>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Full Name" content="Lily"/>
						</Col>
						<Col span={12}>
							<DescriptionItem title="Account" content="AntDesign@example.com"/>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<DescriptionItem title="City" content="HangZhou"/>
						</Col>
						<Col span={12}>
							<DescriptionItem title="Country" content="China🇨🇳"/>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Birthday" content="February 2,1900"/>
						</Col>
						<Col span={12}>
							<DescriptionItem title="Website" content="-"/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<DescriptionItem
								title="Message"
								content="Make things as simple as possible but no simpler."
							/>
						</Col>
					</Row>
					<Divider/>
					<p style={pStyle}>Company</p>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Position" content="Programmer"/>
						</Col>
						<Col span={12}>
							<DescriptionItem title="Responsibilities" content="Coding"/>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Department" content="XTech"/>
						</Col>
						<Col span={12}>
							<DescriptionItem title="Supervisor" content={<a>Lin</a>}/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<DescriptionItem
								title="Skills"
								content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
							/>
						</Col>
					</Row>
					<Divider/>
					<p style={pStyle}>Contacts</p>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Email" content="AntDesign@example.com"/>
						</Col>
						<Col span={12}>
							<DescriptionItem title="Phone Number" content="+86 181 0000 0000"/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<DescriptionItem
								title="Github"
								content={
									<a href="http://github.com/ant-design/ant-design/">
										github.com/ant-design/ant-design/
									</a>
								}
							/>
						</Col>
					</Row>
				</Drawer>
			</div>
		)
	}
}

export default Login
