import 'braft-editor/dist/index.css'
import { inject, observer } from 'mobx-react'
import React from 'react'
import BraftEditor from 'braft-editor'
import { Form, Input, Button, message } from 'antd'
import './style.less'
import { withRouter } from 'react-router'
import { API_IMAGE_UPLOAD, API_STATIC_IMAGE } from '../../constant/urls'
import pos from '../../util/pos'

@inject('userStore')
@observer
@withRouter
class Edit extends React.Component {
	state = {
		post: null
	}

	async componentDidMount() {
		const postId = this.props.match.params.id
		const data = await this.props.userStore.getPostFull({id: postId})

		this.props.form.setFieldsValue({
			content: BraftEditor.createEditorState(data.raw),
			title: data.title
		})

		this.setState({
			postId: data.id
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.form.validateFields((error, values) => {
			if (!error) {
				const submitData = {
					id: this.state.postId,
					title: values.title,
					raw: values.content.toRAW(),
					html: values.content.toHTML()
				}

				this.props.userStore.editPost(submitData)
					.then(r => {
						if (r.ok === 1) {
							message.success('更新成功', 0.7)
							setTimeout(() => {
								this.props.history.push('/post')
							}, 500)
						}
					})
					.catch(e => {
						console.error(e)
					})
			}
		})
	}

	imgUpload = (param) => {
		const xhr = new XMLHttpRequest
		const fd = new FormData()

		const successFn = (response) => {
			const rt = JSON.parse(xhr.responseText)
			console.log(`${API_STATIC_IMAGE}/${rt.data.uuid}.${rt.data.type}`)
			param.success({
				url: `${API_STATIC_IMAGE}/${rt.data.uuid}.${rt.data.type}`
			})
		}

		const progressFn = (event) => {
			param.progress(event.loaded / event.total * 100)
		}

		const errorFn = (response) => {
			param.error({
				msg: 'unable to upload.'
			})
		}

		xhr.upload.addEventListener('progress', progressFn, false)
		xhr.addEventListener('load', successFn, false)
		xhr.addEventListener('error', errorFn, false)
		xhr.addEventListener('abort', errorFn, false)

		fd.append('file', param.file)
		xhr.open('POST', API_IMAGE_UPLOAD, true)
		xhr.send(fd)
	}

	render() {
		const editorProps = {
			media: {
				uploadFn: this.imgUpload
			}
		}
		const {getFieldDecorator} = this.props.form
		const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media']

		return (
			<div className="g-edit">
				<Form onSubmit={this.handleSubmit}>
					<Form.Item label="文章标题">
						{getFieldDecorator('title', {
							rules: [{
								required: true,
								message: '请输入标题',
							}],
						})(
							<Input size="large" placeholder="请输入标题"/>
						)}
					</Form.Item>
					<Form.Item label="文章正文">
						{getFieldDecorator('content', {
							validateTrigger: 'onBlur',
							rules: [{
								required: true,
								validator: (_, value, callback) => {
									if (value.isEmpty()) {
										callback('请输入正文内容')
									} else {
										callback()
									}
								}
							}],
						})(
							<BraftEditor
								{...editorProps}
								className="editor"
								controls={controls}
								placeholder="请输入正文内容"
							/>
						)}
					</Form.Item>
					<Form.Item>
						<Button size="large" type="primary" htmlType="submit">提交</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
}

export default Form.create()(Edit)
