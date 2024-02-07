import { ActionCardType } from "../types";

import { healthConditions } from "./healthConditions";
import { professions } from "./professions";
import { bodyTypes } from "./bodyTypes";
import { hobbies } from "./hobbies";
import { traits } from "./traits";
import { interestingFacts } from "./interestingFacts";
import { bagage } from "./bagage";

export { healthConditions, professions, bodyTypes, hobbies, traits, interestingFacts, bagage }

export type PlayerStats = 'Phisics' | 'Intelligence' | 'Tech' | 'Psycho' | 'Social' | 'Med' | 'Food Consumption' | 'Med Consumption'

export type StatEffectType = {
    stat: PlayerStats,
    value: number
}

export type BunkerStats = 'Med' | 'Safety' | 'Anxiety' | 'Food' | 'Food Consumption' | 'Tech' | 'Medicines' | 'Med Consumption'

export type BunkerStatEffectType = {
    stat: BunkerStats,
    value: number
}


const RoundsData = {
    2: [1, 0, 0, 0, 0, 0, 0],
    3: [0, 0, 0, 0, 0, 0, 1],
    4: [0, 0, 0, 1, 0, 0, 1],
    5: [0, 0, 0, 1, 0, 0, 1],
    6: [0, 0, 0, 1, 0, 1, 1],
    7: [0, 0, 0, 1, 1, 1, 1],
    8: [0, 0, 0, 1, 1, 1, 1],
    9: [0, 0, 1, 1, 1, 1, 1],
    10: [0, 0, 1, 1, 1, 1, 1],
    11: [0, 1, 1, 1, 1, 1, 1],
    12: [0, 1, 1, 1, 1, 1, 1],
    13: [0, 1, 1, 1, 1, 1, 2],
    14: [0, 1, 1, 1, 1, 1, 2],
    15: [0, 1, 1, 1, 1, 2, 2],
    16: [0, 1, 1, 1, 1, 2, 2],
}

export const numberOfRounds = 7

export const GameFlow = new Map(Object.entries(RoundsData))


export const ActionCards: ActionCardType[] = [

    // Обмен
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'health',
        name: 'Обмен здоровьем',
        used: false
    },
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'hobby',
        name: 'Обмен хобби',
        used: false
    },
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'interestingFact',
        name: 'Обмен фактами',
        used: false
    },
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'profession',
        name: 'Обмен профессиями',
        used: false
    },

    // Полная замена
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'health',
        name: 'Поменять всем здоровье',
        used: false
    },
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'hobby',
        name: 'Поменять всем хобби',
        used: false
    },
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'interestingFact',
        name: 'Поменять всем факт',
        used: false
    },
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'profession',
        name: 'Поменять всем профессию',
        used: false
    },

    // Изменение одной характеристики
    {
        key: 'rejuvenate',
        type: 'pick',
        serverType: 'unique',
        char: 'age',
        name: 'Омолодить на 20 лет',
        used: false
    },
    {
        key: 'changeSex',
        type: 'pick',
        serverType: 'unique',
        char: 'sex',
        name: 'Поменять пол любому игроку',
        used: false
    },
    {
        key: 'cure',
        type: 'pick except yourself',
        serverType: 'cure',
        char: 'health',
        name: 'Вылечить игрока',
        used: false
    },
]
