import React, { Component } from 'react'
import {
	Button,
	Grid,
	Header, Icon, Loader,
	Segment, Select, Form
} from 'semantic-ui-react'
import axios from 'axios'
import { API_UPLOAD, BASE_URL } from '../../constant/api'
import { Player, ControlBar, ProgressControl } from 'video-react'
import { Motion, spring } from 'react-motion'
import './style.less'
import { PROC_TYPE } from '../../constant/config'

const VIDEO_STATUS = {
	before: 0, uploading: 1,  processing: 2, done: 3
}

class Achievement extends Component {

	state = {
		videoUrl: null,
		videoRespUrl: null,
		videoType: null,
		videoStatus: VIDEO_STATUS.before,

		videoPause: true,
		videoProcType: 'Vid4'
	}

	fileChange = async (e) => {
		if (e.target.files.length > 0) {
			this.setState({videoStatus: VIDEO_STATUS.uploading})
			const file = e.target.files[0]

			let formData = new FormData()
			formData.append('file', file)

			axios.post(API_UPLOAD, formData, {
				headers: {'Content-Type': 'multipart/form-data'}
			}).then(r => {
				if (r && r.status === 200) {
					const path = r.data.data.path
					this.setState({
						videoUrl: path,
						videoRespUrl: path.replace('uploads', 'resp'),
						videoStatus: VIDEO_STATUS.done
					})
					this.playerLeft.load();
					this.playerRight.load();
				}
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
		console.log('playerLeft', this.playerLeft.getState())
		this.playerLeft.pause()
		this.playerRight.pause()
	}

	handleSelect = (e, {value}) => {
		console.log(value)
		this.setState({videoProcType: value})
	}

	render() {
		const {videoStatus, videoPause, videoRespUrl, videoUrl} = this.state

		return (
			<div className="g-ache">
				<Segment style={{padding: 16}} vertical>
					<Grid columns='equal' stackable>
						<Grid.Row textAlign='center'>
							<Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
								<Header as='h4' style={{fontSize: '2em'}} icon>
									原始视频
								</Header>

								<Loader inverted active={videoStatus === VIDEO_STATUS.uploading} content='正在上传'/>
								<Player
									ref={player => {
										this.playerLeft = player
									}}
									preload='auto'
								>
									<ControlBar autoHide={true} disableDefaultControls={true}>
										<ProgressControl/>
									</ControlBar>
									<source src={videoUrl ? `${BASE_URL}/${videoUrl}` : "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"}/>
								</Player>

								<input hidden type='file' id='input-control-id' onChange={this.fileChange}/>

							</Grid.Column>

							<Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
								<Header as='h4' style={{fontSize: '2em'}} icon>处理结果</Header>

								<Loader inverted active={videoStatus === VIDEO_STATUS.processing} content='正在处理'/>

								<Player
									ref={player => {
										this.playerRight = player
									}}
									preload='auto'
								>
									<ControlBar autoHide={true} disableDefaultControls={true}>
										<ProgressControl/>
									</ControlBar>
									<source src={videoRespUrl ? `${BASE_URL}/${videoRespUrl}` : "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"}/>
								</Player>
							</Grid.Column>
						</Grid.Row>
						<Segment style={{margin: '0 auto', width: '400px'}}>
							<Form.Select
								fluid
								options={PROC_TYPE}
								placeholder='选择一个处理效果...'
								onChange={this.handleSelect}
							/>
							<Button fluid htmlFor='input-control-id' as="label" className="m-upload-btn">上传视频</Button>

							{videoPause &&
							<Button fluid as="label" className="m-upload-btn" onClick={this.play}><Icon name='play'/></Button>}
							{!videoPause &&
							<Button fluid as="label" className="m-upload-btn" onClick={this.pause}><Icon name='pause'/></Button>}
						</Segment>
					</Grid>
				</Segment>
			</div>
		)
	}
}

class PlayPause extends Component {
	render() {
		const {toggle, onClick} = this.props

		return (
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
