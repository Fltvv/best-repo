import {Task} from "gantt-task-react";

export const trips = [
    {
        "start": new Date(2023, 1, 1),
        "end": new Date(2023, 1, 2),
        "name": "Штурман Альбанов",
        "id": "1",
        "type": "task",
        "dependencies": "48",
        "progress": "0",
        "point_begin": "точка в Баренцевом море",
        "point_end": "Саббета 3"
    },
    {
        "start": new Date(2023, 1, 5),
            "end": new Date(2023, 1, 6),
        "name": "Штурман Альбанов",
        "id": "2",
        "type": "task",
        "dependencies": "49",
        "progress": "0",
        "point_begin": "Саббета 3",
        "point_end": null
    },
    // {
    //     "start": "12.01.21 18:00",
    //     "end": "16.01.21 22:00",
    //     "name": "Штурман Альбанов",
    //     "id": "3",
    //     "type": "task",
    //     "dependencies": "50",
    //     "progress": "0",
    //     "point_begin": "точка в Баренцевом море",
    //     "point_end": "Саббета 3"
    // },
    // {
    //     "start": "17.01.21 06:00",
    //     "end": "21.01.21 20:45",
    //     "name": "Штурман Альбанов",
    //     "id": "4",
    //     "type": "task",
    //     "dependencies": "51",
    //     "progress": "0",
    //     "point_begin": "Саббета 3",
    //     "point_end": null
    // },
    // {
    //     "start": "21.01.21 09:00",
    //     "end": "26.01.21 22:00",
    //     "name": "Штурман Альбанов",
    //     "id": "5",
    //     "type": "task",
    //     "dependencies": "48",
    //     "progress": "0",
    //     "point_begin": "точка в Баренцевом море",
    //     "point_end": "Саббета 3"
    // },
    // {
    //     "start": "28.01.21 01:00",
    //     "end": "02.02.21 19:00",
    //     "name": "Штурман Альбанов",
    //     "id": "6",
    //     "type": "task",
    //     "dependencies": "49",
    //     "progress": "0",
    //     "point_begin": "Саббета 3",
    //     "point_end": null
    // }
]
    let tasks: Task[] = [
        {
            start: new Date(2023, 1, 1),
            end: new Date(2023, 1, 2),
            name: 'Idea1',
            id: 'Task 1',
            type:'task',
            progress: 100,
            isDisabled: true,
            styles: { progressColor: 'green', progressSelectedColor: '#ff9e0d' },
        },
        {
            start: new Date(2023, 1, 1),
            end: new Date(2023, 1, 2),
            name: 'Idea2',
            id: 'Task 2',
            type:'task',
            dependencies: ['Task 3', 'Task 1'],
            progress: 100,
            // isDisabled: true,
            styles: { progressColor: 'blue', progressSelectedColor: '#ff9e0d' },
        },
        {
            start: new Date(2023, 1, 1),
            end: new Date(2023, 1, 17),
            name: 'Idea3',
            id: 'Task 3',
            type:'task',
            progress: 100,
            isDisabled: true,
            styles: { progressColor: 'navy', progressSelectedColor: '#ff9e0d' },
        },
    ];
