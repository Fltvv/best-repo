/* eslint-disable */

import { NavLink, useLocation } from 'react-router-dom';
// chakra imports
import {Box, Flex, HStack, Icon, Text, useColorModeValue} from '@chakra-ui/react';
import {
	MdMap, MdMovieFilter,
	MdOutlineAnalytics, MdOutlineCancelPresentation,
	MdOutlineFileOpen, MdOutlineMovie, MdOutlineMovieCreation, MdOutlineMovieFilter, MdOutlinePictureAsPdf,
	MdOutlineStackedBarChart,
} from "react-icons/md";

export function SidebarLinks(props: {
	routes: RoutesType[];
}) {
	//   Chakra color mode
	let location = useLocation();
	let activeColor = useColorModeValue('gray.700', 'white');
	let inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
	let activeIcon = useColorModeValue('brand.500', 'white');
	let textColor = useColorModeValue('secondaryGray.500', 'white');
	let brandColor = useColorModeValue('brand.500', 'brand.400');

	const { routes } = props;

	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};

	// this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
	const createLinks = (
		routes: RoutesType[],
	) => {
		return (<>
			{routes.map(
				(
					route: RoutesType,
					index: number
				) => {
					// if (route.layout === '/admin' || route.layout === '/auth' || route.layout === '/rtl') {
					return (
						<NavLink key={index} to={route.path}>
							{route.icon ? (
								<Box>
									<HStack
										spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
										py='5px'
										ps='10px'>
										<Flex w='100%' alignItems='center' justifyContent='center'>
											<Box
												color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
												me='18px'>
												{route.icon}
											</Box>
											<Text
												me='auto'
												color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
												fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
												{route.name}
											</Text>
										</Flex>
										<Box
											h='36px'
											w='4px'
											bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
											borderRadius='5px'
										/>
									</HStack>
								</Box>
							) : (
								<Box>
									<HStack
										spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
										py='5px'
										ps='10px'>
										<Text
											me='auto'
											color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
											fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
											{route.name}
										</Text>
										<Box h='36px' w='4px' bg='brand.400' borderRadius='5px'/>
									</HStack>
								</Box>
							)}
						</NavLink>
					);
				}
			)}
			<a href='http://iceroute.ru/map2/index.php' target='_blank'>
				<Box>
					<HStack
						spacing='26px'
						py='5px'
						ps='10px'>
						<Flex w='100%' alignItems='center' justifyContent='center'>
							<Box
								color={textColor}
								me='18px'>
								<Icon as={MdMap} width='20px' height='20px' color='inherit' />
							</Box>
							<Text
								me='auto'
								color={textColor}
								fontWeight={'normal'}>
								Карта маршрутов
							</Text>
						</Flex>
						<Box
							h='36px'
							w='4px'
							bg='transparent'
							borderRadius='5px'
						/>
					</HStack>
				</Box>
			</a>
			<a href='https://datalens.yandex/y2dzbny3wdian' target='_blank'>
				<Box>
					<HStack
						spacing='26px'
						py='5px'
						ps='10px'>
						<Flex w='100%' alignItems='center' justifyContent='center'>
							<Box
								color={textColor}
								me='18px'>
								<Icon as={MdOutlineAnalytics} width='20px' height='20px' color='inherit' />
							</Box>
							<Text
								me='auto'
								color={textColor}
								fontWeight={'normal'}>
								Аналитика маршрутов
							</Text>
						</Flex>
						<Box
							h='36px'
							w='4px'
							bg='transparent'
							borderRadius='5px'
						/>
					</HStack>
				</Box>
			</a>
			<a href='https://datalens.yandex/cgx9wfob9zca1' target='_blank'>
				<Box>
					<HStack
						spacing='26px'
						py='5px'
						ps='10px'>
						<Flex w='100%' alignItems='center' justifyContent='center'>
							<Box
								color={textColor}
								me='18px'>
								<Icon as={MdOutlineStackedBarChart} width='20px' height='20px' color='inherit' />
							</Box>
							<Text
								me='auto'
								color={textColor}
								fontWeight={'normal'}>
								Потребность в проводке
							</Text>
						</Flex>
						<Box
							h='36px'
							w='4px'
							bg='transparent'
							borderRadius='5px'
						/>
					</HStack>
				</Box>
			</a>
			<a href='https://docs.google.com/document/d/1yD1nqvoFjMoFLXWfPjggrkTNE-zKQ5Va/edit?usp=sharing&ouid=106522251860431081480&rtpof=true&sd=true' target='_blank'>
				<Box>
					<HStack
						spacing='26px'
						py='5px'
						ps='10px'>
						<Flex w='100%' alignItems='center' justifyContent='center'>
							<Box
								color={textColor}
								me='18px'>
								<Icon as={MdOutlineFileOpen} width='20px' height='20px' color='inherit' />
							</Box>
							<Text
								me='auto'
								color={textColor}
								fontWeight={'normal'}>
								Документация
							</Text>
						</Flex>
						<Box
							h='36px'
							w='4px'
							bg='transparent'
							borderRadius='5px'
						/>
					</HStack>
				</Box>
			</a>
			<a href='https://docs.google.com/presentation/d/1ZWueo6tXZ4zQRhzeBLtY1My1o5JOffStzjOru2YdUX8/edit?usp=sharing' target='_blank'>
				<Box>
					<HStack
						spacing='26px'
						py='5px'
						ps='10px'>
						<Flex w='100%' alignItems='center' justifyContent='center'>
							<Box
								color={textColor}
								me='18px'>
								<Icon as={MdMovieFilter} width='20px' height='20px' color='inherit' />
							</Box>
							<Text
								me='auto'
								color={textColor}
								fontWeight={'normal'}>
								Презентация
							</Text>
						</Flex>
						<Box
							h='36px'
							w='4px'
							bg='transparent'
							borderRadius='5px'
						/>
					</HStack>
				</Box>
			</a>
		</>)

	};
	//  BRAND
	return <>{createLinks(routes)}</>
}

export default SidebarLinks;
