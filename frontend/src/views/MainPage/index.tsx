import React, {useEffect, useState} from 'react';

// Chakra imports
import { Box, Button, Flex, Grid, Link, Text, useColorModeValue, SimpleGrid } from '@chakra-ui/react'

// Assets
import Banner from "./components/Banner";
import {ShipsPage} from "../ShipsPage";

export function MainPage() {

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
			<Banner/>
			<ShipsPage/>
		</Box>
	);
}
