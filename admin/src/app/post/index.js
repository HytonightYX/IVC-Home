import React from 'react'
import { Form, Radio, Table, Input, Button, Modal, Tag, Select, Spin, Icon } from 'antd'
import { inject, observer } from 'mobx-react'

import './index.less'
import { withRouter } from 'react-router'
import { formatApdt } from '../../util/date'

@inject('userStore')
@observer
@withRouter
@Form.create()
class Post extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			search: false,
			visAddUser: false,
			posts: []
		}
	}

	async componentDidMount() {
		this.setState({loading: true})
		const posts = await this.props.userStore.listPost()
		this.setState({
			loading: false,
			posts
		})
	}

	render() {
		const {posts, loading} = this.state
		const {getFieldDecorator} = this.props.form
		const formItemLayout = {
			labelCol: {span: 5},
			wrapperCol: {span: 16}
		}
		const columns = [
			{
				title: 'id',
				dataIndex: 'id',
				width: 120
			}, {
				title: '标题',
				dataIndex: 'title',
				width: 800
			}, {
				title: '状态',
				dataIndex: 'status',
				render: (text) => {
					if (text === 0) {
						return <Tag color='#2db7f5'>展示中</Tag>
					}

					if (text === 1) {
						return <Tag color='#9E9E9E'>已下架</Tag>
					}
				}
			}, {
				title: '创建时间',
				dataIndex: 'create_time',
				render: (text) => <span>{formatApdt(text)}</span>,
			}, {
				title: '功能',
				key: 'action',
				width: 300,
				render: (text, record) => (
					<div className="m-fun">
						<Button size='small' className="m-blue">
							{record.status === 0 && '下架'}
							{record.status === 1 && '展示'}
						</Button>
						<Button type='primary' size='small' className="m-blue">修改</Button>
						<Button type='danger' size='small' className="m-blue">删除</Button>
					</div>
				),
			}
		]

		return (
			<div className='g-content-sub'>
				<div className="m-userlist">
					<Button type="primary" style={{marginBottom: 16}} onClick={() => this.props.history.push('/write')}><Icon
						type="plus"/>新建文章</Button>

					<Spin
						tip="加载中"
						spinning={loading}
						indicator={<Icon type="loading" style={{fontSize: 24}} spin/>}
					>
						<Table size='small' dataSource={posts} columns={columns} rowKey={item => item.id}/>
					</Spin>
				</div>
			</div>
		)
	}
}

export default Post
