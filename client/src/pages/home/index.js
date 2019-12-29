import React from 'react'
import {
	Button,
	Container,
	Divider,
	Header,
	Icon,
	Segment,
} from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import HomeCarousel from '../../components/HomeCarousel'
import './style.less'
import { Popover } from 'antd'

const Home = withRouter(({location}) => {
	return (
		<div className="g-home">
			<HomeCarousel/>

			<div className="m-wedo">

				<div className="content">

					<div className="intro">
						针对视频图像编码与处理，结合机器学习与深度神经网络技术，进行算法设计与优化，达到提升视频压缩效率、提升视频客观质量或降低实现复杂度的目的。
					</div>

					<div className="m-btn-row">
						<Popover content={
							<div>
								<Link to='/ache-image'><div className="m-popover__home">图片处理</div></Link>
								<Link to='/ache-video'><div className="m-popover__home">视频处理</div></Link>
							</div>
						} trigger="hover" placement="bottom">
							<a>在线测试 <span><Icon name='arrow right' /></span></a>
						</Popover>
					</div>

					<div className="card-wrapper">
						<div className="card">
							<div className="card-title">
								智能视频编码
							</div>
							<div className="card-content">
								借助于深度学习技术，将其应用于视频编码中，提高压缩效率。
							</div>
						</div>

						<div className="card">
							<div className="card-title">
								图像质量增强
							</div>
							<div className="card-content">
								借助于机器学习，提高受损图像主客观质量或分辨率。
							</div>
						</div>

						<div className="card">
							<div className="card-title">
								视频编码算法优化
							</div>
							<div className="card-content">
								设计快速算法，在保证视频编码效率的同时提高编码速度。
							</div>
						</div>
					</div>

				</div>
			</div>

			<Divider />

			<Segment style={{padding: '8em 0em'}} vertical>
				<Container text>
					<Header as='h3' style={{fontSize: '2em'}}>
						最新动态
					</Header>
					<p>
						这里是实验室最新动态
					</p>
					<Button as='a' size='large'>
						更多动态
					</Button>

					<Divider />

					<Header as='h3' style={{fontSize: '2em'}}>
						联系我们
					</Header>

					<p>地址: 杭州师范大学仓前校区勤园 11 号楼 506</p>
					<p>联系方式: + 571 28868320</p>

					<Button as='a' size='large'>
						加入我们
					</Button>
				</Container>
			</Segment>
		</div>
	)
})

export default Home
