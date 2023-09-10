import {Task} from "gantt-task-react";
import {Box, Text} from "@chakra-ui/react";
import React from "react";

export const TooltipContent = ({task, fontFamily, fontSize}: { task: Task; fontSize: string; fontFamily: string}) => {
    return (
        // @ts-ignore
        <Box bgColor={task.color} borderRadius='7px' p={5}>
            <Text
                fontSize='md'
                color='#fff'
                maxW={{
                    base: '100%',
                    md: '64%',
                    lg: '40%',
                    xl: '56%',
                    '2xl': '46%',
                    '3xl': '34%'
                }}
                fontWeight='500'
                lineHeight='28px'>
                {task.name}
            </Text>
            <Text
                fontSize='sm'
                color='#fff'
                maxW={{
                    base: '100%',
                }}
                fontWeight='500'
                lineHeight='28px'>
                {/*@ts-ignore*/}
                {`${task.point_begin} - ${task.point_end}`}
            </Text>
            <Text
                fontSize='sm'
                color='#fff'
                maxW={{
                    base: '100%',
                }}
                fontWeight='500'
                lineHeight='28px'>
                {/*@ts-ignore*/}
                Продолжительность: {Math.ceil((task.end - task.start) / (60 * 60 * 1000))} часов
            </Text>
            <Text
                fontSize='sm'
                color='#fff'
                maxW={{
                    base: '100%',
                }}
                fontWeight='500'
                lineHeight='28px'>
                {/*@ts-ignore*/}
                Приоритет: {task?.priority}
            </Text>
        </Box>
    );
};
