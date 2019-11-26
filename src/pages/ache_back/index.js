import React, { Component } from 'react'
import {
	Button,
	Grid,
	Header, Icon,
	Image, Loader,
	Segment,
} from 'semantic-ui-react'
import axios from 'axios'
import { API_UPLOAD } from '../../constant/api'
import { Player } from 'video-react'
import { Motion, spring } from 'react-motion'
import foreman_yuv from './foreman_qcif_176x144_50.yuv'
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
		videoProcing: false,
		videoRespUrl: null,

		videoPause: true,
	}

	fileChange = async (e) => {
		if (e.target.files.length > 0) {
			this.setState({imageLoading: true})
			const file = e.target.files[0]

			let formData = new FormData()
			formData.append('file', file)

			axios.post(API_UPLOAD, formData, {
				headers: {'Content-Type': 'multipart/form-data'}
			}).then(r => {
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

	play = () => {
		this.setState({videoPause: false})
		this.playerLeft.play()
		this.playerRight.play()
	}

	pause = () => {
		this.setState({videoPause: true})
		this.playerLeft.pause()
		this.playerRight.pause()
	}

	render() {
		const {imageUrl, imageLoading, imageProcing, imageType, imageRespUrl, videoPause} = this.state

		return (
			<div className="g-ache">
				<Segment style={{padding: 16}} vertical>
					<Grid  columns='equal' stackable>
						<Grid.Row textAlign='center'>
							<Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
								<Header as='h4' style={{fontSize: '2em'}} icon>
									原始视频
								</Header>

								<Loader inverted active={imageLoading} content='正在上传'/>
								<Player ref={player => {
									this.playerLeft = player
								}}>
									<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"/>
								</Player>

								<input hidden type='file' id='input-control-id' onChange={this.fileChange}/>

							</Grid.Column>

							<Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
								<Header as='h4' style={{fontSize: '2em'}} icon>处理结果</Header>

								<Loader inverted active={imageProcing} content='正在处理'/>

								<Player ref={player => {
									this.playerRight = player
								}}>
									<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"/>
								</Player>
							</Grid.Column>
						</Grid.Row>

						<Button fluid htmlFor='input-control-id' as="label" className="m-upload-btn">上传视频</Button>
						{videoPause && <Button fluid as="label" className="m-upload-btn" onClick={this.play}><Icon name='play' /></Button>}
						{!videoPause && <Button fluid as="label" className="m-upload-btn" onClick={this.pause}><Icon name='pause' /></Button>}
					</Grid>
				</Segment>
			</div>
		)
	}
}

class PlayPause extends Component {
	render() {
		const { toggle, onClick } = this.props

		return(
			<Motion
				style={{scale: spring(toggle ? 1 : 0, [300, 30])}}
			>
				{({scale}) =>
					<button
						type="button"
						className="play-pause"
						onClick={onClick}
					>
            <span
	            className="play-pause__playhead"
	            style={{
		            transform: `scaleX(${1 - scale})`,
		            WebkitTransform: `scaleX(${1 - scale})`
	            }}
            />
						<span
							className="play-pause__pausehead"
							style={{
								transform: `scaleX(${scale})`,
								WebkitTransform: `scaleX(${scale})`
							}}
						/>
					</button>
				}
			</Motion>
		)
	}
}

export default Achievement
