import React  from 'react'
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	Segment,
} from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

const Home = withRouter(({location}) => {
	return (
		<div>
			<Segment style={{ padding: '8em 0em' }} vertical>
				<Grid container stackable verticalAlign='middle'>
					<Grid.Row>
						<Grid.Column width={8}>
							<Header as='h3' style={{ fontSize: '2em' }}>
								我们在做的...
							</Header>
							<p style={{ fontSize: '1.33em' }}>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae eius, ex fugit ipsa iste itaque molestiae omnis quaerat quam, quisquam, repellendus soluta tempora. Animi aperiam consequuntur impedit nisi quia. Qui?
							</p>
						</Grid.Column>

						<Grid.Column floated='right' width={6}>
							<Image bordered rounded size='large' src='https://picsum.photos/seed/picsum/150/150' />
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column textAlign='center'>
							<Link to='achievement'>
								<Button size='huge'>马上试试<Icon name="arrow right" /></Button>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>

			<Segment style={{ padding: '8em 0em' }} vertical>
				<Container text>
					<Header as='h3' style={{ fontSize: '2em' }}>
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
						style={{ margin: '3em 0em', textTransform: 'uppercase' }}
					>
						<a href='#'>lorem ipsum</a>
					</Divider>
					<Header as='h3' style={{ fontSize: '2em' }}>
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
	<Segment style={{ padding: '0em' }} vertical>
		<Grid celled='internally' columns='equal' stackable>
			<Grid.Row textAlign='center'>
				<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
					<Header as='h3' style={{ fontSize: '2em' }} icon>
						"What a Team"
					</Header>
					<p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
				</Grid.Column>
				<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }} icon>
					<Header as='h3' style={{ fontSize: '2em' }} icon>
						"Lorem ipsum dolor!!!"
					</Header>
					<p style={{ fontSize: '1.33em' }}>
						<b>Nan</b> Chief Fun Officer Acme Toys
					</p>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</Segment>
)
