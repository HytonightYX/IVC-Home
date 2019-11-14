import React, { Component } from 'react'
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Visibility,
} from 'semantic-ui-react'

import './style.less'

class Achievement extends Component {

	state = {
		imageUrl: null,
		imageType: null,
		imageUploading: false,

		videoUrl: null,
		videoType: null,
		videoUploading: false,
	}

	render() {
		return (
			<div>
				<Segment style={{ padding: '2em 8em' }} vertical>
					<Grid celled='internally' columns='equal' stackable>
						<Grid.Row textAlign='center'>

							<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
								<Header as='h3' style={{ fontSize: '2em' }} icon>
									原始图片
								</Header>
								<Image centered bordered rounded size='large' src='https://picsum.photos/seed/picsum/150/150' />
							</Grid.Column>

							<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
								<Header as='h3' style={{ fontSize: '2em' }} icon>
									处理结果
								</Header>

								<Image centered bordered rounded size='large' src='https://picsum.photos/seed/picsum/400/400' />

							</Grid.Column>

						</Grid.Row>
					</Grid>
				</Segment>
			</div>
		)
	}
}

export default Achievement
