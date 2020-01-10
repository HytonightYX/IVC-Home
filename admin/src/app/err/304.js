import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

export default (props) => (
	<Result
		status="304"
		title="304"
		subTitle="您无权访问该页面"
		extra={
			<Link to='/'>
				<Button type="primary" onClick={() => props.history.push('/foo')}>
					返回工作台
				</Button>
			</Link>
		}
	/>
)
