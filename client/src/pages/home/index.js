import React from 'react'
import { Container, Divider, Header, Icon, Segment } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import HomeCarousel from '../../components/HomeCarousel'
import './style.less'
import { message, Popover } from 'antd'
import axios from 'axios'
import { API_POST_LIST_SIMPLE } from '../../constant/api'
import { formatTs } from '../../utils/date'
import MoreImg from './more.png'

@withRouter
class Home extends React.Component {
  state = {
    posts: []
  }

  gotoPost = id => {
    this.props.history.push('/post/' + id)
  }

  componentDidMount() {
    axios
      .get(API_POST_LIST_SIMPLE)
      .then(r => {
        if (r && r.status === 200) {
          const posts = r.data.data
          console.log(posts)
          this.setState({ posts })
        }
      })
      .catch(e => {
        message.error('网络错误，获取动态失败')
      })
  }

  render() {
    const { posts } = this.state
    return (
      <div className="g-home">
        <HomeCarousel />

        <div className="m-wedo">
          <div className="content">
            <div className="intro">
              针对视频图像编码与处理，结合机器学习与深度神经网络技术，进行算法设计与优化，达到提升视频压缩效率、提升视频客观质量或降低实现复杂度的目的。
            </div>

            <div className="m-btn-row">
              <Popover
                content={
                  <div>
                    <Link to="/ache-image">
                      <div className="m-popover__home">图片处理</div>
                    </Link>
                    <Link to="/ache-video">
                      <div className="m-popover__home">视频处理</div>
                    </Link>
                  </div>
                }
                trigger="hover"
                placement="bottom"
              >
                <a>
                  在线测试{' '}
                  <span>
                    <Icon name="arrow right" />
                  </span>
                </a>
              </Popover>
            </div>

            <div className="card-wrapper">
              <div className="card">
                <div className="card-title">智能视频编码</div>
                <div className="card-content">
                  借助于深度学习技术，将其应用于视频编码中，提高压缩效率。
                </div>
              </div>

              <div className="card">
                <div className="card-title">图像质量增强</div>
                <div className="card-content">
                  借助于机器学习，提高受损图像主客观质量或分辨率。
                </div>
              </div>

              <div className="card">
                <div className="card-title">视频编码算法优化</div>
                <div className="card-content">
                  设计快速算法，在保证视频编码效率的同时提高编码速度。
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <Segment style={{ padding: '4em 0em' }} vertical>
          <Container text>
            <div>
              <Header as="h3" style={{ fontSize: '2em' }}>
                最新动态
              </Header>
              <div className="post-list">
                {posts.map(item => {
                  return (
                    <Segment vertical key={item.id}>
                      <a
                        className="title"
                        onClick={() => this.gotoPost(item.id)}
                      >
                        {item.title}
                      </a>
                      <div className="time">
                        {formatTs(item.create_time, false)}
                      </div>
                    </Segment>
                  )
                })}
              </div>
              <Link to="/postlist" className="link-blod">
                更多动态 <i aria-hidden="true" className="arrow right icon"></i>
              </Link>
            </div>
            <Divider style={{ padding: '2em 0em' }} />
            <div>
              <Header as="h3" style={{ fontSize: '2em' }}>
                联系我们
              </Header>
              <p>地址: 杭州师范大学仓前校区勤园 11 号楼 506</p>
              <p>联系方式: + 571 28868320</p>
              <Link to="/join" className="link-blod">
                加入我们 <i aria-hidden="true" className="arrow right icon"></i>
              </Link>
            </div>
          </Container>
        </Segment>
      </div>
    )
  }
}

export default Home
