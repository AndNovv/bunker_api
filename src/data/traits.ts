import { StatEffectType } from "./data"

export type Trait = {
    name: string,
    effect: StatEffectType[]
}

export const traits: Trait[] = [

    // Positive
    {
        name: 'Терпимость',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Med', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Честность',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Intelligence', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Ответственность',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Дружелюбие',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Med', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Оптимизм',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Med', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Трудолюбие',
        effect: [
            { stat: 'Phisics', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Самостоятельность',
        effect: [
            { stat: 'Phisics', value: 1 },
            { stat: 'Tech', value: 2 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Скромность',
        effect: [
            { stat: 'Psycho', value: 1 },
            { stat: 'Food Consumption', value: -1 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Уверенность в себе',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Phisics', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Смелость',
        effect: [
            { stat: 'Phisics', value: 2 },
            { stat: 'Med', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Эмпатия',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Med', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Самокритичность',
        effect: [
            { stat: 'Psycho', value: 1 },
            { stat: 'Intelligence', value: 2 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Тактичность',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Коммуникабельность',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Терпение',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Med', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Щедрость',
        effect: [
            { stat: 'Med', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Спонтанность',
        effect: [
            { stat: 'Psycho', value: 1 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Уважение к другим',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Амбициозность',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Intelligence', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Креативность',
        effect: [
            { stat: 'Intelligence', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Самодисциплина',
        effect: [
            { stat: 'Psycho', value: 1 },
            { stat: 'Tech', value: 2 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Решительность',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Phisics', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Обаяние',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Стрессоустойчивость',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Med', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Искренность',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Чувство юмора',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Intelligence', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Лояльность',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Заботливость',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Med', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Надежность',
        effect: [
            { stat: 'Tech', value: 2 },
            { stat: 'Med', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Великодушие',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Social', value: 2 },
            { stat: 'Med', value: 1 }
        ]
    },
    {
        name: 'Романтичность',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Вежливость',
        effect: [
            { stat: 'Psycho', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Самоконтроль',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Целеустремленность',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Гибкость',
        effect: [
            { stat: 'Phisics', value: 1 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Обучаемость',
        effect: [
            { stat: 'Intelligence', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Аккуратность',
        effect: [
            { stat: 'Tech', value: 2 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Самообладание',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: 'Оптимизм',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Аналитичность',
        effect: [
            { stat: 'Intelligence', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Энергичность',
        effect: [
            { stat: 'Phisics', value: 2 },
            { stat: 'Tech', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Самоирония',
        effect: [
            { stat: 'Psycho', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: 'Умение прощать',
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Social', value: 2 }
        ]
    },


    // Negative
    {
        name: 'Злопамятность',
        effect: [
            { stat: 'Psycho', value: -2 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Эгоизм',
        effect: [
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Лживость',
        effect: [
            { stat: 'Psycho', value: -2 },
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Безответственность',
        effect: [
            { stat: 'Psycho', value: -2 },
            { stat: 'Tech', value: -1 },
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Хамство',
        effect: [
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Пессимизм',
        effect: [
            { stat: 'Psycho', value: -2 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Ленивость',
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Tech', value: -1 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Завистливость',
        effect: [
            { stat: 'Psycho', value: -2 },
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Нарциссизм',
        effect: [
            { stat: 'Psycho', value: -2 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Трусость',
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Psycho', value: -1 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Безразличие',
        effect: [
            { stat: 'Psycho', value: -1 },
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Агрессивность',
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Жадность',
        effect: [
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Импульсивность',
        effect: [
            { stat: 'Tech', value: -1 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Жестокость',
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Несамостоятельность',
        effect: [
            { stat: 'Tech', value: -2 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Неверность',
        effect: [
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Замкнутость',
        effect: [
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Наивность',
        effect: [
            { stat: 'Intelligence', value: -2 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Суетливость',
        effect: [
            { stat: 'Psycho', value: -1 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Недостаток эмпатии',
        effect: [
            { stat: 'Psycho', value: -2 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Невнимательность',
        effect: [
            { stat: 'Intelligence', value: -2 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Нелюбезность',
        effect: [
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Скупость',
        effect: [
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Поверхностность',
        effect: [
            { stat: 'Intelligence', value: -2 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Неуважение к другим',
        effect: [
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Легкомысленность',
        effect: [
            { stat: 'Psycho', value: -1 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Беспокойство',
        effect: [
            { stat: 'Psycho', value: -1 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Ненадежность',
        effect: [
            { stat: 'Tech', value: -2 },
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Чрезмерная агрессия',
        effect: [
            { stat: 'Phisics', value: -2 },
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: 'Чрезмерная эмоциональность',
        effect: [
            { stat: 'Psycho', value: -2 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: 'Навязчивость',
        effect: [
            { stat: 'Tech', value: -1 },
            { stat: 'Social', value: -2 }
        ]
    },
]