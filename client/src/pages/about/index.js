import { Modal } from 'semantic-ui-react'
import React, { Component } from 'react'
import axios from 'axios'
import './style.less'
import IMG_DJC from '../../assert/member/djc.png'
import { API_MEMBER_LIST } from '../../constant/api'

class About extends Component {

	state = {
		memberList: [],
		loading: false,
		visible: false
	}

	componentDidMount() {
		this.setState({loading: true})
		axios.get(API_MEMBER_LIST)
			.then((data) => {
				const r = data.data
				console.log(r.code === 200)
				if (r && r.code === 200) {
					this.setState({
						memberList: r.data,
						loading: false
					})
				}
			})
			.catch(e => {
				console.log(e)
				this.setState({loading: false})
			})
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

		const {memberList} = this.state
		console.log(memberList)

		return (
			<div className="g-about">
				<div className="m-title">
					Meet the Team
				</div>

				<div className="m-content">
					{
						memberList.map((item) => {
							return (
								<div className="member-card" key={item.id}>
									<div className="member-img">
										<img src={item.image || IMG_DJC} alt=""/>
									</div>
									<div className="member-ct">
										<div className="name">{item.name}</div>

										<div className="grade">{item.tag}</div>

										<Modal trigger={<div className="more">more ></div>} closeIcon centered={false}
										       className="m-member-modal">
											<Modal.Content>
												<div className="m-image"><img src={IMG_DJC} alt=""/></div>
												<div className="m-name">{item.name}</div>
												<div className="m-desc">{item.bio}</div>
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
