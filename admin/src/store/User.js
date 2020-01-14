import { observable, action, runInAction } from 'mobx'
import axios from 'axios'
import * as urls from '../constant/urls'
import { message } from 'antd'

class User {
	@observable
	currUser = {
		username: 'HytonightYX',
		name: '张三'
	}

	@observable
	memberList = []

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

	@action
	async listMember() {
		try {
			const r = await axios.get(urls.API_MEMBER_LIST)
			console.log(r)
			if (r && r.status === 200) {
				return r.data.data
			}
		} catch (e) {
			message.error('网络错误')
		}
	}

	@action
	async editMember(params) {
		try {
			const r = await axios.post(urls.API_MEMBER_EDIT, params)
			if (r && r.status === 200) {
				return r.data
			}
		} catch (e) {
			message.error('网络错误')
		}
	}
}

export default new User()
