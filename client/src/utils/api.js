import axios from 'axios'
const API_SERVER = '192.168.123.118:9000'

export async function queryToServer(type, file, mode) {
	const r = await axios.post({
		type, file, mode
	})
	return r.data
}
