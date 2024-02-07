import { PlayerStats, StatEffectType } from "./data";

export type HealthConditionType = {
    name: string,                       // Название болезни, заболевания, состояния здоровья
    lethal: number,                     // Вероятность смерти с этим заболеванием (0 - не опасно, 1 - вероятность смерти очень велика)
    contagious: number,                 // Вероятность заразить окружающих (0 - нельзя заразить, 1 - заражение крайне вероятно)
    cureProbability: number,            // Вероятность вылечиться в ближайший месяц (0 - шансов нет, 1 - 100%)
    effect: StatEffectType[]            // Как болезнь влияет на статистику человека (физическую форму 'Physics', интеллект 'Intelligence', психологическая устойчивость 'Psycho')
}

export const healthConditions: HealthConditionType[] = [

    // Healthy
    {
        name: 'Абсолютно здоров',
        lethal: 0,
        contagious: 0,
        cureProbability: 1,
        effect: [],
    },

    // Common Health Conditions
    {
        name: 'Гипертония',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.1,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Med Consumption', value: 2 },
        ],
    },
    {
        name: 'Артрит',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.5,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Tech', value: -1 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },
    {
        name: 'Мигрень',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.9,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -2 },
            { stat: 'Med Consumption', value: 2 },
        ],
    },
    {
        name: 'Диспепсия',
        lethal: 0.02,
        contagious: 0,
        cureProbability: 0.3,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 1 },
        ],
    },
    {
        name: 'Панкреатит',
        lethal: 0.2,
        contagious: 0,
        cureProbability: 0.4,
        effect: [
            { stat: 'Phisics', value: -3 },
            { stat: 'Intelligence', value: -2 },
            { stat: 'Tech', value: -2 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },
    {
        name: 'Нарушение сна',
        lethal: 0.01,
        contagious: 0,
        cureProbability: 0.3,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -3 },
            { stat: 'Med Consumption', value: 2 },
        ],
    },
    {
        name: 'Гастрит',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.1,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -2 },
            { stat: 'Med Consumption', value: 2 },
        ],
    },
    {
        name: 'Ожирение',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.1,
        effect: [
            { stat: 'Phisics', value: -4 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -3 },
        ],
    },
    {
        name: 'Синдром хронической усталости',
        lethal: 0.02,
        contagious: 0,
        cureProbability: 0.2,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -2 },
            { stat: 'Med Consumption', value: 1 },
        ],
    },
    {
        name: 'Остеоартроз',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.5,
        effect: [
            { stat: 'Phisics', value: -3 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },

    // Psycho
    {
        name: 'Депрессия',
        lethal: 0.2,
        contagious: 0,
        cureProbability: 0.4,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Psycho', value: -4 },
            { stat: 'Med Consumption', value: 2 },
            { stat: 'Social', value: -2 },

        ],
    },
    {
        name: 'Посттравматическое стрессовое расстройство (ПТСР)',
        lethal: 0.2,
        contagious: 0,
        cureProbability: 0.3,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -2 },
            { stat: 'Tech', value: -3 },
            { stat: 'Psycho', value: -4 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },
    {
        name: 'Биполярное расстройство',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.05,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -2 },
            { stat: 'Tech', value: -2 },
            { stat: 'Psycho', value: -3 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },
    {
        name: 'Склонность к паническим атакам',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.2,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -1 },
        ],
    },
    {
        name: 'Шизофрения',
        lethal: 0.33,
        contagious: 0,
        cureProbability: 0.05,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -2 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -5 },
            { stat: 'Med Consumption', value: 5 },
            { stat: 'Social', value: -3 },
        ],
    },
    {
        name: 'Обсессивно-компульсивное расстройство (ОКР)',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.15,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -2 },
        ],
    },
    {
        name: 'Анорексия',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.05,
        effect: [
            { stat: 'Phisics', value: -4 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 1 },
        ],
    },
    {
        name: 'Булимия',
        lethal: 0.2,
        contagious: 0,
        cureProbability: 0.3,
        effect: [
            { stat: 'Phisics', value: -3 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -3 },
            { stat: 'Food Consumption', value: 2 },
            { stat: 'Med Consumption', value: 1 },
        ],
    },
    {
        name: 'Паранойя',
        lethal: 0.1,
        contagious: 0,
        cureProbability: 0.2,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -4 },
            { stat: 'Med Consumption', value: 2 },
            { stat: 'Social', value: -1 },

        ],
    },

    // Contagious
    {
        name: 'Грипп',
        lethal: 0.1,
        contagious: 0.8,
        cureProbability: 0.9,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 2 },
        ],
    },
    {
        name: 'Корь',
        lethal: 0.2,
        contagious: 0.9,
        cureProbability: 0.8,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -2 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },
    {
        name: 'Туберкулез',
        lethal: 0.3,
        contagious: 0.7,
        cureProbability: 0.7,
        effect: [
            { stat: 'Phisics', value: -3 },
            { stat: 'Intelligence', value: -2 },
            { stat: 'Tech', value: -2 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 4 },
        ],
    },
    {
        name: 'ВИЧ/СПИД',
        lethal: 0.3,
        contagious: 0.1,
        cureProbability: 0.1,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 4 },
        ],
    },
    {
        name: 'Сифилис',
        lethal: 0.2,
        contagious: 0.5,
        cureProbability: 0.6,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -2 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },
    {
        name: 'Эбола',
        lethal: 0.9,
        contagious: 0.9,
        cureProbability: 0.1,
        effect: [
            { stat: 'Phisics', value: -4 },
            { stat: 'Intelligence', value: -2 },
            { stat: 'Tech', value: -2 },
            { stat: 'Psycho', value: -3 },
            { stat: 'Med Consumption', value: 4 },
        ],
    },
    {
        name: 'Сальмонеллез',
        lethal: 0.1,
        contagious: 0.6,
        cureProbability: 0.8,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -2 },
            { stat: 'Tech', value: -2 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 2 },
        ],
    },
    {
        name: 'Лихорадка денге',
        lethal: 0.2,
        contagious: 0.7,
        cureProbability: 0.5,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -3 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },
    {
        name: 'Гепатит А',
        lethal: 0.1,
        contagious: 0.5,
        cureProbability: 0.6,
        effect: [
            { stat: 'Phisics', value: -3 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -2 },
            { stat: 'Med Consumption', value: 4 },
        ],
    },
    {
        name: 'Коклюш',
        lethal: 0.1,
        contagious: 0.8,
        cureProbability: 0.7,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },


    // Chronic
    {
        name: 'Сахарный диабет',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.05,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },
    {
        name: 'Артериальная гипертензия',
        lethal: 0.1,
        contagious: 0,
        cureProbability: 0.05,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 1 },
        ],
    },
    {
        name: 'Бронхиальная астма',
        lethal: 0.08,
        contagious: 0,
        cureProbability: 0,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },
    {
        name: 'Рак',
        lethal: 0.2,
        contagious: 0,
        cureProbability: 0.05,
        effect: [
            { stat: 'Phisics', value: -3 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -3 },
            { stat: 'Med Consumption', value: 2 },
        ],
    },
    {
        name: 'Хроническая обструктивная болезнь легких (ХОБЛ)',
        lethal: 0.1,
        contagious: 0,
        cureProbability: 0.1,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -2 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },
    {
        name: 'Болезнь Альцгеймера',
        lethal: 0.1,
        contagious: 0,
        cureProbability: 0.1,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Intelligence', value: -5 },
            { stat: 'Tech', value: -5 },
            { stat: 'Psycho', value: -4 },
            { stat: 'Social', value: -4 },
            { stat: 'Med Consumption', value: 4 },
        ],
    },
    {
        name: 'Паркинсонизм',
        lethal: 0.1,
        contagious: 0,
        cureProbability: 0,
        effect: [
            { stat: 'Phisics', value: -3 },
            { stat: 'Intelligence', value: -2 },
            { stat: 'Tech', value: -2 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 2 },
        ],
    },
    {
        name: 'Ревматоидный артрит',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0,
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Intelligence', value: -2 },
            { stat: 'Tech', value: -2 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },
    {
        name: 'Хронический гепатит',
        lethal: 0.4,
        contagious: 0,
        cureProbability: 0.2,
        effect: [
            { stat: 'Phisics', value: -3 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -2 },
            { stat: 'Med Consumption', value: 5 },
        ],
    },
    {
        name: 'Хроническая почечная недостаточность',
        lethal: 0.2,
        contagious: 0,
        cureProbability: 0,
        effect: [
            { stat: 'Phisics', value: -4 },
            { stat: 'Intelligence', value: -2 },
            { stat: 'Tech', value: -2 },
            { stat: 'Psycho', value: -3 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },

    // Eyes
    {
        name: 'Катаракта',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0,
        effect: [
            { stat: 'Phisics', value: -4 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -3 },
            { stat: 'Psycho', value: -2 },
            { stat: 'Med Consumption', value: 1 },
        ],
    },
    {
        name: 'Глаукома',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.1,
        effect: [
            { stat: 'Phisics', value: -3 },
            { stat: 'Intelligence', value: -1 },
            { stat: 'Tech', value: -2 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Med Consumption', value: 1 },
        ],
    },
    {
        name: 'Дальнозоркость',
        lethal: 0,
        contagious: 0,
        cureProbability: 0.03,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Tech', value: -2 },
        ],
    },
    {
        name: 'Близорукость',
        lethal: 0,
        contagious: 0,
        cureProbability: 0.03,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Tech', value: -1 },
        ],
    },
    {
        name: 'Астигматизм',
        lethal: 0,
        contagious: 0,
        cureProbability: 0.03,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Tech', value: -1 },
        ],
    },
    {
        name: 'Нистагм (непроизвольные движения глаз)',
        lethal: 0.05,
        contagious: 0,
        cureProbability: 0.02,
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Tech', value: -1 },
            { stat: 'Psycho', value: -2 },
            { stat: 'Med Consumption', value: 3 },
        ],
    },
];


const HealthAllCombined: Record<PlayerStats, number> = {
    'Food Consumption': 0,
    'Intelligence': 0,
    'Med': 0,
    'Med Consumption': 0,
    'Phisics': 0,
    'Psycho': 0,
    'Social': 0,
    'Tech': 0,
};

healthConditions.map((condition) => {
    condition.effect.map((statEffect) => {
        HealthAllCombined[statEffect.stat] += statEffect.value
    })
})

export const HealthAverage: Record<PlayerStats, number> = {
    'Food Consumption': HealthAllCombined["Food Consumption"] / healthConditions.length,
    'Intelligence': HealthAllCombined["Intelligence"] / healthConditions.length,
    'Med': HealthAllCombined["Med"] / healthConditions.length,
    'Med Consumption': HealthAllCombined["Med Consumption"] / healthConditions.length,
    'Phisics': HealthAllCombined["Phisics"] / healthConditions.length,
    'Psycho': HealthAllCombined["Psycho"] / healthConditions.length,
    'Social': HealthAllCombined["Social"] / healthConditions.length,
    'Tech': HealthAllCombined["Tech"] / healthConditions.length,
};
