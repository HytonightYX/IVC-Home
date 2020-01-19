import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { Form, Input, Button } from 'antd'
import './style.less'
import { API_IMAGE_UPLOAD, API_STATIC_IMAGE } from '../../constant/urls'

class FormDemo extends React.Component {

	componentDidMount() {
		// // 异步设置编辑器内容
		// setTimeout(() => {
		// 	this.props.form.setFieldsValue({
		// 		content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
		// 	})
		// }, 1000)
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.form.validateFields((error, values) => {
			if (!error) {
				const submitData = {
					title: values.title,
					raw: values.content.toRAW(),
					html: values.content.toHTML()
				}
				console.log(submitData)
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
			<div className="g-write">
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

export default Form.create()(FormDemo)
