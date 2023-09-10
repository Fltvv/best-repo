import React, {useEffect, useState} from 'react';
import {Gantt, ViewMode} from "gantt-task-react";
import { Trip} from "../../../methods/getTrips";
import {Box, Select} from "@chakra-ui/react";
import {getShip} from "../../../methods/getShip";
import {TooltipContent} from "../../SchedulePage/components/TooltipContent";

const Empty = ({}) => {
    return (
        <div>
        </div>
    );
};

const TestGantTask = ({imo}: {imo?: string}) => {
    const [time, setTime] = useState('Day');
    const [trips, setTrips] = useState<Trip[] | []>([]);

    useEffect(() => {
            getShip(imo).then((res) => {
                //@ts-ignore
                setTrips(res.map(trip => {
                    return {
                        ...trip,
                        start: new Date(trip.start),
                        end: new Date(trip.end),
                        styles: { progressColor: trip.color, progressSelectedColor: '#ff9e0d' },
                        progress: 100
                    }
                } ))
            })
    }, []);

    return (
        <>
            <Box p={5}>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
                    <div style={{width:'20%', marginBottom: '10px', marginLeft: 'auto'}}>
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
                {trips.length > 0 && <Gantt TooltipContent={TooltipContent} columnWidth={70} TaskListTable={Empty} TaskListHeader={Empty} viewDate={new Date()} tasks={trips} barCornerRadius={7} locale='rus' viewMode={ViewMode[time]}/>}
            </Box>
        </>
    );
};

export default TestGantTask;
