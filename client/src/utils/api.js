import axios from 'axios'
import { API_MEMBER_LIST } from '../constant/api'
const API_SERVER = '192.168.123.118:9000'

async function _get(type, file, mode) {
	const r = await axios.post({
		type, file, mode
	})
	return r.data
}

export async function queryMemberList() {
	const axiosResponse = await axios.get(API_MEMBER_LIST)
	const r = axiosResponse.data.data

	if (r && r.code === 200) {

	}
}
