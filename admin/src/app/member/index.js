import React from 'react'
import { Form, Radio, Table, Input, Button, Modal, Tag, Select, Spin, Icon, Upload, message } from 'antd'
import { API_IMAGE_UPLOAD, API_STATIC_IMAGE } from '../../constant/urls'
import { inject, observer } from 'mobx-react'

import './index.less'

function beforeUpload(file) {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!')
	}
	const isLt2M = file.size / 1024 / 1024 < 2
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!')
	}
	return isJpgOrPng && isLt2M
}

@inject('userStore')
@observer
@Form.create()
class Member extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			uploading: false,
			search: false,
			visAddUser: false,
			visEditUser: false,
			image: null,
			imageType: 'png',
			members: [],
			submitting: false
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

	handleUploadChange = info => {
		if (info.file.status === 'uploading') {
			this.setState({uploading: true})
			return
		}
		if (info.file.status === 'done') {
			const r = info.file.response

			if (r && r.code === 200) {
				message.success(r.msg, 0.7)
				this.setState({
					uploading: false,
					image: r.data.uuid,
					imageType: info.file.type.split('/')[1]
				})
				this.props.form.setFieldsValue({
					image: r.data.uuid
				})
			}
		}
	}

	handleEdit = (record) => {
		this.setState({
			visEditUser: true,
			select: record,
			image: record.image || null
		})
	}

	handleSubmitEdit = () => {
		this.setState({submitting: true})
		this.props.form.validateFields(((errors, values) => {
			if (errors) {
				return
			}
			values.id = this.state.select.id
			this.props.userStore.editMember(values)
				.then((data) => {
					this.setState({
						submitting: false,
						visEditUser: false,
						members: data.data
					})
					console.log(data)
					if (data.code === 200) {
						message.success(data.msg, 0.7)
					}
				})
		}))
	}

	render() {
		const {members, loading, image, imageType, select, submitting} = this.state
		const {getFieldDecorator} = this.props.form
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'}/>
				<div className="ant-upload-text">Upload</div>
			</div>
		)

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
						<Button type='primary' size='small' className="m-blue" onClick={() => this.handleEdit(record)}>修改</Button>
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
					title="修改用户"
					visible={this.state.visEditUser}
					onOk={this.handleSubmitEdit}
					confirmLoading={submitting}
					onCancel={() => {
						this.setState({visEditUser: false})
					}}
					destroyOnClose={true}
				>
					<Form layout='horizontal' className='g-brad-form'>
						<Form.Item label='姓名'>
							{
								getFieldDecorator('name', {
									rules: [{required: true, message: '请输入人员姓名！'}],
									initialValue: select && select.name
								})(
									<Input
										prefix={<Icon type="database" style={{color: 'rgba(0,0,0,.25)'}}/>}
										placeholder="请填写名称..."
									/>
								)
							}
						</Form.Item>

						<Form.Item label='标签'>
							{
								getFieldDecorator('tag', {
									rules: [{required: true, message: '请设定标签！'}],
									initialValue: select && select.tag
								})(
									<Input
										placeholder="请设定标签"
									/>
								)
							}
						</Form.Item>

						<Form.Item label='图片'>
							{
								getFieldDecorator('image', {})(
									<div className='upload-wrap'>
										<Upload
											name="file"
											listType="picture-card"
											className="avatar-uploader"
											showUploadList={false}
											action={API_IMAGE_UPLOAD}
											beforeUpload={beforeUpload}
											onChange={this.handleUploadChange}
										>
											{image ?
												<img src={`${API_STATIC_IMAGE}/${image}.${imageType}`} alt="icon"
												     style={{maxHeight: 64}}/> : uploadButton}
										</Upload>
									</div>
								)
							}
						</Form.Item>

						<Form.Item label='个人简介'>
							{
								getFieldDecorator('bio', {
									initialValue: select && select.bio
								})(
									<Input.TextArea
										autoSize={{minRows: 2}}
										placeholder="请填写简介..."
									/>
								)
							}
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}
}

export default Member
