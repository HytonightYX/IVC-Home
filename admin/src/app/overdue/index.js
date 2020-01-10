import React from 'react'
import { Form, Table, Input, Button, Skeleton, Modal, Tag, Divider, message, Card, Row, Col, Select, DatePicker, Drawer, Spin, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import axios from 'axios'
const {Option} = Select
import './index.less'

@inject('userStore')
@observer
class Overdue extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
		}
	}

	componentDidMount() {
		this.setState({loading: true}, () => {
			axios.get('https://5ddb2a5f041ac10014de0c6f.mockapi.io/overdue')
				.then((r) => {
					console.log(r.data)
					this.setState({overdue_list: r.data, loading: false})
				})
				.catch((e) => message.error('网络错误'))
				.finally(() => this.setState({loading: false}))
		})
	}

	render() {
		const {overdue_list, loading} = this.state
		const columns = [
			{
				title: '书籍编号',
				dataIndex: 'book_id',
			}, {
				title: '读者卡号',
				dataIndex: 'user_id',
			}, {
				title: '金额',
				dataIndex: 'money',
				render: m => String(m / 10) + '元'
			}, {
				title: '是否缴纳',
				dataIndex: 'pay',
				render: t => {
					if (t) return <Tag color="blue">已缴纳</Tag>
					else return <Tag color="red">未缴纳</Tag>
				}
			}, {
				title: '缴纳时间',
				dataIndex: 'pay_date',
				render: t => t.substring(0, 10)
			}, {
				title: '功能',
				key: 'action',
				render: (text, record) => (
					<div className="m-fun">
						<Button type='primary' size='small' className="m-blue" onClick={() => this.setState({visible: true})}>缴纳</Button>
						<Button type='danger' size='small' className="m-blue" onClick={() => this.setState({visible: true})}>提醒</Button>
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
						<Form.Item label="是否缴纳" style={{marginBottom: 0}}>
							<Select defaultValue="lucy" style={{ width: 120 }}>
								<Option value="jack">已缴纳</Option>
								<Option value="lucy">未缴纳</Option>
							</Select>
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
						<Table size='small' dataSource={overdue_list} columns={columns} rowKey={item => item.id}/>
					</Spin>
				</div>
			</div>
		)
	}
}

export default Overdue
