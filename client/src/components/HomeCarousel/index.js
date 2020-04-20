import React from 'react'
import { Carousel } from 'antd'
import './style.less'

const HomeCarousel = ({ mobile, images }) => {
  console.log(images)
  return (
    <div className="g-carousel">
      <div className="m-title-wrap">
        <h1
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            paddingBottom: 0,
          }}
          className="team-name"
        >
          智能视频编码课题组
        </h1>

        <h2
          style={{
            fontSize: mobile ? '1.5em' : '1.7em',
            fontWeight: 'normal',
            marginTop: '10px',
            display: 'block',
          }}
          className="team-name-eng"
        >
          Intelligent Video Compression
        </h2>

        {/* <Button size={mobile ? 'large' : 'huge'} inverted download>
					成果展示
				</Button>

				<Button size={mobile ? 'large' : 'huge'} inverted basic>
					关于我们
				</Button> */}
      </div>

      <div className="bg-carousel">
        <Carousel autoplay>
          {images.sort((a, b) => (a.index - b.index)).map(item => (
            <img key={`img${item.id}`} src={item.url} alt="" />
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default HomeCarousel
