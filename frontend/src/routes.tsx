import { Icon } from '@chakra-ui/react';
import {
	MdSchedule,
	MdOutlineDirectionsBoatFilled,
	MdAddRoad
} from 'react-icons/md';

import {MainPage} from "views/MainPage";
import {SchedulePage} from "views/SchedulePage";
import { AccompanimentPage } from 'views/AccompanimentPage';

const routes = [
	{
		name: 'Главная',
		path: '/main',
		icon: <Icon as={MdOutlineDirectionsBoatFilled} width='20px' height='20px' color='inherit' />,
		component: MainPage
	},
	{
		name: 'Расписание',
		path: '/schedule',
		icon: <Icon as={MdSchedule} width='20px' height='20px' color='inherit' />,
		component: SchedulePage
	},
	{
		name: 'Запрос на проводку',
		path: '/accompaniment',
		icon: <Icon as={MdAddRoad} width='20px' height='20px' color='inherit' />,
		component: AccompanimentPage
	},
];

export default routes;
