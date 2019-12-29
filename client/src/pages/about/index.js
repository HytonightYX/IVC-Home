import { Modal as AntModal } from 'antd'
import { Modal } from 'semantic-ui-react'
import React, { Component } from 'react'
import './style.less'
import IMG_DJC from '../../assert/member/djc.png'
import { IVC_MEMBER } from '../../constant/config'

class About extends Component {

	state = {
		visible: false
	}

	showModal = () => {
		this.setState({
			visible: true,
		})
	}

	handleCancel = e => {
		console.log(e)
		this.setState({
			visible: false,
		})
	}

	render() {

		return (
			<div className="g-about">
				<div className="m-title">
					Meet the Team
				</div>

				<div className="m-content">
					{
						IVC_MEMBER.map((item, index) => {
							return (
								<div className="member-card">
									<div className="member-img">
										<img src={IMG_DJC} alt=""/>
									</div>
									<div className="member-ct">
										<div className="name">{item.name}</div>

										<div className="grade">{item.grade}</div>

										<Modal trigger={<div className="more">more ></div>} closeIcon centered={false} className="m-member-modal">
											<Modal.Content>
												<div className="m-image"><img src={IMG_DJC} alt=""/></div>
												<div className="m-name">{item.name}</div>
												<div className="m-desc">{item.description}</div>
											</Modal.Content>
										</Modal>
									</div>
								</div>
							)
						})
					}
				</div>

				{/*<Modal*/}
				{/*	title="Basic Modal"*/}
				{/*	visible={this.state.visible}*/}
				{/*	onOk={this.handleOk}*/}
				{/*	onCancel={this.handleCancel}*/}
				{/*>*/}
				{/*	<p>Some contents...</p>*/}
				{/*	<p>Some contents...</p>*/}
				{/*	<p>Some contents...</p>*/}
				{/*</Modal>*/}


			</div>
		)
	}
}

export default About
