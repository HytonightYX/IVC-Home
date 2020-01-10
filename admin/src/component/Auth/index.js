import React from 'react'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { message } from 'antd'

@inject('userStore')
@observer
class Auth extends React.Component {

	@computed
	get currUser() {
		return this.props.userStore.currUser
	}

	render() {
		if (this.currUser) return <>{this.props.children}</>
		else {
			message.info('请先登录！', 0.5)
			return <Redirect to='/login'/>
		}
	}
}

export default Auth
