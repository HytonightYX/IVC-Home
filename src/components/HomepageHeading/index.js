import { Button, Container, Header } from 'semantic-ui-react'
import React from 'react'
import { withRouter } from 'react-router-dom'

const HomepageHeading = withRouter(({mobile, location}) => {

	const isHome = location.pathname === '/'

	let marginTop

	if (isHome) {
		marginTop = mobile ? '1.5em' : '3em'
	} else {
		marginTop = mobile ? '0.5em' : '0em'
	}

	return (
		<Container text className="m-head">
			{isHome ? (
				<div>
					<Header
						as='h1'
						inverted
						icon
						style={{
							fontSize: mobile ? '2em' : '4em',
							fontWeight: 'normal',
							marginBottom: 0,
							marginTop,
							background: '#1c1b1c'
						}}
						className="team-name"
					>智能视频编码课题组</Header>

					<Header
						as='h2'
						inverted
						icon
						content='Intelligent Video Compression'
						style={{
							fontSize: mobile ? '1.5em' : '1.7em',
							fontWeight: 'normal',
							marginTop: '10px',
							marginBottom: isHome ? '3em' : '0',
							background: '#1c1b1c',
							display: 'block'
						}}
					/>


					<Button size={mobile ? 'large' : 'huge'} inverted download>
						成果展示
					</Button>

					<Button size={mobile ? 'large' : 'huge'} inverted basic>
						关于我们
					</Button>
				</div>
			) : null}

		</Container>
	)
})

export default HomepageHeading
