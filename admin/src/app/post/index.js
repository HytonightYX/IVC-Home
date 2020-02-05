import React from 'react'
import { Form, Radio, Table, Input, Button, Modal, Tag, Select, Spin, Icon, message } from 'antd'
import { inject, observer } from 'mobx-react'
import Highlighter from "react-highlight-words"
import './index.less'
import { withRouter } from 'react-router'
import { formatApdt } from '../../util/date'

@inject('userStore')
@observer
@withRouter
@Form.create()
class Post extends React.Component {
	state = {
		loading: false,
		search: false,
		visAddUser: false,
		posts: []
	}

	getColumnSearchProps = dataIndex => ({
		filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
			<div style={{padding: 8}}>
				<Input
					ref={node => {
						this.searchInput = node
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
					style={{width: 188, marginBottom: 8, display: 'block'}}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm)}
					icon="search"
					size="small"
					style={{width: 90, marginRight: 8}}
				>
					Search
				</Button>
				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
					Reset
				</Button>
			</div>
		),
		filterIcon: filtered => (
			<Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => this.searchInput.select())
			}
		},
		render: text => (
			<Highlighter
				highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
				searchWords={[this.state.searchText]}
				autoEscape
				textToHighlight={text.toString()}
			/>
		)
	})

	handleSearch = (selectedKeys, confirm) => {
		confirm()
		this.setState({searchText: selectedKeys[0]})
	}

	handleReset = clearFilters => {
		clearFilters()
		this.setState({searchText: ''})
	}

	async componentDidMount() {
		this.setState({loading: true})
		const posts = await this.props.userStore.listPost()
		this.setState({
			loading: false,
			posts
		})
	}

	handleEdit = (id) => {
		this.props.history.push('edit/' + id)
	}

	handleDel = async (id) => {
		this.setState({loading: true})
		const newList = await this.props.userStore.deletePost({id})
		if (newList) {
			this.setState({
				loading: false,
				posts: newList
			})
		} else {
			message.error('获取数据失败')
		}
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
				width: 800,
				...this.getColumnSearchProps("title")
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
				width: 230,
				sorter: (a, b) => a.create_time - b.create_time,
				defaultSortOrder: "descend",
				render: (text) => <span>{formatApdt(text)}</span>,
			}, {
				title: '功能',
				key: 'action',
				width: 200,
				render: (text, record) => (
					<div className="m-fun">
						<Button type='primary' size='small' className="m-blue"
						        onClick={() => this.handleEdit(record.id)}>修改</Button>
						<Button type='danger' size='small' className="m-blue" onClick={() => this.handleDel(record.id)}>删除</Button>
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
