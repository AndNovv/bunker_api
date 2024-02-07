import { StatEffectType } from "./data";

export type Hobby = {
    name: string,
    effect: StatEffectType[]
}

export const hobbies: Hobby[] = [
    // Intelligence
    { name: "Чтение классической литературы", effect: [{ stat: 'Intelligence', value: 2 }] },
    { name: "Изучение иностранных языков", effect: [{ stat: 'Intelligence', value: 2 }] },
    { name: "Математические головоломки", effect: [{ stat: 'Intelligence', value: 2 }] },
    { name: "Изучение истории и культуры", effect: [{ stat: 'Intelligence', value: 2 }] },
    { name: "Программирование", effect: [{ stat: 'Intelligence', value: 2 }] },
    { name: "Обучение новым навыкам", effect: [{ stat: 'Intelligence', value: 2 }] },
    { name: "Разработка мобильных приложений", effect: [{ stat: 'Intelligence', value: 2 }] },
    { name: "Создание и разработка веб-сайтов", effect: [{ stat: 'Intelligence', value: 2 }] },
    { name: "Создание компьютерных игр", effect: [{ stat: 'Intelligence', value: 2 }] },

    { name: "Астрономия и наблюдение за звездами", effect: [{ stat: 'Intelligence', value: 1 }] },
    { name: "Философия", effect: [{ stat: 'Intelligence', value: 1 }] },
    { name: "Проектирование 3D-моделей", effect: [{ stat: 'Intelligence', value: 1 }] },
    { name: "Составление кроссвордов", effect: [{ stat: 'Intelligence', value: 1 }] },
    { name: "Рисование и искусство", effect: [{ stat: 'Intelligence', value: 1 }] },
    { name: "Стратегические видео-игры", effect: [{ stat: 'Intelligence', value: 1 }] },
    { name: "Написание электронной музыкы", effect: [{ stat: 'Intelligence', value: 1 }] },
    { name: "Диджитал-арт", effect: [{ stat: 'Intelligence', value: 1 }] },
    { name: "Рисование", effect: [{ stat: 'Intelligence', value: 1 }] },
    { name: "Монтаж видео", effect: [{ stat: 'Intelligence', value: 1 }] },
    { name: "Создание музыки и аудиообработка", effect: [{ stat: 'Intelligence', value: 1 }] },

    // Social
    { name: "Волонтёрство", effect: [{ stat: 'Social', value: 2 }, { stat: 'Med', value: 1 }] },
    { name: "Общественные мероприятия и организация событий", effect: [{ stat: 'Social', value: 2 }] },
    { name: "Театр и актерское мастерство", effect: [{ stat: 'Social', value: 2 }] },
    { name: "Психология и консультирование", effect: [{ stat: 'Social', value: 2 }, { stat: 'Psycho', value: 1 }] },

    { name: "Обучение и менторство", effect: [{ stat: 'Social', value: 1 }, { stat: 'Intelligence', value: 1 }] },
    { name: "Фильмы и кинематограф", effect: [{ stat: 'Social', value: 1 }] },
    { name: "Живопись и искусство", effect: [{ stat: 'Social', value: 1 }] },
    { name: "Игры настольные", effect: [{ stat: 'Social', value: 1 }] },

    // Phisics
    { name: "Силовые тренировки и бодибилдинг", effect: [{ stat: 'Phisics', value: 3 }] },
    { name: "Единоборства и боевые искусства", effect: [{ stat: 'Phisics', value: 3 }] },
    { name: "Альпинизм и скалолазание", effect: [{ stat: 'Phisics', value: 3 }] },

    { name: "Занятия спортом и фитнесом", effect: [{ stat: 'Phisics', value: 2 }, { stat: 'Psycho', value: 1 }] },
    { name: "Активные виды отдыха на природе", effect: [{ stat: 'Phisics', value: 2 }, { stat: 'Social', value: 1 }] },
    { name: "Туризм и походы", effect: [{ stat: 'Phisics', value: 2 }, { stat: 'Social', value: 1 }, { stat: 'Med', value: 1 }] },
    { name: "Водные виды спорта", effect: [{ stat: 'Phisics', value: 2 }] },
    { name: "Горные лыжи", effect: [{ stat: 'Phisics', value: 2 }] },
    { name: "Велоспорт", effect: [{ stat: 'Phisics', value: 2 }] },
    { name: "Горные лыжи и сноубординг", effect: [{ stat: 'Phisics', value: 2 }] },
    { name: "Плавание и водные виды спорта", effect: [{ stat: 'Phisics', value: 2 }] },
    { name: "Дайвинг", effect: [{ stat: 'Phisics', value: 2 }] },
    { name: "Конный спорт", effect: [{ stat: 'Phisics', value: 2 }] },

    { name: "Производство искусственных растений", effect: [{ stat: 'Phisics', value: 1 }] },
    { name: "Садоводство", effect: [{ stat: 'Phisics', value: 1 }, { stat: 'Social', value: 1 }] },
    { name: "Экстрим и экстремальные виды спорта", effect: [{ stat: 'Phisics', value: 1 }] },
    { name: "Гольф", effect: [{ stat: 'Phisics', value: 1 }] },
    { name: "Танцы и хореография", effect: [{ stat: 'Phisics', value: 1 }, { stat: 'Social', value: 1 }] },
    { name: "Археология и раскопки", effect: [{ stat: 'Phisics', value: 1 }] },
    { name: "Охота и рыбалка", effect: [{ stat: 'Phisics', value: 1 }] },
    { name: "Катание на роликах и скейтбординг", effect: [{ stat: 'Phisics', value: 1 }] },
    { name: "Боулинг", effect: [{ stat: 'Phisics', value: 1 }] },
    { name: "Фехтование", effect: [{ stat: 'Phisics', value: 1 }] },
    { name: "Виноделие", effect: [{ stat: 'Phisics', value: 1 }] },
    { name: "Теннис", effect: [{ stat: 'Phisics', value: 1 }] },

    // Tech
    { name: "Электроника и DIY проекты", effect: [{ stat: 'Tech', value: 3 }, { stat: 'Intelligence', value: 1 }] },
    { name: "Робототехника", effect: [{ stat: 'Tech', value: 3 }, { stat: 'Intelligence', value: 1 }] },
    { name: "Программирование микроконтроллеров", effect: [{ stat: 'Tech', value: 3 }, { stat: 'Intelligence', value: 1 }] },
    { name: "Механика и ремонт техники", effect: [{ stat: 'Tech', value: 2 }, { stat: 'Phisics', value: 1 }] },
    { name: "Автомобили", effect: [{ stat: 'Tech', value: 1 }, { stat: 'Phisics', value: 1 }] },

    // Additional Hobbies
    { name: "Готовка", effect: [] },
    { name: "Путешествия", effect: [] },
    { name: "Пение", effect: [] },
    { name: "Коллекционирование", effect: [] },
    { name: "Фотография", effect: [] },
    { name: "Компьютерные игры", effect: [] },
    { name: "Игра на гитаре", effect: [] },
    { name: "Просморт фильмов", effect: [] },

];