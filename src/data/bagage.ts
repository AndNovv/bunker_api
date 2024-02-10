import { BunkerStatEffectType } from "./data"

export type Bagage = {
    name: string,
    effect: BunkerStatEffectType[]
}

export const bagage: Bagage[] = [

    // Food
    {
        name: 'Консервы с пастой карбонарой',
        effect: [
            { stat: 'Food', value: 2 },
        ],
    },
    {
        name: 'Пакет замороженных фруктов',
        effect: [
            { stat: 'Food', value: 2 },
        ],
    },
    {
        name: 'Кукурузные чипсы',
        effect: [
            { stat: 'Food', value: 1 },
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Крекеры с сыром',
        effect: [
            { stat: 'Food', value: 1 },
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Порционные пакеты овсянки',
        effect: [
            { stat: 'Food', value: 2 },
        ],
    },
    {
        name: 'Сухие супы в порционных упаковках',
        effect: [
            { stat: 'Food', value: 2 },
        ],
    },
    {
        name: 'Компактные энергетические батончики',
        effect: [
            { stat: 'Food', value: 1 },
        ],
    },
    {
        name: 'Банка с медом',
        effect: [
            { stat: 'Food', value: 1 },
            { stat: 'Medicines', value: 2 },
        ],
    },
    {
        name: 'Консервированный гуляш',
        effect: [
            { stat: 'Food', value: 2 },
        ],
    },
    {
        name: 'Пачка орехов',
        effect: [
            { stat: 'Food', value: 1 },
        ],
    },
    {
        name: 'Макароны в вакуумной упаковке',
        effect: [
            { stat: 'Food', value: 2 },
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Зерновые батончики',
        effect: [
            { stat: 'Food', value: 1 },
        ],
    },
    {
        name: 'Коктейльные сухофрукты',
        effect: [
            { stat: 'Food', value: 1 },
        ],
    },
    {
        name: 'Пачка куриного супа',
        effect: [
            { stat: 'Food', value: 2 },
            { stat: 'Medicines', value: 1 },
        ],
    },
    {
        name: 'Банка тунца',
        effect: [
            { stat: 'Food', value: 2 },
        ],
    },
    {
        name: 'Рисовые хлопья',
        effect: [
            { stat: 'Food', value: 2 },
        ],
    },
    {
        name: 'Консервы с фасолью в томатном соусе',
        effect: [
            { stat: 'Food', value: 2 },
        ],
    },
    {
        name: 'Суп-пюре в порциях',
        effect: [
            { stat: 'Food', value: 2 },
            { stat: 'Medicines', value: 1 },
        ],
    },
    {
        name: 'Сушеная колбаса',
        effect: [
            { stat: 'Food', value: 2 },
        ],
    },


    // Tools
    {
        name: 'Мультитул',
        effect: [
            { stat: 'Tech', value: 2 },
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Складные ножницы',
        effect: [
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Молоток-тент',
        effect: [
            { stat: 'Tech', value: 1 },
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Компактная лопата',
        effect: [
            { stat: 'Tech', value: 2 },
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Набор отверток',
        effect: [
            { stat: 'Tech', value: 2 },
        ],
    },
    {
        name: 'Универсальный ключ',
        effect: [
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Мини-электрическая дрель',
        effect: [
            { stat: 'Tech', value: 2 },
        ],
    },
    {
        name: 'Переносная паяльная станция',
        effect: [
            { stat: 'Tech', value: 2 },
        ],
    },
    {
        name: 'Клей-карандаш',
        effect: [
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Сверлильный набор',
        effect: [
            { stat: 'Tech', value: 2 },
        ],
    },
    {
        name: 'Набор изоленты',
        effect: [
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Набор кистей и красок',
        effect: [
            { stat: 'Tech', value: 1 },
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Складная пила',
        effect: [
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Линейка с уровнем',
        effect: [
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Клещи-мультитул',
        effect: [
            { stat: 'Tech', value: 2 },
        ],
    },
    {
        name: 'Металлическая пила',
        effect: [
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Складной трубчатый ключ',
        effect: [
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Шлифовальная бумага',
        effect: [
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Шуруповерт',
        effect: [
            { stat: 'Tech', value: 2 },
        ],
    },

    // Defense
    {
        name: 'Фонарик с резиновым корпусом и парализующим лучом',
        effect: [
            { stat: 'Safety', value: 3 },
        ],
    },
    {
        name: 'Перчатки с усиленными костяшками',
        effect: [
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Тактический фонарь с дымовой шашкой',
        effect: [
            { stat: 'Safety', value: 2 },
        ],
    },
    {
        name: 'Набор дымовых гранат',
        effect: [
            { stat: 'Safety', value: 2 },
        ],
    },
    {
        name: 'Спрей с перцем',
        effect: [
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Тактический нож',
        effect: [
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Радиостанция с функцией шифрования данных',
        effect: [
            { stat: 'Safety', value: 1 },
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Тренировочные нунчаки',
        effect: [
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Электрошокер',
        effect: [
            { stat: 'Safety', value: 2 },
        ],
    },
    {
        name: 'Компактный газовый баллончик',
        effect: [
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Тактическая каска',
        effect: [
            { stat: 'Safety', value: 2 },
        ],
    },
    {
        name: 'Защитные перчатки',
        effect: [
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Тактический рюкзак с бронированными вставками',
        effect: [
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Защитные очки',
        effect: [
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Набор кастетов',
        effect: [
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Пневматическая винтовка',
        effect: [
            { stat: 'Safety', value: 3 },
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Противогаз',
        effect: [
            { stat: 'Safety', value: 2 },
            { stat: 'Medicines', value: 1 },
        ],
    },
    {
        name: 'Компактная телескопический дубинка',
        effect: [
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Защитный костюм',
        effect: [
            { stat: 'Safety', value: 2 },
        ],
    },

    // Medicines
    {
        name: 'Антисептический гель',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Обезболивающие таблетки',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Антигриппин',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Противовоспалительные мази',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Антигистаминные таблетки',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Таблетки от диареи',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Витаминный комплекс',
        effect: [
            { stat: "Medicines", value: 1 },
        ],
    },
    {
        name: 'Жаропонижающие сиропы',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Противорвотные препараты',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Противозачаточные средства',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Антиаллергические капли',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Антималярийные таблетки',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Препараты от укачивания',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Таблетки от похмелья',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Спрей от насморка',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Противогрибковые мази',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Капли для глаз',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Противозачаточные прокладки',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Средства от ожогов',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },
    {
        name: 'Таблетки от стресса',
        effect: [
            { stat: "Medicines", value: 2 },
        ],
    },

    // Entertainment
    {
        name: 'Монополия',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: '5 колод карт',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Умные головоломки',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Планшет с предустановленными книгами и фильмами',
        effect: [
            { stat: 'Anxiety', value: -2 },
        ],
    },
    {
        name: 'Набор для рисования',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Гитара',
        effect: [
            { stat: 'Anxiety', value: -2 },
        ],
    },
    {
        name: 'Дневник для записей и рисунков',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Компактный настольный футбол',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Радио',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Проводные наушники',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Магнитные пазлы',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Фотоаппарат',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Бинокль для наблюдения за природой',
        effect: [
            { stat: 'Anxiety', value: -1 },
            { stat: 'Safety', value: 1 },
        ],
    },
    {
        name: 'Журналы комиксов и романов',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Лупа для изучения мелких деталей',
        effect: [
            { stat: 'Anxiety', value: -1 },
            { stat: 'Tech', value: 1 },
        ],
    },
    {
        name: 'Комплект для рисования на песке',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },
    {
        name: 'Коллекция музыкальных альбомов',
        effect: [
            { stat: 'Anxiety', value: -1 },
        ],
    },

]