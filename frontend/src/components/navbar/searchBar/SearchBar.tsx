import { IconButton, Input, InputGroup, InputRightElement, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
// import {InputRightElement} from "@chakra-ui/input/dist/declarations/src/input-element";
export function SearchBar(props: {
	variant?: string;
	background?: string;
	children?: JSX.Element;
	placeholder?: string;
	borderRadius?: string | number;
	filter: any,
	[x: string]: any;
}) {
	// Pass the computed styles into the `__css` prop
	const { variant, background, children, placeholder, borderRadius, filter, ...rest } = props;
	// Chakra Color Mode
	const searchIconColor = useColorModeValue('gray.700', 'white');
	const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
	const inputText = useColorModeValue('gray.700', 'gray.100');
	return (
		<InputGroup w={{ base: '100%' }} {...rest}>
			<Input
				variant='search'
				fontSize='sm'
				bg={background ? background : inputBg}
				color={inputText}
				fontWeight='100%'
				_placeholder={{ color: 'gray.400', fontSize: '14px' }}
				borderRadius={borderRadius ? borderRadius : '30px'}
				placeholder={placeholder ? placeholder : 'Поиск...'}
				onChange={(e) => filter(e.target.value, 'search')}
			/>
			<InputRightElement
				children={
					<IconButton
						aria-label='search'
						bg='inherit'
						borderRadius='inherit'
						_active={{
							bg: 'inherit',
							transform: 'none',
							borderColor: 'transparent'
						}}
						_focus={{
							boxShadow: 'none'
						}}
						icon={<SearchIcon color={searchIconColor} w='15px' h='15px' />}
					/>
				}
			/>
		</InputGroup>
	);
}
