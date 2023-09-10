import React from 'react';

// Chakra imports
import { Box, useColorModeValue,  } from '@chakra-ui/react';

import "gantt-task-react/dist/index.css";
// Custom components

// Assets
import TestGantTask from "./components/TestGantTask";

export function SchedulePage() {
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	// @ts-ignore

	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
			<TestGantTask/>
		</Box>
	);
}
