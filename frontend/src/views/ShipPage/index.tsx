// Chakra imports
import { Box, Grid } from '@chakra-ui/react';

// Custom components
import Banner from 'views/ShipPage/components/Banner';

// Assets
import banner from 'assets/img/banners/banner2.jpeg';
import React from "react";
import {Ship} from "../../components/card/ShipCard";
import GantTask from "./components/GantTask";

interface StartupPageProps {
	ship: Ship
}

export function ShipPage(props: StartupPageProps) {
	const {ship} = props
	return (
		<Box pt={{ base: '50px', md: '20px', xl: '20px' }}>
			<Grid
				templateColumns={{
					base: '1fr',
				}}
				templateRows={{
					base: 'repeat(3, 1fr)',
					lg: '1fr'
				}}
				gap={{ base: '20px', xl: '20px' }}>
				<Banner
					gridArea='1 / 1 / 2 / 2'
					banner={banner}
					avatar={'http://iceroute.ru/img/' + ship.img}
					name={ship.name}
					job={'IMO: ' + ship.imo}
					ship={ship}
				/>
				<div style={{overflow: 'scroll'}}>
					<GantTask imo={ship.imo}/>
				</div>
			</Grid>
		</Box>
	);
}

