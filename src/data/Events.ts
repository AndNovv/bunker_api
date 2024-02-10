import { BunkerStats, PlayerStats } from "./data"

type TypesOfEvent = 'Simple' | 'Complex'

type SimpleConsequence = {
    type: 'Simple',
    title: string,
    descrition: string,
    probability: number,
    effect: EventEffect[]
}

type PlayerDependency = {
    type: 'Player'
    stat: PlayerStats
}
type BunkerDependency = {
    type: 'Bunker'
    stat: BunkerStats
}

type probabilityDependence = PlayerDependency | BunkerDependency

type ComplexConsequence = {
    type: 'Complex',
    title: string,
    descrition: string,
    probability: [number, number, number, number, number],
    probabilityDependence: probabilityDependence
    effect: EventEffect[]
}

export type Consequence = SimpleConsequence | ComplexConsequence

type EventResponse = {
    title: string,
    consequences: Consequence[]
}

export type ComplexEvent = {
    type: 'Complex',
    title: string,
    description: string,
    responses: EventResponse[],

}

export type SimpleEvent = {
    type: 'Simple',
    title: string,
    description: string,
    effect: EventEffect[],
}

type EventEffect = {
    stat: BunkerStats,
    value: number,
} | {
    stat: 'Death',
    playerId: number
}

export type EventType = SimpleEvent | ComplexEvent

export const Events: readonly EventType[] = [

    // Simple Events
    {
        type: 'Simple',
        title: 'Часть продовольствия испортилась из-за неправильного хранения',
        description: '-5 продовольствия',
        effect: [{ stat: 'Food', value: -5 }]
    },
    {
        type: 'Simple',
        title: 'Неисправность системы вентеляции',
        description: 'Прочность системы вентиляции -50%',
        effect: [{ stat: 'Vent System', value: -5 }]
    },
    {
        type: 'Simple',
        title: 'Неисправность системы очистки воды',
        description: 'Прочность системы очистки воды -50%',
        effect: [{ stat: 'Water Cleaning System', value: -5 }]
    },
    {
        type: 'Simple',
        title: 'Неисправность системы электроэнергии',
        description: 'Прочность системы электроэнергии -50%',
        effect: [{ stat: 'Electricity System', value: -5 }]
    },
    {
        type: 'Simple',
        title: 'Выжившие не смогли найти общий язык',
        description: '+1 к напряженности',
        effect: [{ stat: 'Anxiety', value: 1 }]
    },

    // Complex Events

    {
        type: 'Complex',
        title: 'Игрок заболел',
        description: 'Случайный игрок заболеет',
        responses: [
            {
                title: 'Само пройдет',
                consequences: [
                    {
                        type: 'Simple',
                        title: 'Игрок скончался после осложнений',
                        descrition: 'Само не прошло',
                        probability: 0.1,
                        effect: [{ stat: 'Death', playerId: 1 }],
                    },
                    {
                        type: 'Simple',
                        title: 'Болезнь оказалась не серьезной и быстро отступила',
                        descrition: 'В этот раз вам повезло',
                        probability: 0.3,
                        effect: [],
                    },
                    {
                        type: 'Simple',
                        title: 'Игрок тяжело перенес заболевание',
                        descrition: 'Могло быть и хуже. +2 к напряженности',
                        probability: 0.6,
                        effect: [{ stat: 'Anxiety', value: 2 }],
                    },
                ]
            },

            {
                title: 'Оказать простую медицинскую помощь',
                consequences: [
                    {
                        type: 'Complex',
                        title: 'Игрок тяжело перенес заболевание',
                        descrition: '-3 медикаментов и +2 к напряженности',
                        probability: [0.6, 0.5, 0.4, 0.3, 0.2],
                        probabilityDependence: { type: 'Bunker', stat: 'Med' },
                        effect: [{ stat: 'Anxiety', value: 2 }, { stat: 'Medicines', value: -3 }],
                    },
                    {
                        type: 'Complex',
                        title: 'Игрок быстро пошел на поправку',
                        descrition: '-3 медикаментов',
                        probability: [0.4, 0.5, 0.6, 0.7, 0.8],
                        probabilityDependence: { type: 'Bunker', stat: 'Med' },
                        effect: [{ stat: 'Medicines', value: -3 }],
                    },

                ]
            },

            {
                title: 'Провести лучшее возможное медицинское лечение',
                consequences: [
                    {
                        type: 'Complex',
                        title: 'Игрок тяжело перенес заболевание',
                        descrition: '-5 медикаментов и +2 к напряженности',
                        probability: [0.5, 0.4, 0.3, 0.2, 0.1],
                        probabilityDependence: { type: 'Bunker', stat: 'Med' },
                        effect: [{ stat: 'Anxiety', value: 2 }, { stat: 'Medicines', value: -5 }],
                    },
                    {
                        type: 'Complex',
                        title: 'Игрок быстро пошел на поправку',
                        descrition: '-5 медикаментов',
                        probability: [0.5, 0.6, 0.7, 0.8, 0.9],
                        probabilityDependence: { type: 'Bunker', stat: 'Med' },
                        effect: [{ stat: 'Medicines', value: -5 }],
                    },

                ]
            },
        ]
    },

    {
        title: 'Рейд на бункер',
        type: 'Complex',
        description: 'На бункер нападают выжившие',
        responses: [
            {
                title: 'Попробовать провести мирные переговоры',
                consequences: [
                    {
                        type: 'Complex',
                        title: 'Переговоры прошли успешно',
                        descrition: 'Напряженность -1',
                        probability: [0, 0.2, 0.4, 0.6, 0.7],
                        probabilityDependence: { type: 'Player', stat: 'Intelligence' },
                        effect: [{ stat: 'Anxiety', value: -1 }]
                    },
                    {
                        type: 'Complex',
                        title: 'Вас не стали слушать и обокрали',
                        descrition: 'Продовольствие -20; Медикаменты -10; Напряженность +2',
                        probability: [1, 0.8, 0.6, 0.4, 0.3],
                        probabilityDependence: { type: 'Player', stat: 'Intelligence' },
                        effect: [{ stat: 'Anxiety', value: 2 }, { stat: 'Food', value: -20 }, { stat: 'Medicines', value: -10 }]
                    },
                ]
            },
            {
                title: 'Защищать бункер',
                consequences: [
                    {
                        type: 'Complex',
                        title: 'Вы смогли защитить свой бункер. Рейдеры отступили',
                        descrition: 'Напряженность -1',
                        probability: [0, 0.2, 0.4, 0.6, 0.7],
                        probabilityDependence: { type: 'Bunker', stat: 'Safety' },
                        effect: [{ stat: 'Anxiety', value: -1 }]
                    },
                    {
                        type: 'Complex',
                        title: 'Рейдеры оказались сильнее, вас ограбили',
                        descrition: 'Продовольствие -10; Медикаменты -5; Напряженность +2',
                        probability: [1, 0.8, 0.6, 0.4, 0.3],
                        probabilityDependence: { type: 'Bunker', stat: 'Safety' },
                        effect: [{ stat: 'Anxiety', value: 2 }, { stat: 'Food', value: -10 }, { stat: 'Medicines', value: -5 }]
                    },
                ]
            },
        ]
    }
]