import React from 'react'
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image, Popup,
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
						课题组主要的研究方向围绕视频图像编码与处理展开，结合最先进的机器学习与深度神经网络技术，或提升主客观质量或降低复杂度。课题组承担了国家重大专项子课题、省自然基金等系列课题，与美国Google，国内海康、阿里等企业有紧密合作，并与国内外高校深度交流，力在培养视频编码领域的优秀人才。
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
					<Divider
						as='h4'
						className='header'
						horizontal
						style={{margin: '3em 0em', textTransform: 'uppercase'}}
					>
						<a href='#'>lorem ipsum</a>
					</Divider>
					<Header as='h3' style={{fontSize: '2em'}}>
						联系我们
					</Header>

					<p>地址: XXX</p>
					<p>联系方式: XXXXXXXXX</p>

					<Button as='a' size='large'>
						加入我们
					</Button>
				</Container>
			</Segment>
		</div>
	)
})

export default Home

const ba1 = () => (
	<Segment style={{padding: '0em'}} vertical>
		<Grid celled='internally' columns='equal' stackable>
			<Grid.Row textAlign='center'>
				<Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
					<Header as='h3' style={{fontSize: '2em'}} icon>
						"What a Team"
					</Header>
					<p style={{fontSize: '1.33em'}}>That is what they all say about us</p>
				</Grid.Column>
				<Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}} icon>
					<Header as='h3' style={{fontSize: '2em'}} icon>
						"Lorem ipsum dolor!!!"
					</Header>
					<p style={{fontSize: '1.33em'}}>
						<b>Nan</b> Chief Fun Officer Acme Toys
					</p>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</Segment>
)
