import { PlayerStats, StatEffectType } from "./data"

type NamesOfBodyTypes = 'Худой' | 'Среднего телосложения' | 'Крепкий' | 'Атлетическое' | 'Полный' | 'Ожирение'

export type BodeType = {
    name: NamesOfBodyTypes,
    effect: StatEffectType[],
}

export const bodyTypes: BodeType[] = [
    {
        name: 'Худой',
        effect: [
            { stat: 'Phisics', value: 1 },
            { stat: 'Food Consumption', value: -1 },
        ],
    },
    {
        name: 'Среднего телосложения',
        effect: [
            { stat: 'Phisics', value: 2 },
        ],
    },
    {
        name: 'Крепкий',
        effect: [
            { stat: 'Phisics', value: 3 },
            { stat: 'Food Consumption', value: 1 },
        ],
    },
    {
        name: 'Атлетическое',
        effect: [
            { stat: 'Phisics', value: 4 },
            { stat: 'Food Consumption', value: 1 },
        ],
    },
    {
        name: 'Полный',
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Food Consumption', value: 1 },
        ],
    },
    {
        name: 'Ожирение',
        effect: [
            { stat: 'Phisics', value: -4 },
            { stat: 'Food Consumption', value: 2 },
        ],
    },
]

// Precalculated Average

const BodyTypeAllCombined: Record<PlayerStats, number> = {
    'Food Consumption': 4,
    'Intelligence': 0,
    'Med': 0,
    'Med Consumption': 0,
    'Phisics': 4,
    'Psycho': 0,
    'Social': 0,
    'Tech': 0
}

export const BodyTypeAverage: Record<PlayerStats, number> = {
    'Food Consumption': BodyTypeAllCombined["Food Consumption"] / bodyTypes.length,
    'Intelligence': BodyTypeAllCombined["Intelligence"] / bodyTypes.length,
    'Med': BodyTypeAllCombined["Med"] / bodyTypes.length,
    'Med Consumption': BodyTypeAllCombined["Med Consumption"] / bodyTypes.length,
    'Phisics': BodyTypeAllCombined["Phisics"] / bodyTypes.length,
    'Psycho': BodyTypeAllCombined["Psycho"] / bodyTypes.length,
    'Social': BodyTypeAllCombined["Social"] / bodyTypes.length,
    'Tech': BodyTypeAllCombined["Tech"] / bodyTypes.length,
};


// Calculations

// const BodyTypeAllCombined: Record<PlayerStats, number> = {
//     'Food Consumption': 0,
//     'Intelligence': 0,
//     'Med': 0,
//     'Med Consumption': 0,
//     'Phisics': 0,
//     'Psycho': 0,
//     'Social': 0,
//     'Tech': 0,
// };

// bodyTypes.map((bodytype) => {
//     bodytype.effect.map((statEffect) => {
//         BodyTypeAllCombined[statEffect.stat] += statEffect.value
//     })
// })

// export const BodyTypeAverage: Record<PlayerStats, number> = {
//     'Food Consumption': BodyTypeAllCombined["Food Consumption"] / bodyTypes.length,
//     'Intelligence': BodyTypeAllCombined["Intelligence"] / bodyTypes.length,
//     'Med': BodyTypeAllCombined["Med"] / bodyTypes.length,
//     'Med Consumption': BodyTypeAllCombined["Med Consumption"] / bodyTypes.length,
//     'Phisics': BodyTypeAllCombined["Phisics"] / bodyTypes.length,
//     'Psycho': BodyTypeAllCombined["Psycho"] / bodyTypes.length,
//     'Social': BodyTypeAllCombined["Social"] / bodyTypes.length,
//     'Tech': BodyTypeAllCombined["Tech"] / bodyTypes.length,
// };

// console.log(BodyTypeAllCombined)
// console.log(BodyTypeAverage)