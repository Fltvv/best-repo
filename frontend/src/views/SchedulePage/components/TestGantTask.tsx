import React, {useEffect, useState} from 'react';
import {Gantt, Task, ViewMode} from "gantt-task-react";
import {getTrips, Trip} from "../../../methods/getTrips";
import {Select, Text, Box} from "@chakra-ui/react";
import {TooltipContent} from "./TooltipContent";
let trips: Trip[] | [] = []
let filterOptions = ['Штурман Альбанов', 'Штурман Кошелев']

const Empty = ({}) => {
    return (
        <div>
        </div>
    );
};

export const getIceClass = (value: string) => {
    if(value === 'ледокол') return '🚢'
    else if(value === 'No ice class') return 'Arc0'
    else return value
}

const getFilterOptions = (arr: any []) => {
    const set = new Set(arr.map(item => item.name))
    return Array.from(set)
}

const TestGantTask = () => {
    const [tripFilter, setTripFilter] = useState('');
    const [time, setTime] = useState('Day');
    const [filteredTrips, setFilteredTrips] = useState<Trip[] | []>([]);

    useEffect(() => {
        if(tripFilter === '') {
            setFilteredTrips(trips)
        }else{
            setFilteredTrips(trips.filter(trip => trip.name === tripFilter))
        }
    }, [tripFilter]);

    useEffect(() => {
        getTrips().then((res) => {
            //@ts-ignore
            trips = res.map(trip => {
                return {
                    ...trip,
                    start: new Date(trip.start),
                    end: new Date(trip.end),
                    styles: { progressColor: trip.color, progressSelectedColor: '#ff9e0d' },
                    progress: 100,
                    // @ts-ignore
                    name:  `${getIceClass(trip.ice_class)}  ${trip.name}`,
                }
            } )
            filterOptions = getFilterOptions(trips)
            setFilteredTrips(trips)
        })
    }, []);

    return (<>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{width:'40%', marginBottom: '10px'}}>
                    <Select onChange={(e) => {
                        setTripFilter(e.target.value)
                    }}
                            value={tripFilter}>
                        <option value=''>Все</option>
                        {filterOptions && filterOptions.map(option => <option key={option} value={option}>{option}</option>)}
                    </Select>
                </div>
                <div style={{width:'20%', marginBottom: '10px'}}>
                    <Select onChange={(e) => {
                        setTime(e.target.value)
                    }}
                            value={time}>
                        <option value="Hour">Час</option>
                        <option value="Day">День</option>
                    </Select>
                </div>
            </div>


            {/*//@ts-ignore*/}
            {filteredTrips.length > 0 && <Gantt TooltipContent={TooltipContent} columnWidth={70} TaskListTable={Empty} TaskListHeader={Empty} viewDate={new Date()} tasks={filteredTrips} barCornerRadius={7} locale='rus' viewMode={ViewMode[time]}/>}

            </>

    );
};

export default TestGantTask;
