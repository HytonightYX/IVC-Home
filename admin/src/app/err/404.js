import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

export default (props) => (
	<Result
		status="404"
		title="404"
		subTitle="您访问的路径不存在"
		extra={
			<Link to='/'>
				<Button type="primary" onClick={() => props.history.push('/foo')}>
					返回工作台
				</Button>
			</Link>
		}
	/>
)
