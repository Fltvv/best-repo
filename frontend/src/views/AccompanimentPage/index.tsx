import React, {useEffect, useState} from 'react';

// Chakra imports
import {Box, useColorModeValue} from '@chakra-ui/react';

import FormContextProvider from "../../contexts/FormContextProvider";
import Form from './components/Form';

// Custom components

export function AccompanimentPage() {

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	return (
		<FormContextProvider>
			<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
				<Form/>
			</Box>
		</FormContextProvider>
	);
}
