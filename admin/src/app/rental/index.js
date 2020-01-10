import React from 'react'
import { Form, Table, Input, Button, Skeleton, Modal, Tag, Divider, message, Card, Row, Col, Select, DatePicker, Drawer, Spin, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import axios from 'axios'

const {RangePicker} = DatePicker

import './index.less'
import books from '../../constant/books'

const pStyle = {
	fontSize: 16,
	color: 'rgba(0,0,0,0.85)',
	lineHeight: '24px',
	display: 'block',
	marginBottom: 16,
}

@inject('userStore')
@observer
class Rental extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			userlist: [],
			visible: false,
			showDrawer: false,
			rental_list: null
		}
	}

	componentDidMount() {
		this.setState({loading: true}, () => {
			axios.get('https://5ddb2a5f041ac10014de0c6f.mockapi.io/rental')
				.then((r) => {
					console.log(r.data)
					this.setState({rental_list: r.data, loading: false})
				})
				.catch((e) => message.error('网络错误'))
				.finally(() => this.setState({loading: false}))
		})
	}

	render() {
		const {rental_list, loading} = this.state
		const book_list = books.booklist
		const columns = [
			{
				title: '书籍编号',
				dataIndex: 'book_id',
			}, {
				title: '书名',
				dataIndex: 'title',
			}, {
				title: '借阅者编号',
				dataIndex: 'user_id',
			}, {
				title: '借阅者姓名',
				dataIndex: 'user_username',
			}, {
				title: '借书时间',
				dataIndex: 'borrow_time',
				render: t => t.substring(0, 10)
			}, {
				title: '还书时间',
				dataIndex: 'return_time',
				render: t => ''
			}, {
				title: '约定时长',
				dataIndex: 'duration',
				render: (text, record) => {
					if (record.renew) return '60天'
					else return '30天'
				}
			}, {
				title: '是否续借',
				dataIndex: 'renew',
				render: t => {
					if (t) return <Tag color="#108ee9">是</Tag>
					else return <Tag color="#87d068">否</Tag>
				}
			}, {
				title: '功能',
				key: 'action',
				render: (text, record) => (
					<div className="m-fun">
						<Button type='primary' size='small' className="m-blue" onClick={() => this.setState({visible: true})}>操作</Button>
					</div>
				),
			}
		]

		return (
			<div className='g-content-sub'>
				<Card>
					<Form layout="inline">
						<Form.Item label="用户卡号">
							<Input/>
						</Form.Item>
						<Form.Item label="借出时间" style={{marginBottom: 0}}>
							<RangePicker/>
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

					<Spin
						tip="加载中"
						spinning={loading}
						indicator={<Icon type="loading" style={{fontSize: 24}} spin/>}
					>
						<Table size='small' dataSource={rental_list} columns={columns} rowKey={item => item.id}/>
					</Spin>
				</div>
			</div>
		)
	}
}

export default Rental
