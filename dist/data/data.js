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
];
