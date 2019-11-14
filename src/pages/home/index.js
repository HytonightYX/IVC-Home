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
import { Link } from 'react-router-dom'

const Home = () => (
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

		<Segment style={{ padding: '0em' }} vertical>
			<Grid celled='internally' columns='equal' stackable>
				<Grid.Row textAlign='center'>
					<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
						<Header as='h3' style={{ fontSize: '2em' }}>
							"What a Company"
						</Header>
						<p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
					</Grid.Column>
					<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
						<Header as='h3' style={{ fontSize: '2em' }}>
							"I shouldn't have gone with their competitor."
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							<Image avatar src='/images/avatar/large/nan.jpg' />
							<b>Nan</b> Chief Fun Officer Acme Toys
						</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>



		<Segment style={{ padding: '8em 0em' }} vertical>
			<Container text>
				<Header as='h3' style={{ fontSize: '2em' }}>
					Breaking The Grid, Grabs Your Attention
				</Header>
				<p style={{ fontSize: '1.33em' }}>
					Instead of focusing on content creation and hard work, we have learned how to master the
					art of doing nothing by providing massive amounts of whitespace and generic content that
					can seem massive, monolithic and worth your attention.
				</p>
				<Button as='a' size='large'>
					Read More
				</Button>
				<Divider
					as='h4'
					className='header'
					horizontal
					style={{ margin: '3em 0em', textTransform: 'uppercase' }}
				>
					<a href='#'>Case Studies</a>
				</Divider>
				<Header as='h3' style={{ fontSize: '2em' }}>
					Did We Tell You About Our Bananas?
				</Header>
				<p style={{ fontSize: '1.33em' }}>
					Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
					it's really true. It took years of gene splicing and combinatory DNA research, but our
					bananas can really dance.
				</p>
				<Button as='a' size='large'>
					I'm Still Quite Interested
				</Button>
			</Container>
		</Segment>
	</div>
)

export default Home
