import { StatEffectType } from "./data";

export type Profession = {
    name: string,
    effect: StatEffectType[]
}

export const professions: Profession[] = [
    // Intelligence
    { name: "Физик", effect: [{ stat: 'Intelligence', value: 5 }, { stat: 'Tech', value: 3 }] },
    { name: "Квантовый физик", effect: [{ stat: 'Intelligence', value: 5 }] },
    { name: "Нейрохирург", effect: [{ stat: 'Intelligence', value: 5 }, { stat: 'Med', value: 4 }] },

    { name: "Теоретик вычислений", effect: [{ stat: 'Intelligence', value: 4 }] },
    { name: "Астрофизик", effect: [{ stat: 'Intelligence', value: 4 }] },
    { name: "Геофизик", effect: [{ stat: 'Intelligence', value: 4 }] },
    { name: "Микробиолог", effect: [{ stat: 'Intelligence', value: 4 }, { stat: 'Med', value: 1 }] },
    { name: "Биоинформатик", effect: [{ stat: 'Intelligence', value: 4 }, { stat: 'Med', value: 1 }] },
    { name: "Робототехник", effect: [{ stat: 'Intelligence', value: 4 }, { stat: 'Tech', value: 4 }] },
    { name: "Ракетный ученый", effect: [{ stat: 'Intelligence', value: 4 }, { stat: 'Tech', value: 4 }] },
    { name: "Исследователь искусственного интеллекта", effect: [{ stat: 'Intelligence', value: 4 }] },
    { name: "Генетик", effect: [{ stat: 'Intelligence', value: 4 }, { stat: 'Med', value: 1 }] },
    { name: "Криптограф", effect: [{ stat: 'Intelligence', value: 4 }] },
    { name: "Нейробиолог", effect: [{ stat: 'Intelligence', value: 4 }, { stat: 'Med', value: 1 }] },

    { name: "Хирург", effect: [{ stat: 'Intelligence', value: 3 }, { stat: 'Med', value: 5 }] },
    { name: "Финансовый аналитик", effect: [{ stat: 'Intelligence', value: 3 }] },
    { name: "Космолог", effect: [{ stat: 'Intelligence', value: 3 }] },
    { name: "Экономист", effect: [{ stat: 'Intelligence', value: 3 }] },
    { name: "Астроном", effect: [{ stat: 'Intelligence', value: 3 }] },
    { name: "Эколог", effect: [{ stat: 'Intelligence', value: 3 }] },
    { name: "Врач", effect: [{ stat: 'Intelligence', value: 3 }, { stat: 'Social', value: 1 }, { stat: 'Med', value: 4 }] },

    { name: "Фармацевт", effect: [{ stat: 'Intelligence', value: 2 }, { stat: 'Med', value: 3 }] },
    { name: "Геодезист", effect: [{ stat: 'Intelligence', value: 2 }, { stat: 'Phisics', value: 2 }] },
    { name: "Лингвистический аналитик", effect: [{ stat: 'Intelligence', value: 2 }] },
    { name: "Философ", effect: [{ stat: 'Intelligence', value: 2 }] },

    // Social
    { name: "Психолог", effect: [{ stat: 'Social', value: 5 }, { stat: 'Psycho', value: 3 }] },
    { name: "Социальный работник", effect: [{ stat: 'Social', value: 5 }] },
    { name: "Дипломат", effect: [{ stat: 'Social', value: 5 }, { stat: 'Intelligence', value: 2 }] },
    { name: "Журналист", effect: [{ stat: 'Social', value: 5 }, { stat: 'Intelligence', value: 1 }] },

    { name: "Психотерапевт", effect: [{ stat: 'Social', value: 4 }, { stat: 'Psycho', value: 2 }, { stat: 'Med', value: 1 }] },
    { name: "Событийный организатор", effect: [{ stat: 'Social', value: 4 }] },
    { name: "Актер", effect: [{ stat: 'Social', value: 4 }] },
    { name: "Психиатр", effect: [{ stat: 'Social', value: 4 }, { stat: 'Psycho', value: 2 }, { stat: 'Med', value: 2 }] },
    { name: "Учитель", effect: [{ stat: 'Social', value: 4 }, { stat: 'Intelligence', value: 2 }] },
    { name: "Терапевт", effect: [{ stat: 'Social', value: 4 }, { stat: 'Intelligence', value: 2 }, { stat: 'Med', value: 2 }] },
    { name: "Медсестра", effect: [{ stat: 'Social', value: 4 }, { stat: 'Intelligence', value: 1 }, { stat: 'Med', value: 2 }] },
    { name: "Волонтер", effect: [{ stat: 'Social', value: 4 }] },
    { name: "Адвокат", effect: [{ stat: 'Social', value: 3 }, { stat: 'Intelligence', value: 3 }] },
    { name: "Бармен", effect: [{ stat: 'Social', value: 3 }] },
    { name: "Официант", effect: [{ stat: 'Social', value: 3 }] },
    { name: "Стюардесса", effect: [{ stat: 'Social', value: 3 }, { stat: 'Med', value: 1 }] },
    { name: "Коуч", effect: [{ stat: 'Social', value: 3 }] },
    { name: "Экскурсовод", effect: [{ stat: 'Social', value: 3 }, { stat: 'Intelligence', value: 1 }] },
    { name: "Продавец-консультант", effect: [{ stat: 'Social', value: 3 }] },
    { name: "Организатор свадеб", effect: [{ stat: 'Social', value: 3 }] },

    { name: "Маркетолог", effect: [{ stat: 'Social', value: 2 }, { stat: 'Intelligence', value: 2 }] },

    //Phisics
    { name: "Спортсмен", effect: [{ stat: 'Phisics', value: 5 }, { stat: 'Social', value: 2 }, { stat: 'Food Consumption', value: 1 }] },
    { name: "Спасатель", effect: [{ stat: 'Phisics', value: 5 }, { stat: 'Food Consumption', value: 1 }, { stat: 'Med', value: 1 }] },
    { name: "Пожарный", effect: [{ stat: 'Phisics', value: 5 }, { stat: 'Tech', value: 2 }, { stat: 'Food Consumption', value: 1 }, { stat: 'Med', value: 1 }] },
    { name: "Военный", effect: [{ stat: 'Phisics', value: 5 }, { stat: 'Tech', value: 1 }, { stat: 'Food Consumption', value: 1 }, { stat: 'Med', value: 1 }] },
    { name: "Акробат", effect: [{ stat: 'Phisics', value: 4 }, { stat: 'Social', value: 1 }] },
    { name: "Фитнес-тренер", effect: [{ stat: 'Phisics', value: 4 }, { stat: 'Social', value: 2 }] },
    { name: "Пловец", effect: [{ stat: 'Phisics', value: 4 }] },
    { name: "Строитель", effect: [{ stat: 'Phisics', value: 4 }] },
    { name: "Грузчик", effect: [{ stat: 'Phisics', value: 4 }] },
    { name: "Паркурщик", effect: [{ stat: 'Phisics', value: 4 }] },
    { name: "Лесоруб", effect: [{ stat: 'Phisics', value: 4 }] },
    { name: "Тренер боевых искусств", effect: [{ stat: 'Phisics', value: 4 }, { stat: 'Social', value: 1 }] },
    { name: "Спелеолог", effect: [{ stat: 'Phisics', value: 4 }] },
    { name: "Горнолыжник", effect: [{ stat: 'Phisics', value: 4 }] },
    { name: "Полицейский", effect: [{ stat: 'Phisics', value: 3 }, { stat: 'Social', value: 1 }] },
    { name: "Пилот", effect: [{ stat: 'Phisics', value: 3 }, { stat: 'Intelligence', value: 1 }, { stat: 'Med', value: 1 }] },
    { name: "Фермер", effect: [{ stat: 'Phisics', value: 3 }] },
    { name: "Маляр", effect: [{ stat: 'Phisics', value: 3 }] },
    { name: "Лифтер", effect: [{ stat: 'Phisics', value: 2 }, { stat: 'Tech', value: 2 }] },
    { name: "Танцор", effect: [{ stat: 'Phisics', value: 2 }, { stat: 'Social', value: 2 }] },
    { name: "Массажист", effect: [{ stat: 'Phisics', value: 2 }, { stat: 'Social', value: 1 }, { stat: 'Med', value: 1 }] },
    { name: "Рыбак", effect: [{ stat: 'Phisics', value: 2 }] },

    // Tech
    { name: "Инженер-конструктор", effect: [{ stat: 'Tech', value: 4 }, { stat: 'Intelligence', value: 2 }] },
    { name: "Специалист по автоматизации производства", effect: [{ stat: 'Tech', value: 4 }, { stat: 'Intelligence', value: 3 }] },
    { name: "Технолог производства бытовой техники", effect: [{ stat: 'Tech', value: 4 }, { stat: 'Intelligence', value: 3 }] },
    { name: "Инженер-электронщик", effect: [{ stat: 'Tech', value: 4 }, { stat: 'Intelligence', value: 4 }] },
    { name: "Инженер-механик", effect: [{ stat: 'Tech', value: 4 }, { stat: 'Phisics', value: 4 }] },
    { name: "Специалист по техническому обслуживанию", effect: [{ stat: 'Tech', value: 3 }, { stat: 'Phisics', value: 3 }] },
    { name: "Инженер-металлург", effect: [{ stat: 'Tech', value: 4 }, { stat: 'Phisics', value: 4 }] },
    { name: "Специалист по альтернативной энергетике", effect: [{ stat: 'Tech', value: 4 }, { stat: 'Phisics', value: 2 }] },
    { name: "Инженер-электрик", effect: [{ stat: 'Tech', value: 4 }, { stat: 'Phisics', value: 3 }] },
    { name: "Дизайнер по разработке бытовой техники", effect: [{ stat: 'Tech', value: 3 }, { stat: 'Intelligence', value: 3 }] },
    { name: "Автомеханик", effect: [{ stat: 'Tech', value: 3 }, { stat: 'Phisics', value: 2 }] },
    { name: "Электрик", effect: [{ stat: 'Tech', value: 3 }, { stat: 'Phisics', value: 1 }] },
    { name: "Технолог производства автомобилей", effect: [{ stat: 'Tech', value: 3 }, { stat: 'Phisics', value: 4 }] },
    { name: "Специалист по ремонту бытовой техники", effect: [{ stat: 'Tech', value: 2 }, { stat: 'Phisics', value: 2 }] },
];