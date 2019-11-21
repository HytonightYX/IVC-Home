import React, { Component } from 'react'
import {
	Button,
	Grid,
	Header,
	Image, Loader,
	Segment,
} from 'semantic-ui-react'
import axios from 'axios'
import { API_UPLOAD } from '../../constant/api'
import './style.less'

class Achievement extends Component {

	state = {
		imageUrl: null,
		imageType: null,
		imageLoading: false,
		imageProcing: false,
		imageRespUrl: null,

		videoUrl: null,
		videoType: null,
		videoUploading: false,
	}

	fileChange = async (e) => {
		if (e.target.files.length > 0) {
			this.setState({imageLoading: true})
			const file = e.target.files[0]

			let formData = new FormData()
			formData.append('file', file)

			axios.post(API_UPLOAD, formData, {
				headers: {'Content-Type': 'multipart/form-data'}
			}).then( r => {
				if (r && r.status === 200) {
					const path = r.data.data.path
					this.setState({
						imageUrl: path,
						imageRespUrl: path.replace('uploads', 'resp')
					})
				}
			}).finally(() => {
				this.setState({imageLoading: false})

			})
		}
	}

	render() {
		const {imageUrl, imageLoading, imageProcing, imageType, imageRespUrl} = this.state

		return (
			<div className="g-ache">
				<Segment style={{padding: 16}} vertical>
					<Grid celled='internally' columns='equal' stackable>
						<Grid.Row textAlign='center'>
							<Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
								<Header as='h3' style={{fontSize: '2em'}} icon>
									原始图片
								</Header>

								<Loader inverted active={imageLoading} content='正在上传' />

								<Image centered bordered rounded size='large'
									src={imageUrl ?
										`http://${imageUrl}` :
										'https://picsum.photos/seed/picsum/150/150'
									}
								/>

								<Button
									fluid
									htmlFor='input-control-id'
									as="label"
									className="m-upload-btn"
								>
									Upload
								</Button>

								<input
									hidden
									type='file'
									id='input-control-id'
									onChange={this.fileChange}
								/>

							</Grid.Column>

							<Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
								<Header as='h3' style={{fontSize: '2em'}} icon>
									处理结果
								</Header>

								<Loader inverted active={imageProcing} content='正在处理' />

								<Image centered bordered rounded size='large'
								       src={
									       imageRespUrl ?
										       `http://${imageRespUrl}` :
										       'https://picsum.photos/seed/picsum/400/400'
								       }
								/>

							</Grid.Column>

						</Grid.Row>
					</Grid>
				</Segment>
			</div>
		)
	}
}

export default Achievement
