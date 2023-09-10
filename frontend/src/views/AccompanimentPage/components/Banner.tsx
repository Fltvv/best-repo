// Chakra imports
import { Flex, Text } from '@chakra-ui/react';

// Assets
import banner from 'assets/img/banners/banner.jpeg';

export function Banner() {
	return (
		<Flex
			direction='column'
			bgImage={banner}
			bgSize='cover'
			bgPosition='bottom'
			py={{ base: '40px', md: '56px' }}
			px={{ base: '30px', md: '64px' }}
			borderRadius='30px'>
			<Text
				fontSize={{ base: '24px', md: '34px' }}
				color='black'
				mb='14px'
				maxW={{
					base: '100%',
					md: '64%',
					lg: '46%',
					xl: '70%',
					'2xl': '50%',
					'3xl': '42%'
				}}
				fontWeight='700'
				lineHeight={{ base: '32px', md: '42px' }}>
				Заявка отправлена!
			</Text>
			<div style={{height: '30vh'}}></div>
		</Flex>
	);
}
