import { observable, action, runInAction } from 'mobx'
import axios from 'axios'
import * as urls from '../constant/urls'
import { message } from 'antd'

/**
 * 由于项目比较小，因此将所有的 action 写在这里，不做拆分
 */
class User {
	@observable
	currUser = {
		username: 'HytonightYX'
	}

	@observable
	memberList = []

	@observable
	postList = []

	@action
	async login(params) {
		const r = await axios.post(urls.API_USER_LOGIN, params)
		if (r && r.status === 200) {
			const data = r.data
			if (data && data.code === 200) {
				message.success('登录成功', 0.7)
				runInAction(() => {
					this.currUser = data.data
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

	@action
	async listPost() {
		try {
			const r = await axios.get(urls.API_POST_LIST_SIMPLE)
			if (r && r.status === 200) {
				return r.data.data
			}
		} catch (e) {
			message.error('网络错误')
		}
	}

	@action
	async createPost(params) {
		try {
			const r = await axios.post(urls.API_POST_CREATE, params)
			if (r && r.status === 200) {
				return r.data.data
			}
		} catch (e) {
			message.error('网络错误')
		}
	}

	@action
	async deletePost(params) {
		try {
			const r = await axios.post(urls.API_POST_DELETE, params)
			if (r && r.status === 200) {
				return r.data.data
			}
		} catch (e) {
			message.error('网络错误')
		}
	}

	/**
	 * 获取完整文章，用于修改
	 */
	@action
	async getPostFull(params) {
		try {
			const r = await axios.post(urls.API_POST_FULL, params)
			return r.data.data
		} catch (e) {
			message.error('网络错误')
		}
	}

	@action
	async editPost(params) {
		try {
			const r = await axios.post(urls.API_POST_EDIT, params)
			return r.data.data
		} catch (e) {
			message.error('网络错误')
		}
	}
}

export default new User()
