import React, {useEffect, useState} from 'react';

// Chakra imports
import { Box, Button, Flex, Grid, Link, Text, useColorModeValue, SimpleGrid, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';

// Custom components
import {Ship, ShipCard} from 'components/card/ShipCard';

// Assets
import {Search} from "../../components/search/Search";
import {getShips} from "../../methods/getShips";
import {ShipPage} from "../ShipPage";

let ships: Ship[] | [] = []

export function ShipsPage() {
	const [filteredShips, setFilteredShips] = useState<Ship[] | []>([]);
	const [currentShip, setCurrentShip] = useState<Ship | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure()

	const openModal = (ship: Ship) => {
		setCurrentShip(ship)
		onOpen()
	}

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	useEffect(() => {
		getShips().then((res) => {
			ships = res
			setFilteredShips(res)
		})
	}, []);

//@ts-ignore
	const filter = (value: string, type: string, e: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e?.preventDefault()
		if(type === "search"){
			setFilteredShips(ships.filter(ship => {
				return ship.name.includes(value)
			}))
			return;
		}
		else if(type === "tag"){
			setFilteredShips(ships.filter(ship => {
				return ship.icebreaker === value
			}))
			return
		}
		else {setFilteredShips(ships)}
	}
	return (
		<Box >
			{/* Main Fields */}
			<Grid
				mb='20px'
				gridTemplateColumns={{ xl: 'repeat(1)', '2xl': '1fr 0.46fr' }}
				gap={{ base: '20px', xl: '20px' }}
				display={{ base: 'block', xl: 'grid' }}>
				<Flex flexDirection='column' gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 3' }}>
					<div style={{height: '50px'}}></div>
					<Search secondary={true} filter={filter}/>
					<Flex direction='column'>
						<Flex
							mt='45px'
							mb='20px'
							justifyContent='space-between'
							direction={{ base: 'column', md: 'row' }}
							align={{ base: 'start', md: 'center' }}>
							<Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
								Корабли
							</Text>
							<Flex
								align='center'
								me='20px'
								ms={{ base: '24px', md: '0px' }}
								mt={{ base: '20px', md: '0px' }}>
								<Link
									color={textColorBrand}
									fontWeight='500'
									me={{ base: '34px', md: '44px' }}
									href='#' onClick={(e) => filter('', '', e)}>
									Все
								</Link>
								<Link
									color={textColorBrand}
									fontWeight='500'
									me={{ base: '34px', md: '44px' }}
									href='#' onClick={(e) => filter('0', 'tag', e)}>
									Грузовые
								</Link>
								<Link color={textColorBrand} fontWeight='500' href='#' onClick={(e) => filter('1', 'tag', e)}>
									Ледоколы
								</Link>
							</Flex>
						</Flex>
						<SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
							{filteredShips.map(ship => (
								<ShipCard key={ship.id}
										  ship={ship}
										  openModal={openModal}
							/>))}
						</SimpleGrid>
					</Flex>
				</Flex>
			</Grid>
			<Modal isOpen={isOpen} onClose={onClose} size={'full'}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Информация о корабле</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box maxW='100%'>
							<ShipPage ship={currentShip}/>
						</Box>
					</ModalBody>

					{/*<ModalFooter>*/}
					{/*	<Button colorScheme='blue' mr={3} onClick={onClose}>*/}
					{/*		Close*/}
					{/*	</Button>*/}
					{/*	<Button variant='ghost'>Secondary Action</Button>*/}
					{/*</ModalFooter>*/}
				</ModalContent>
			</Modal>
		</Box>
	);
}
