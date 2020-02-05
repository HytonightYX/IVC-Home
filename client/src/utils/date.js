/**
 * 格式化时间数
 */
export let formatTs = (d, hms = true) => {
	if (!d) return

	let year = d.toString().substr(0, 4)
	let month = d.toString().substr(4, 2)
	let day = d.toString().substr(6, 2)
	let hour = d.toString().substr(8, 2)
	let min = d.toString().substr(10, 2)
	let sec = d.toString().substr(12, 2)

	if (hms) {
		return `${year}-${month}-${day} ${hour}:${min}:${sec}`
	} else {
		return `${year}-${month}-${day}`
	}
}
