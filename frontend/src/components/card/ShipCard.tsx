// Chakra imports
import { AvatarGroup, Avatar, Box, Button, Flex, Icon, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { useState } from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
export interface Ship {"id":string,"name":string,"imo":string,"img":string,"speed":string,"icebreaker":string,"ice_class":string}

export function ShipCard(props: {
	ship: Ship
	openModal: (ship: Ship) => void
}) {
	const { ship, openModal } = props;
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorBid = useColorModeValue('brand.500', 'white');
	return (
		<Card p='20px'>
			<Flex direction={{ base: 'column' }} justify='center'>
				<Box mb={{ base: '20px', '2xl': '20px' }} position='relative'>
					<Image
						src={`http://iceroute.ru/img/${ship.img}`}
						w={{ base: '100%', '3xl': '100%' }}
						h={{ base: '100%', '3xl': '100%' }}
						borderRadius='20px'
					/>
				</Box>
				<Flex flexDirection='column' justify='space-between' h='100%'>
					<Flex
						justify='space-between'
						direction={{
							base: 'row',
							md: 'column',
							lg: 'row',
							xl: 'column',
							'2xl': 'row'
						}}
						mb='auto'>
						<Flex direction='column'>
							<Text
								color={textColor}
								fontSize={{
									base: 'xl',
									md: 'lg',
									lg: 'lg',
									xl: 'lg',
									'2xl': 'md',
									'3xl': 'lg'
								}}
								mb='5px'
								fontWeight='bold'
								me='14px'>
								{ship.name}
							</Text>
							<Text
								color='secondaryGray.600'
								fontSize={{
									base: 'sm'
								}}
								fontWeight='400'
								me='14px'>
								IMO: {ship.imo}
							</Text>
						</Flex>
						{/*<AvatarGroup*/}
						{/*	max={3}*/}
						{/*	color={textColorBid}*/}
						{/*	size='sm'*/}
						{/*	mt={{*/}
						{/*		base: '0px',*/}
						{/*		md: '10px',*/}
						{/*		lg: '0px',*/}
						{/*		xl: '10px',*/}
						{/*		'2xl': '0px'*/}
						{/*	}}*/}
						{/*	fontSize='12px'>*/}
						{/*	{bidders && bidders.map((avt, key) => <Avatar key={key} src={avt} />)}*/}
						{/*</AvatarGroup>*/}
					</Flex>
					<Flex
						// align={{
						// 	base: 'center',
						// 	md: 'start',
						// 	lg: 'center',
						// 	xl: 'start',
						// 	'2xl': 'center'
						// }}
						align='end'
						justify='space-between'
						direction={{
							base: 'row',
							// md: 'column',
							// lg: 'row',
							// xl: 'column',
							// '2xl': 'row'
						}}
						mt='25px'>
						<Flex
							direction='column'
						>
						{/* @ts-ignore*/}
							<a>
								<Text fontWeight='700' fontSize='sm' color={textColorBid}>
									{ship.icebreaker === '1' ? "Ледокол" : ("Ледовый класс: " + ship.ice_class)}
								</Text>
								<Text fontWeight='700' fontSize='sm' color={textColorBid}>
									Скорость: {ship.speed}
								</Text>
							</a>
						</Flex>
						<Button
							variant='darkBrand'
							color='white'
							fontSize='sm'
							fontWeight='500'
							borderRadius='70px'
							px='24px'
							py='5px'
							onClick={() => openModal(ship)}
						>
							Посмотреть
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
