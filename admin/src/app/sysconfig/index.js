import React from 'react'
import { Form, Radio, Table, Input, Button, Skeleton, Modal, Tag, Divider, message, Card, Row, Col, Select, DatePicker, Drawer, Spin, Icon, TimePicker, Cascader, InputNumber, Switch, Checkbox } from 'antd'
import './index.less'

const {Option} = Select

const formLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 9 },
}

@Form.create()
class SystemConfig extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
		}
	}

	render() {
		return (
			<div className="g-content-sub m-flex">
				<div>
					<Divider type="horizontal" orientation='left'>系统参数</Divider>
					<Form className="ant-advanced-search-form" {...formLayout}>
						<Row gutter={24}>
							<Col span={8}>
								<Form.Item label='图书馆名称'>
									<Input placeholder="placeholder" defaultValue='HZNU图书馆'/>
								</Form.Item>
							</Col>

							<Col span={8}>
								<Form.Item label='域名配置'>
									<Input placeholder="域名配置" defaultValue='http://yunxi.site:8082'/>
								</Form.Item>
							</Col>

							<Col span={8}>
								<Form.Item label='系统主题'>
									<Select defaultValue="light">
										<Option value="light">亮色</Option>
										<Option value="dark">暗色</Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</div>

				<div>
					<Divider type="horizontal" orientation='left'>编目参数</Divider>

					<Form className="ant-advanced-search-form" {...formLayout}>
						<Row gutter={24}>
							<Col span={8}>
								<Form.Item label='图书分类法'>
									<Select defaultValue="1">
										<Option value="1">中图法</Option>
										<Option value="2">中图法1</Option>
										<Option value="3">中图法2</Option>
										<Option value="4">中图法3</Option>
									</Select>
								</Form.Item>
							</Col>

							<Col span={8}>
								<Form.Item label='索书号分隔符'>
									<Input defaultValue="/"/>
								</Form.Item>
							</Col>

							<Col span={8}>
								<Form.Item label='索书号字段'>
									<Input defaultValue="090d"/>
								</Form.Item>
							</Col>
						</Row>

						<Checkbox defaultChecked>使用拼音/题名压缩键</Checkbox>
						<Checkbox>采用最大次种号生成索书号</Checkbox>

					</Form>
				</div>

				<div>
					<Divider type="horizontal" orientation='left'>流通参数</Divider>

					<Form className="ant-advanced-search-form" {...formLayout}>
						<Row gutter={24}>
							<Col span={8}>
								<Form.Item label='借阅延时时间（毫秒）'>
									<Input placeholder="借阅延时时间" defaultValue='3000'/>
								</Form.Item>
							</Col>

							<Col span={8}>
								<Form.Item label='个人借阅限额（本）'>
									<Input defaultValue='5'/>
								</Form.Item>
							</Col>

							<Col span={8}>
								<Form.Item label='借阅提示价格（元）'>
									<Input defaultValue='10'/>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={24}>
							<Col span={8}>
								<Form.Item label='罚款尾数处理'>
									<Select defaultValue="1">
										<Option value="1">取整</Option>
										<Option value="2">保留1位小数</Option>
										<Option value="3">保留2位小数</Option>
									</Select>
								</Form.Item>
							</Col>

							<Col span={8}>
								<Form.Item label='默认借阅时长（天）'>
									<Input defaultValue='30'/>
								</Form.Item>
							</Col>

							<Col span={8}>
								<Form.Item label='默认续借时长（天）'>
									<Input defaultValue='30'/>
								</Form.Item>
							</Col>
						</Row>

						<Checkbox defaultChecked>允许当天还书</Checkbox>
						<Checkbox>允许借阅同种书</Checkbox>
						<Checkbox defaultChecked>提供委托借阅服务</Checkbox>

					</Form>
				</div>

				<Row>
					<Col span={24} style={{textAlign: 'right'}}>
						<Button type="primary" htmlType="submit">
							保存
						</Button>
						<Button style={{marginLeft: 8}}>
							重置
						</Button>
					</Col>
				</Row>
			</div>
		)
	}
}

export default SystemConfig
