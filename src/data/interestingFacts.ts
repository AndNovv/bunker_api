import { StatEffectType } from "./data";

export type InterestingFact = {
    name: string,
    effect: StatEffectType[]
}

export const interestingFacts: InterestingFact[] = [
    {
        name: "Овладел искусством создания своей линии уникальных керамических фигур.",
        effect: [
            { stat: 'Tech', value: 1 }
        ]
    },
    {
        name: "Путешествовал по миру, участвуя в международных соревнованиях по дисциплине 'горные дистанции'.",
        effect: [
            { stat: 'Phisics', value: 3 },
            { stat: 'Social', value: 2 }
        ]
    },
    {
        name: "Организовал летнюю школу по изучению традиционных музыкальных инструментов.",
        effect: [
            { stat: 'Social', value: 2 },
            { stat: 'Intelligence', value: 1 }
        ]
    },
    {
        name: "Собрал коллекцию необычных книг, написанных на вымирающих языках.",
        effect: [
            { stat: 'Intelligence', value: 2 }
        ]
    },
    {
        name: "Провел неделю в полном молчании в монастыре, практикуя медитацию.",
        effect: [
            { stat: 'Psycho', value: 3 }
        ]
    },
    {
        name: "Создал уникальный вид искусства из отработанных автомобильных деталей.",
        effect: [
            { stat: 'Tech', value: 2 }
        ]
    },
    {
        name: "Открыл собственную линию ароматов, вдохновленных путешествиями по разным континентам.",
        effect: [
            { stat: 'Intelligence', value: 1 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: "Прошел обучение по технике фехтования и выиграл турнир в своем городе.",
        effect: [
            { stat: 'Phisics', value: 2 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: "Внес свой вклад в науку, изучая редкие виды морских губок в глубинах океана.",
        effect: [
            { stat: 'Intelligence', value: 3 },
            { stat: 'Tech', value: 1 }
        ]
    },
    {
        name: "Стал экспертом в области языка птиц, различая их пением и обучая других этому удивительному навыку.",
        effect: [
            { stat: 'Intelligence', value: 2 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: "Занимается редким видом медитации – прогулками по лесу, соединяясь с природой и окружающей средой.",
        effect: [
            { stat: 'Psycho', value: 2 }
        ]
    },
    {
        name: "Создал собственную карту звездного неба, фиксируя важные события в своей жизни через астрономические объекты.",
        effect: [
            { stat: 'Intelligence', value: 1 },
        ]
    },
    {
        name: "Освоил искусство биологической скульптуры, создавая уникальные формы из растений.",
        effect: [
            { stat: 'Tech', value: 2 },
            { stat: 'Phisics', value: 1 }
        ]
    },
    {
        name: "Провел лето, прожив в старинном монастыре в горах, обучаясь тайнам монашеской жизни.",
        effect: [
            { stat: 'Psycho', value: 2 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: "Случайно стал участником телевизионной игры и выиграл небольшую сумму денег.",
        effect: [
            { stat: 'Social', value: 1 },
            { stat: 'Phisics', value: 1 }
        ]
    },
    {
        name: "Участвовал в школьной постановке и исполнил роль дерзкого пирата.",
        effect: [
            { stat: 'Social', value: 1 },
            { stat: 'Phisics', value: 1 }
        ]
    },
    {
        name: "Участвовал в общественных работах, ремонтируя детскую площадку.",
        effect: [
            { stat: 'Social', value: 2 },
            { stat: 'Phisics', value: 1 }
        ]
    },
    {
        name: "В детстве занимался продажей самодельных пирожных в школе.",
        effect: [
            { stat: 'Social', value: 1 },
            { stat: 'Food Consumption', value: 1 }
        ]
    },
    {
        name: "Путешествовал по городу на велосипеде, доставляя пиццу вечерами.",
        effect: [
            { stat: 'Phisics', value: 2 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: "Работал на стройке, чтобы оплатить обучение младшего брата.",
        effect: [
            { stat: 'Phisics', value: 2 },
            { stat: 'Social', value: 1 }
        ]
    },
    {
        name: "Входит в топ 100 моделей OnlyFans.",
        effect: [
            { stat: 'Social', value: 2 },
            { stat: 'Phisics', value: 1 }
        ]
    },
    {
        name: "Постоянно рассказывает свои самые нелепые сны и требует, чтобы окружающие высказывали свои трактовки.",
        effect: [
            { stat: 'Psycho', value: 1 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: "Окончил школу с трудностями и втянулся в небольшую банду в подворотнях.",
        effect: [
            { stat: 'Social', value: -1 },
            { stat: 'Phisics', value: 1 }
        ]
    },
    {
        name: "Сел в тюрьму после драки в баре, в которой по ошибке выбил зуб случайному прохожему.",
        effect: [
            { stat: 'Psycho', value: -2 },
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: "Участвовал в краже велосипедов, пока не попался.",
        effect: [
            { stat: 'Social', value: -1 },
            { stat: 'Intelligence', value: -1 }
        ]
    },
    {
        name: "Спрятался от полиции в чужом доме, думая, что его не заметят.",
        effect: [
            { stat: 'Psycho', value: -1 },
            { stat: 'Intelligence', value: -1 }
        ]
    },
    {
        name: "Продал поддельные товары в Интернете, пока не попался на афере с фальшивыми кредитными картами.",
        effect: [
            { stat: 'Intelligence', value: -1 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: "Стал поставщиком запрещенных веществ в своем районе, что привело к серьезным последствиям.",
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: "Пытался обойти систему, взламывая банковские счета, но попался на удочку киберполиции.",
        effect: [
            { stat: 'Intelligence', value: -2 },
            { stat: 'Tech', value: 1 }
        ]
    },
    {
        name: "Верил в собственные 'секретные знания' и участвовал в секте, потеряв многих близких друзей.",
        effect: [
            { stat: 'Psycho', value: -2 },
            { stat: 'Social', value: -2 }
        ]
    },
    {
        name: "Попал в серьезное финансовое затруднение из-за азартных игр в онлайн-казино.",
        effect: [
            { stat: 'Psycho', value: -2 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: "Потерял опеку над детьми из-за проблем с алкогольной зависимостью.",
        effect: [
            { stat: 'Psycho', value: -3 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: "Попал в аварию из-за вождения в нетрезвом состоянии, лишившись прав.",
        effect: [
            { stat: 'Phisics', value: -1 },
            { stat: 'Psycho', value: -2 },
            { stat: 'Social', value: -1 }
        ]
    },
    {
        name: "Систематически изменяет своему партнеру.",
        effect: [
            { stat: 'Social', value: -1 },
            { stat: 'Psycho', value: -1 }
        ]
    }
];