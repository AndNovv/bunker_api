"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCards = exports.GameFlow = exports.numberOfRounds = exports.bagage = exports.interestingFacts = exports.traits = exports.hobbies = exports.bodyTypes = exports.professions = exports.healthConditions = void 0;
const healthConditions_1 = require("./healthConditions");
Object.defineProperty(exports, "healthConditions", { enumerable: true, get: function () { return healthConditions_1.healthConditions; } });
const professions_1 = require("./professions");
Object.defineProperty(exports, "professions", { enumerable: true, get: function () { return professions_1.professions; } });
const bodyTypes_1 = require("./bodyTypes");
Object.defineProperty(exports, "bodyTypes", { enumerable: true, get: function () { return bodyTypes_1.bodyTypes; } });
const hobbies_1 = require("./hobbies");
Object.defineProperty(exports, "hobbies", { enumerable: true, get: function () { return hobbies_1.hobbies; } });
const traits_1 = require("./traits");
Object.defineProperty(exports, "traits", { enumerable: true, get: function () { return traits_1.traits; } });
const interestingFacts_1 = require("./interestingFacts");
Object.defineProperty(exports, "interestingFacts", { enumerable: true, get: function () { return interestingFacts_1.interestingFacts; } });
const bagage_1 = require("./bagage");
Object.defineProperty(exports, "bagage", { enumerable: true, get: function () { return bagage_1.bagage; } });
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
};
exports.numberOfRounds = 7;
exports.GameFlow = new Map(Object.entries(RoundsData));
exports.ActionCards = [
    // Обмен
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'health',
        name: 'Обмен здоровьем',
        description: 'Вы можете поменяться здоровьем с любым игроком на ваш выбор',
        used: false
    },
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'hobby',
        name: 'Обмен хобби',
        description: 'Вы можете поменяться хобби с любым игроком на ваш выбор',
        used: false
    },
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'interestingFact',
        name: 'Обмен фактами',
        description: 'Вы можете поменяться фактом с любым игроком на ваш выбор',
        used: false
    },
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'profession',
        name: 'Обмен профессиями',
        description: 'Вы можете поменяться профессией с любым игроком на ваш выбор',
        used: false
    },
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'bagage',
        name: 'Обмен багажом',
        description: 'Вы можете поменяться багажом с любым игроком на ваш выбор',
        used: false
    },
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'bodyType',
        name: 'Обмен телосложением',
        description: 'Вы можете поменяться телосложением с любым игроком на ваш выбор',
        used: false
    },
    {
        key: 'exchange',
        type: 'pick except yourself',
        serverType: 'exchange',
        char: 'trait',
        name: 'Обмен чертой характера',
        description: 'Вы можете поменяться чертой характера с любым игроком на ваш выбор',
        used: false
    },
    // Поменять одному игроку
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'health',
        name: 'Поменять здоровье',
        description: 'Вы можете поменять здоровье любому игроку на ваш выбор',
        used: false
    },
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'hobby',
        name: 'Поменять хобби',
        description: 'Вы можете поменять хобби любому игроку на ваш выбор',
        used: false
    },
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'interestingFact',
        name: 'Поменять факт',
        description: 'Вы можете поменять факт любому игроку на ваш выбор',
        used: false
    },
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'profession',
        name: 'Поменять профессию',
        description: 'Вы можете поменять профессию любому игроку на ваш выбор',
        used: false
    },
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'bagage',
        name: 'Поменять багаж',
        description: 'Вы можете поменять багаж любому игроку на ваш выбор',
        used: false
    },
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'bodyType',
        name: 'Поменять телосложение',
        description: 'Вы можете поменять телосложение любому игроку на ваш выбор',
        used: false
    },
    {
        key: 'change',
        type: 'pick',
        serverType: 'change',
        char: 'trait',
        name: 'Поменять черту характера',
        description: 'Вы можете поменять черту характера любому игроку на ваш выбор',
        used: false
    },
    // Полная замена
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'health',
        name: 'Поменять всем здоровье',
        description: 'Вы можете поменять здоровье всем игрокам на случайное новое',
        used: false
    },
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'hobby',
        name: 'Поменять всем хобби',
        description: 'Вы можете поменять хобби всем игрокам на случайное новое',
        used: false
    },
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'interestingFact',
        name: 'Поменять всем факт',
        description: 'Вы можете поменять факт всем игрокам на случайный новый',
        used: false
    },
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'profession',
        name: 'Поменять всем профессию',
        description: 'Вы можете поменять профессию всем игрокам на случайную новую',
        used: false
    },
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'bodyType',
        name: 'Поменять всем телосложение',
        description: 'Вы можете поменять телосложение всем игрокам на случайное новое',
        used: false
    },
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'trait',
        name: 'Поменять всем черту характера',
        description: 'Вы можете поменять черту характера всем игрокам на случайную новую',
        used: false
    },
    {
        key: 'full',
        type: 'no pick',
        serverType: 'full',
        char: 'bagage',
        name: 'Поменять всем багаж',
        description: 'Вы можете поменять багаж всем игрокам на случайный новый',
        used: false
    },
    // Изменение одной характеристики
    {
        key: 'rejuvenate',
        type: 'pick',
        serverType: 'unique',
        char: 'age',
        name: 'Омолодить на 20 лет',
        description: 'Вы можете сделать любого игрока на 20 лет моложе, но не моложе 18 лет',
        used: false
    },
    {
        key: 'changeSex',
        type: 'pick',
        serverType: 'unique',
        char: 'sex',
        name: 'Поменять пол любому игроку',
        description: 'Вы можете поменять пол любому игроку',
        used: false
    },
    {
        key: 'cure',
        type: 'pick except yourself',
        serverType: 'cure',
        char: 'health',
        name: 'Вылечить игрока',
        description: 'Вы можете сделать любого игрока кроме самого себя абсолютно здоровым',
        used: false
    },
];
