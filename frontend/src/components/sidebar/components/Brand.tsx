// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';
import {ReactComponent as NSPLogo} from '../../../assets/img/layout/logo.svg'
import Photo from '../../../assets/img/layout/rosatom_logo.png'

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<div style={{width: '100px', height: '100px', fill: '#3c62f5'}}>
				<NSPLogo h='26px' w='80px' my='32px' color={logoColor} />
			</div>
			<div style={{height: '20pt'}} ></div>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
