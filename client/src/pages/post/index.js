import { message } from 'antd'
import React from 'react'
import axios from 'axios'
import './style.less'
import { API_POST_FULL } from '../../constant/api'
import { formatTs } from '../../utils/date'

class Post extends React.Component {

	state = {
		post: {}
	}

	componentDidMount() {
		const id = this.props.match.params.id
		this.setState({loading: true})

		axios.post(API_POST_FULL, {id})
			.then(r => {
				if (r && r.status === 200 && r.data.code === 200) {
					this.setState({
						post: r.data.data
					})
				}
			})
			.catch((e) => {
				message.error('遇到错误')
				this.setState({loading: false})
			})
	}

	render() {
		const {post} = this.state

		return (
			<div className='g-post'>
				<div className="m-header">
					<div className="title">
						{post.title}
					</div>

					<div className="info">
						<div className="name">

						</div>
						<div className="time">{formatTs(post.create_time)}</div>
					</div>
				</div>

				<div className="content">
					<div className="braft-output-content" dangerouslySetInnerHTML={{__html: post && post.html}}/>
				</div>
			</div>
		)
	}

}

export default Post
