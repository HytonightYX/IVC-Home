import { observable, action, runInAction } from 'mobx'
import axios from 'axios'
import * as urls from '@constant/urls'
import { message } from 'antd'

class User {
	@observable
	// currUser = null
	currUser = {
		username: 'HytonightYX',
		name: '张三'
	}

	@action
	async login(params) {
		const r = await axios.post(urls.API_USER_LOGIN, params)
		if (r && r.status === 200) {
			const data = r.data.data
			if (data && params.password === data.password) {
				message.success('登录成功', 0.7)
				runInAction(() => {
					this.currUser = r.data.data
				})
			} else {
				message.error('账户名或密码错误')
			}
		}
	}

	@action.bound
	logout() {
		this.currUser = null
	}
}

export default new User()
