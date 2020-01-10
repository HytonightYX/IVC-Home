import React from 'react'
import { Row, Col, Card, Timeline, Icon } from 'antd'
import EchartsViews from './EchartsViews'
import EchartsProjects from './EchartsProjects'
import './index.less'

class Dashboard extends React.Component {
	render() {
		return (
			<div className="g-dashboard">
				<div className="gutter-example button-demo">
					<Row gutter={10}>
						<Col className="gutter-row" md={4}>
							<div className="gutter-box">
								<Card bordered={false}>
									<div className="clear y-center">
										<div className="pull-left mr-m">
											<Icon type="api" style={{fontSize: 24}}/>
										</div>
										<div className="clear">
											<div className="text-muted">待处理</div>
											<h2>5</h2>
										</div>
									</div>
								</Card>
							</div>

							<div className="gutter-box">
								<Card bordered={false}>
									<div className="clear y-center">
										<div className="pull-left mr-m">
											<Icon type="cloud" style={{fontSize: 24}}/>
										</div>
										<div className="clear">
											<div className="text-muted">云数据</div>
											<h2>30122</h2>
										</div>
									</div>
								</Card>
							</div>
						</Col>

						<Col className="gutter-row" md={4}>
							<div className="gutter-box">
								<Card bordered={false}>
									<div className="clear y-center">
										<div className="pull-left mr-m">
											<Icon type="book" style={{fontSize: 24}}/>
										</div>
										<div className="clear">
											<div className="text-muted">在库</div>
											<h2>30423</h2>
										</div>
									</div>
								</Card>
							</div>
							<div className="gutter-box">
								<Card bordered={false}>
									<div className="clear y-center">
										<div className="pull-left mr-m">
											<Icon type="mail" style={{fontSize: 24}}/>
										</div>
										<div className="clear">
											<div className="text-muted">邮件</div>
											<h2>102</h2>
										</div>
									</div>
								</Card>
							</div>
						</Col>

						<Col className="gutter-row" md={16}>
							<div className="gutter-box">
								<Card bordered={false} className={'no-padding'}>
									<EchartsProjects/>
								</Card>
							</div>
						</Col>
					</Row>

					<Row gutter={10}>
						<Col className="gutter-row" md={8}>
							<div className="gutter-box">
								<Card bordered={false}  style={{minHeight: 460}}>
									<div className="pb-m">
										<h3>任务</h3>
										<small>10个已经完成，2个待完成，1个正在进行中</small>
									</div>
									<Timeline>
										<Timeline.Item color="green">发送征订申请</Timeline.Item>
										<Timeline.Item color="green">审核征订</Timeline.Item>
										<Timeline.Item color="red">
											<p>联调接口</p>
											<p>图书验收</p>
										</Timeline.Item>

										<Timeline.Item color="#108ee9">
											<p>图书上架</p>
										</Timeline.Item>
									</Timeline>
								</Card>
							</div>
						</Col>

						<Col className="gutter-row" md={8}>
							<div className="gutter-box">
								<Card bordered={false} style={{minHeight: 460}}>
									<div className="pb-m">
										<h3>消息栏</h3>
									</div>
									<ul className="list-group no-border">
										<li className="list-group-item">
                    <span className="pull-left w-40 mr-m">
                        <img
	                        src='https://semantic-ui.com/images/avatar2/large/matthew.png'
	                        style={{maxWidth: 40}}
	                        className="img-responsive img-circle" alt="test"/>
                    </span>
											<div className="clear">
												<span className="block">管理员小王</span>
												<span className="text-muted">下午进行图书上架</span>
											</div>
										</li>
										<li className="list-group-item">
                  <span className="pull-left w-40 mr-m">
                      <img
	                      src='https://semantic-ui.com/images/avatar2/large/matthew.png'
	                      className="img-responsive img-circle" alt="test"/>
                  </span>
											<div className="clear">
												<span className="block">用户小张</span>
												<span className="text-muted">您好，请问《XXX》在库吗</span>
											</div>
										</li>
										<li className="list-group-item">
                       <span className="pull-left w-40 mr-m">
                           <img
	                           src='https://semantic-ui.com/images/avatar2/large/matthew.png'
	                           className="img-responsive img-circle" alt="test"/>
                       </span>
											<div className="clear">
												<span className="block">BOSS</span>
												<span className="text-muted">这系统BUG真多，先杀一个程序员祭天</span>
											</div>
										</li>
										<li className="list-group-item">
                       <span className="pull-left w-40 mr-m">
                           <img
	                           src='https://semantic-ui.com/images/avatar2/large/matthew.png'
	                           className="img-responsive img-circle" alt="test"/>
                       </span>
											<div className="clear">
												<span className="block">小编</span>
												<span className="text-muted">实在编不出来了</span>
											</div>
										</li>
									</ul>
								</Card>
							</div>
						</Col>

						<Col className="gutter-row" md={8}>
							<div className="gutter-box">
								<Card bordered={false} style={{minHeight: 460}}>
									<div className="pb-m">
										<h3>访问量统计</h3>
										<small>最近7天用户访问量</small>
									</div>
									<EchartsViews/>
								</Card>
							</div>
						</Col>
					</Row>

				</div>
			</div>
		)
	}
}

export default Dashboard
