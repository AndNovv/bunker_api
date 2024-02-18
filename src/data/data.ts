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

export type BunkerStats = 'Med' | 'Safety' | 'Anxiety' | 'Food' | 'Food Consumption' | 'Tech' | 'Medicines' | 'Med Consumption' | 'Vent System' | 'Water Cleaning System' | 'Electricity System'

export type BunkerStatEffectType = {
    stat: BunkerStats,
    value: number
}


const RoundsData = {
    2: [0, 0, 0, 0, 0, 0, 1],
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
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'bagage',
        name: 'Обмен багажом',
        used: false
    },
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'bodyType',
        name: 'Обмен телосложением',
        used: false
    },
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'trait',
        name: 'Обмен чертой характера',
        used: false
    },

    // Поменять одному игроку
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'health',
        name: 'Поменять здоровье',
        used: false
    },
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'hobby',
        name: 'Поменять хобби',
        used: false
    },
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'interestingFact',
        name: 'Поменять факт',
        used: false
    },
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'profession',
        name: 'Поменять профессию',
        used: false
    },
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'bagage',
        name: 'Поменять багаж',
        used: false
    },
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'bodyType',
        name: 'Поменять телосложение',
        used: false
    },
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'trait',
        name: 'Поменять черту характера',
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
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'bodyType',
        name: 'Поменять всем телосложение',
        used: false
    },
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'trait',
        name: 'Поменять всем черту характера',
        used: false
    },
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'bagage',
        name: 'Поменять всем багаж',
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
