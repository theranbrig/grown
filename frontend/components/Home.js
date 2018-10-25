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
						information="Grown allows you to shop for the freshest ingredients around.  Are you tired of the poor quality grocery store produce?  Now you can get the freshest food around.  Search for food directly from your area so you know that it is up the freshest standards possible.  Grown lets you shop for high-quality locally grown products.  Find the finest produce, meat, dairy and other farm fresh products right from your neighborhood."
						image="https://images.unsplash.com/photo-1506484381205-f7945653044d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98a14cc3275558214a89ea6a386134dc&auto=format&fit=crop&w=1000&q=80"
					/>
					<Divider />
					<HomeInformationBox
						header="On-The-Go"
						subHeader="Convenience For Your Lifestyle"
						information="Now you can shop from the farmer market from home. Grown allows you to connect to order food in advance and have it available for pick up.  All of your food is ready to go for you when you arrive at the market.  Just show your receipt, pick up your food, and be on your way.  Perfect for the busy lifestyle where you want the freshness of the market, with the convenience of the store."
						image="https://images.unsplash.com/photo-1513125370-3460ebe3401b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=feb294cd683500b96d58ce3a48fe9406&auto=format&fit=crop&w=1000&q=80"
					/>
					<Divider />
					<HomeInformationBox
						header="Explore"
						subHeader="Find New Markets and Products"
						information="Grown is the perfect way to get out and see what your area has to offer.  Never tried broccolini?  Wondering how to pick out the perfect kumquat?  Didn't know that someone served Emu in your area?  Now you can explore what your area has to offer and see the new and exciting agricultural products that are being offered.  Branch out into the world of unknown produce and see what is right under your nose."
						image="https://images.unsplash.com/photo-1483378096604-1294ca36d0f3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=544e1e4f3116624edbcdea444f54537e&auto=format&fit=crop&w=1000&q=80"
					/>
					<Divider />
					<HomeInformationBox
						header="Connect"
						subHeader="Connect to Community Driven Agriculture"
						information="We at Grown believe it is of the utmost importance to connect you to the agriculture in your area.  Farm to table means that you should actually know the farm that goes on your table.  Meet those who grow your food, and get to know them.  Grown allows you to connect to the community, forming a relationship with your farmers and food."
						image="https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d060132f422f18d7fd59c4b5d0eb8e06&auto=format&fit=crop&w=1000&q=80"
					/>
					<Divider />
					<HomeInformationBox
						header="Eco-Friendly"
						subHeader="The Environmentally Friendly Way to Shop"
						information="Food shouldn't come from a cage or be sprayed with harmful pesticides.  Grown allows you to get the most environmentally friendly agriculture around.  Be sure that your food is good for you and the environment.  Grown commits to supporting environmentally sustainable products.  Know that you are helping the world when you help yourself."
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
