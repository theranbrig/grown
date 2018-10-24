import React, { Component } from 'react';
import { Grid, Image, Container, Header, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import HomeInformationBox from './HomeInformationBox';
import { MainPhoto, MainText, MainGrid } from './styles/HomeStyles';

class Home extends Component {
	render() {
		return (
			<MainGrid>
				<Grid centered={true} stackable>
					<Grid.Column centered="true" width={16} className="title-splash">
						<MainPhoto>
							<MainText>
								<div>
									<h1 size="huge">GROWN</h1>
								</div>
								<Image
									centered={true}
									size="small"
									src="https://i.imgur.com/Gcwggjm.png"
									alt="Grown Logo"
								/>
								<p>Farm to Table the Easy Way!</p>
							</MainText>
						</MainPhoto>
					</Grid.Column>
				</Grid>
				<Grid centered={true} verticalAlign="middle" stackable container text="true">
					<Container className="sub-text">
						<h2>Learn about the best way to connect to farms in your area.</h2>
					</Container>
					<HomeInformationBox
						header="Fresh"
						subHeader="Eat the Best Quality Products"
						information="Literally wayfarers cred bushwick. Everyday carry man bun banh mi, salvia tumeric flannel pinterest celiac banjo raw denim fashion axe cray venmo. Cronut listicle pitchfork snackwave pop-up, vice keffiyeh neutra umami. Hoodie pabst thundercats 3 wolf moon semiotics poke bushwick franzen austin taiyaki prism offal. Biodiesel meggings lo-fi kitsch, leggings brooklyn XOXO disrupt mlkshk neutra chartreuse."
						image="https://images.unsplash.com/photo-1506484381205-f7945653044d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98a14cc3275558214a89ea6a386134dc&auto=format&fit=crop&w=1000&q=80"
					/>
					<Divider />
					<HomeInformationBox
						header="Convenient"
						subHeader="For the On-The-Go Lifestyle"
						information="Four dollar toast single-origin coffee drinking vinegar, narwhal next level distillery viral bushwick man braid chambray etsy stumptown cliche. Echo park locavore leggings pinterest, roof party austin fashion axe. Seitan distillery pour-over quinoa. Tilde post-ironic intelligentsia heirloom swag pickled portland trust fund tote bag PBR&B tousled mlkshk. Green juice ethical VHS, semiotics crucifix deep v next level you probably haven't heard of them vegan organic microdosing hell of biodiesel.."
						image="https://images.unsplash.com/photo-1513125370-3460ebe3401b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=feb294cd683500b96d58ce3a48fe9406&auto=format&fit=crop&w=1000&q=80"
					/>
					<Divider />
					<HomeInformationBox
						header="Explore"
						subHeader="Find new Markets and Products"
						information="Post-ironic shoreditch quinoa, leggings sartorial gentrify poutine knausgaard try-hard skateboard put a bird on it pinterest green juice single-origin coffee. Man braid listicle portland, brunch vexillologist offal green juice pinterest gentrify next level cold-pressed umami kombucha paleo lo-fi. Helvetica bitters adaptogen stumptown offal chia subway tile humblebrag bespoke sustainable godard fixie slow-carb shabby chic vexillologist. Leggings keytar neutra migas squid microdosing air plant vaporware edison bulb irony mlkshk pork belly. Seitan dreamcatcher green juice craft beer small batch thundercats umami pinterest 3 wolf moon tumblr flannel."
						image="https://images.unsplash.com/photo-1483378096604-1294ca36d0f3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=544e1e4f3116624edbcdea444f54537e&auto=format&fit=crop&w=1000&q=80"
					/>
					<Divider />
					<HomeInformationBox
						header="Connect"
						subHeader="Connect to Community Driven Agriculture"
						information="YOLO irony cornhole jianbing pinterest drinking vinegar chillwave. Try-hard bespoke bitters VHS lo-fi jianbing. Wayfarers jean shorts copper mug meditation cold-pressed edison bulb, tumeric polaroid XOXO brooklyn farm-to-table everyday carry YOLO. Typewriter four loko fixie, woke polaroid fanny pack offal microdosing cornhole cray. Live-edge tbh slow-carb normcore lumbersexual asymmetrical chartreuse forage thundercats sriracha migas subway tile."
						image="https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d060132f422f18d7fd59c4b5d0eb8e06&auto=format&fit=crop&w=1000&q=80"
					/>
					<Divider />
					<HomeInformationBox
						header="Eco-Friendly"
						subHeader="The Environmentally Friendly Way to Shop"
						information="Tofu venmo wayfarers dreamcatcher fixie subway tile health goth wolf pop-up jianbing palo santo plaid gochujang asymmetrical. Locavore seitan blue bottle adaptogen gentrify wolf, hella ramps pickled forage. Cornhole cronut chambray synth, tattooed blog vice you probably haven't heard of them microdosing farm-to-table adaptogen pour-over. Typewriter copper mug coloring book intelligentsia cornhole fanny pack banh mi microdosing put a bird on it tacos. Flexitarian mixtape normcore, copper mug leggings hexagon truffaut kogi."
						image="https://images.unsplash.com/photo-1457530378978-8bac673b8062?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a13230dddd3ff4b3150eab5706e8c9ae&auto=format&fit=crop&w=1000&q=80"
					/>
				</Grid>
			</MainGrid>
		);
	}
}
Grid.PropTypes = {
	centered: PropTypes.bool
};

export default Home;
