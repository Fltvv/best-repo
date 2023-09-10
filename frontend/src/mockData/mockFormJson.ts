export interface Question {
    id: string,
    question: string,
    answer: string,
    placeholder: string
    value: string
}
export interface Step {
    id: string,
    title: string,
    description: string,
    questions: Question[]
}

export interface FormJson {
    content: Step[]
}

export const formJson: FormJson = {
    content: [
        {
            id: "1",
            title: 'Данные корабля',
            description: 'Описание шага 1',
            questions: [
                {
                    id: '1_1',
                    value: 'name',
                    question: 'Название корабля',
                    answer: '',
                    placeholder: ''
                },
                {
                    id: '1_2',
                    value: 'iceClass',
                    question: 'Ледовый класс',
                    answer: '',
                    placeholder: ''
                },
                {
                    id: '1_3',
                    value: 'maxSpeed',
                    question: 'Максимальная скорость',
                    answer: '',
                    placeholder: ''
                },
            ]
        },
        {
            id: "2",
            title: 'Проводка',
            description: 'Описание шага 2',
            questions: [
                {
                    id: '2_1',
                    value: 'pointOfStart',
                    question: 'Точка отправления',
                    answer: '',
                    placeholder: ''
                },
                {
                    id: '2_2',
                    value: 'pointOfEnd',
                    question: 'Точка прибытия',
                    answer: '',
                    placeholder: ''
                },
                {
                    id: '2_3',
                    value: 'dateOfStart',
                    question: 'Время отправления',
                    answer: '',
                    placeholder: ''
                },
                {
                    id: '2_4',
                    value: 'dateOfEnd',
                    question: 'Время прибытия',
                    answer: '',
                    placeholder: ''
                },
            ]
        },
    ]
}
