"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const data_1 = require("./data/data");
const cors_1 = __importDefault(require("cors"));
const AveragePlayerStats_1 = require("./data/AveragePlayerStats");
const Events_1 = require("./data/Events");
const charKeyToData = new Map([
    ['profession', data_1.professions],
    ['health', data_1.healthConditions],
    ['hobby', data_1.hobbies],
    ['interestingFact', data_1.interestingFacts],
    ['trait', data_1.traits],
    ['bodyType', data_1.bodyTypes],
    ['bagage', data_1.bagage],
]);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000", 'https://192.168.1.27:3000', 'https://localhost:3000', 'http://192.168.1.27:3000', 'http://166.1.160.98:3000', 'http://bunker-game.online', 'https://bunker-game.online'],
        methods: ["GET", "POST"],
    },
});
const games = new Map();
const findPlayerIndexByName = (players, playerName) => {
    const index = players.findIndex(player => player.name === playerName);
    return index;
};
function pickRandomFromArray(array) {
    return structuredClone(array[Math.floor(Math.random() * array.length)]);
}
function generatePlayer(name, host, id) {
    const player = {
        id,
        name,
        host,
        ready: false,
        votes: 0,
        characteristics: {
            name: {
                key: 'name',
                title: 'Имя',
                value: '',
                hidden: true,
            },
            sex: {
                key: 'sex',
                title: 'Пол',
                value: Math.random() > 0.5 ? 'Мужчина' : 'Женщина',
                hidden: true,
            },
            age: {
                key: 'age',
                title: 'Возраст',
                value: Math.floor(Math.random() * 80 + 18).toString(),
                hidden: true,
            },
            bodyType: {
                key: 'bodyType',
                title: 'Телосложение',
                value: pickRandomFromArray(data_1.bodyTypes),
                hidden: true,
            },
            profession: {
                key: 'profession',
                title: 'Профессия',
                value: pickRandomFromArray(data_1.professions),
                hidden: true,
            },
            health: {
                key: 'health',
                title: 'Здоровье',
                value: pickRandomFromArray(data_1.healthConditions),
                hidden: true,
            },
            trait: {
                key: 'trait',
                title: 'Черта характера',
                value: pickRandomFromArray(data_1.traits),
                hidden: true,
            },
            hobby: {
                key: 'hobby',
                title: 'Хобби',
                value: pickRandomFromArray(data_1.hobbies),
                hidden: true,
            },
            interestingFact: {
                key: 'interestingFact',
                title: 'Факт',
                value: pickRandomFromArray(data_1.interestingFacts),
                hidden: true,
            },
            bagage: {
                key: 'bagage',
                title: 'Багаж',
                value: pickRandomFromArray(data_1.bagage),
                hidden: true,
            }
        },
        actionCards: [pickRandomFromArray(data_1.ActionCards), pickRandomFromArray(data_1.ActionCards)],
        revealedCount: 0,
        eliminated: false,
        playerStats: {
            Phisics: {
                key: 'Phisics',
                title: 'Физическая форма',
                value: 3,
            },
            Intelligence: {
                key: 'Intelligence',
                title: 'Интеллект',
                value: 3,
            },
            Tech: {
                key: 'Tech',
                title: 'Техническая компетентность',
                value: 1
            },
            Psycho: {
                key: 'Psycho',
                title: 'Психологическая устойчивотсь',
                value: 3,
            },
            Social: {
                key: 'Social',
                title: 'Социальность',
                value: 3,
            },
            "Food Consumption": {
                key: 'Food Consumption',
                title: 'Потребление пищи',
                value: 6,
            },
            "Med Consumption": {
                key: 'Med Consumption',
                title: 'Потребление медикаментов',
                value: 0
            },
            Med: {
                key: 'Med',
                title: 'Навыки медицины',
                value: 0
            }
        },
        relatives: {
            "Intelligence": {
                key: 'Intelligence',
                value: 0
            },
            "Social": {
                key: 'Social',
                value: 0
            }
        }
    };
    return player;
}
function generateCodeAndCreateRoom(name) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        code += alphabet.charAt(randomIndex);
    }
    if (games.has(code))
        return generateCodeAndCreateRoom(name);
    const player = generatePlayer(name, true, 0);
    const game = {
        gamestatus: 'waiting', code, round: 1, countOfReadyPlayers: 0, players: [player], secondVotingOptions: [], roundsFlow: [], countOfNotEliminatedPlayers: 1,
        bunkerStats: {
            Med: {
                key: "Med",
                title: 'Навыки медицины',
                value: 0,
            },
            Food: {
                key: 'Food',
                title: 'Запасы еды',
                value: 150,
            },
            Anxiety: {
                key: 'Anxiety',
                title: 'Напряженность',
                value: 0
            },
            "Food Consumption": {
                key: 'Food Consumption',
                title: 'Потребление пищи',
                value: 0,
            },
            "Med Consumption": {
                key: 'Med Consumption',
                title: 'Потребление медикаментов',
                value: 0,
            },
            Tech: {
                key: 'Tech',
                title: 'Техническая компетентность',
                value: 0,
            },
            Safety: {
                key: 'Safety',
                title: 'Безопасность',
                value: 5,
            },
            Medicines: {
                key: 'Medicines',
                title: 'Запасы медикаментов',
                value: 50,
            },
            "Vent System": {
                key: 'Vent System',
                title: 'Система вентеляции',
                value: 10,
            },
            "Water Cleaning System": {
                key: 'Water Cleaning System',
                title: 'Система очистки воды',
                value: 10,
            },
            "Electricity System": {
                key: 'Electricity System',
                title: 'Система электроснабжения',
                value: 10,
            }
        },
        bunkerRelatives: {
            'Med': {
                title: 'Медицинские навыки',
                key: 'Med',
                value: 0,
                expected: 0,
                real: 0,
            },
            'Tech': {
                title: 'Технические навыки',
                key: 'Tech',
                value: 0,
                expected: 0,
                real: 0,
            },
            'Safety': {
                title: 'Безопасность',
                key: 'Safety',
                value: 0,
                expected: 0,
                real: 0,
            },
        },
        finale: {
            round: 0,
            maxRounds: 20,
            pickedEventId: null,
            survivingPlayersId: [],
            eliminatedPlayersId: [],
            eventsIdList: [],
            turn: 'Eliminated',
            eventTargetPlayerId: 0,
            survivingPlayerTurnId: 0,
            eliminatedPlayerTurnId: 0,
            prevRoundStatistics: {
                foodEnough: true,
                medicinesEnough: true,
                electricityWorks: true,
                airWorks: true,
                waterWorks: true,
                diseasesInfo: [],
                responseData: {
                    title: '',
                    consequenceTitle: '',
                    consequenceDescription: '',
                },
                eventTargetPlayerId: 0,
            },
            CalculationFinished: false
        }
    };
    games.set(code, game);
    return game;
}
const joinResponseDataHandler = (game, playerId, name) => {
    const data = {
        name,
        playerId,
        game
    };
    return data;
};
const responseHandler = (resType, data = {}) => {
    const response = { status: 'error', message: 'Внутренняя ошибка сервера', data };
    if (resType === 'create success') {
        response.status = 'success';
        response.message = 'Успешный вход';
    }
    if (resType === 'join success') {
        response.status = 'success';
        response.message = 'Успешный вход';
    }
    if (resType === 'join code error') {
        response.status = 'error';
        response.message = 'Неверный код';
    }
    if (resType === 'join name error') {
        response.status = 'error';
        response.message = 'Имя уже занято';
    }
    return response;
};
const clearReady = (game) => {
    game.countOfReadyPlayers = 0;
    for (let i = 0; i < game.players.length; i++) {
        game.players[i].ready = false;
    }
};
const clearVotes = (game) => {
    for (let i = 0; i < game.players.length; i++) {
        game.players[i].votes = 0;
    }
};
const firstGameStageFinishResultsCalculation = (game) => {
    game.gamestatus = 'results';
    initializeFinale(game);
    calculateAllPlayersStats(game);
    calculateBunkerStats(game, true);
    calculatePlayerRelativeValues(game);
    calculateBunkerRelativeValues(game);
    game.finale.CalculationFinished = true;
};
const calculateNextStage = (game) => {
    if (game.roundsFlow[game.round - 1]) {
        game.gamestatus = 'discussion';
    }
    else {
        game.round += 1;
        game.gamestatus = 'revealing';
    }
};
// Final calculations
const calculateBunkerStats = (game, firstCalculation) => {
    game.bunkerStats['Med Consumption'].value = 0;
    game.bunkerStats['Food Consumption'].value = 0;
    game.bunkerStats["Med"].value = 0;
    game.bunkerStats["Tech"].value = 0;
    game.bunkerStats["Safety"].value = 0;
    game.finale.survivingPlayersId.forEach((playerId) => {
        const player = game.players[playerId];
        game.bunkerStats['Med Consumption'].value += player.playerStats["Med Consumption"].value;
        game.bunkerStats['Food Consumption'].value += player.playerStats["Food Consumption"].value;
        game.bunkerStats["Med"].value += player.playerStats["Med"].value;
        game.bunkerStats["Tech"].value += player.playerStats["Tech"].value;
        game.bunkerStats["Safety"].value += player.playerStats["Phisics"].value;
        if (firstCalculation) {
            game.bunkerStats["Anxiety"].value += AveragePlayerStats_1.socialAverage + 1 - player.playerStats["Social"].value;
            game.bunkerStats["Anxiety"].value += AveragePlayerStats_1.psychoAverage + 1 - player.playerStats["Psycho"].value;
            // Подсчет багажа
            const effect = player.characteristics.bagage.value.effect;
            for (let i = 0; i < effect.length; i++) {
                if (effect[i].stat !== 'Anxiety') {
                    game.bunkerStats[effect[i].stat].value += effect[i].value;
                }
            }
        }
    });
    // Проверка на нули
    if (game.bunkerStats["Anxiety"].value < 0) {
        game.bunkerStats["Anxiety"].value = 0;
    }
};
const calculateAllPlayersStats = (game) => {
    for (let i = 0; i < game.finale.survivingPlayersId.length; i++) {
        const playerId = game.finale.survivingPlayersId[i];
        calculatePlayerStats(game.players[playerId]);
    }
};
const calculatePlayerRelativeValues = (game) => {
    const stats = [{ key: 'Intelligence', average: AveragePlayerStats_1.intelligenceAverage }, { key: 'Social', average: AveragePlayerStats_1.socialAverage }];
    game.finale.survivingPlayersId.map((playerId) => {
        const player = game.players[playerId];
        stats.map((stat) => {
            const value = player.playerStats[stat.key].value;
            let relativeValue = 0;
            if (value < stat.average * 0.4) {
                relativeValue = 0;
            }
            else if (value < stat.average * 0.7) {
                relativeValue = 1;
            }
            else if (value < stat.average * 1.3) {
                relativeValue = 2;
            }
            else if (value < stat.average * 1.5) {
                relativeValue = 3;
            }
            else {
                relativeValue = 4;
            }
            if (stat.key === 'Intelligence' || stat.key === 'Social') {
                player.relatives[stat.key].value = relativeValue;
            }
        });
    });
};
const calculateBunkerRelativeValues = (game) => {
    const stats = [{ key: 'Med', average: AveragePlayerStats_1.medAverage }, { key: 'Tech', average: AveragePlayerStats_1.techAverage }, { key: 'Safety', average: AveragePlayerStats_1.phisicsAverage }];
    stats.map((stat) => {
        const average = Math.floor(game.players.length / 2) * stat.average;
        const value = game.bunkerStats[stat.key].value;
        let relativeValue = 0;
        if (value < average * 0.7) {
            relativeValue = 0;
        }
        else if (value < average * 0.8) {
            relativeValue = 1;
        }
        else if (value < average * 1.2) {
            relativeValue = 2;
        }
        else if (value < average * 1.4) {
            relativeValue = 3;
        }
        else {
            relativeValue = 4;
        }
        if (stat.key === 'Med' || stat.key === 'Safety' || stat.key === 'Tech') {
            game.bunkerRelatives[stat.key].value = relativeValue;
            game.bunkerRelatives[stat.key].expected = average;
            game.bunkerRelatives[stat.key].real = value;
        }
    });
};
const resetPlayerStats = (player) => {
    player.playerStats["Food Consumption"].value = 6;
    player.playerStats["Intelligence"].value = 3;
    player.playerStats["Med"].value = 0;
    player.playerStats["Med Consumption"].value = 0;
    player.playerStats["Phisics"].value = 3;
    player.playerStats["Psycho"].value = 3;
    player.playerStats["Social"].value = 3;
    player.playerStats["Tech"].value = 1;
};
const calculatePlayerStats = (player) => {
    resetPlayerStats(player);
    const chars = player.characteristics;
    const stats = player.playerStats;
    let ageMultiplier = 1; // Влияет на профит от профессии и хобби (кроме физической формы)
    // Пол
    if (chars.sex.value === 'Мужчина') {
        stats["Food Consumption"].value += 1;
        stats.Phisics.value += 1;
    }
    // Возраст
    const age = Number(chars.age.value);
    if (age < 20) {
        ageMultiplier = 0.7;
        stats.Phisics.value += 2;
        stats["Food Consumption"].value += 1;
    }
    else if (age < 30) {
        ageMultiplier = 1;
        stats.Phisics.value += 2;
        stats.Intelligence.value += 1;
        stats.Tech.value += 1;
        stats.Psycho.value += 1;
        stats["Food Consumption"].value += 1;
    }
    else if (age < 50) {
        ageMultiplier = 1.3;
        stats.Phisics.value += 1;
        stats.Intelligence.value += 2;
        stats.Tech.value += 2;
        stats.Psycho.value += 2;
        stats["Food Consumption"].value += 1;
    }
    else if (age < 70) {
        ageMultiplier = 1.5;
        stats.Phisics.value += -1;
        stats.Intelligence.value += 1;
        stats.Tech.value += 1;
        stats.Psycho.value += 2;
        stats["Med Consumption"].value += 1;
    }
    else {
        ageMultiplier = 1.5;
        stats["Med Consumption"].value += 1;
        stats.Phisics.value += -4;
    }
    // Профессия и хобби
    chars.profession.value.effect.map((statEffect) => {
        if (statEffect.stat === 'Intelligence' || statEffect.stat === 'Tech' || statEffect.stat === 'Med' || statEffect.stat === 'Social') {
            stats[statEffect.stat].value += Math.floor(ageMultiplier * statEffect.value);
        }
        else {
            stats[statEffect.stat].value += statEffect.value;
        }
    });
    chars.hobby.value.effect.map((statEffect) => {
        if (statEffect.stat === 'Intelligence' || statEffect.stat === 'Tech' || statEffect.stat === 'Med' || statEffect.stat === 'Social') {
            stats[statEffect.stat].value += Math.floor(ageMultiplier * statEffect.value);
        }
        else {
            stats[statEffect.stat].value += statEffect.value;
        }
    });
    // Остальное
    chars.bodyType.value.effect.map((statEffect) => {
        stats[statEffect.stat].value += statEffect.value;
    });
    chars.health.value.effect.map((statEffect) => {
        stats[statEffect.stat].value += statEffect.value;
    });
    chars.interestingFact.value.effect.map((statEffect) => {
        stats[statEffect.stat].value += statEffect.value;
    });
    chars.trait.value.effect.map((statEffect) => {
        stats[statEffect.stat].value += statEffect.value;
    });
    // Проверка на отрицательные значения (Вместо отрицательных нули)
    for (const key in stats) {
        if (stats[key].value < 0) {
            stats[key].value = 0;
        }
    }
};
// Финальная игра
const calculateConsequences = (game, consequences, playerId) => {
    let random = Math.random();
    for (let i = 0; i < consequences.length; i++) {
        const consequence = consequences[i];
        let probability = 0;
        if (consequence.type === 'Simple') {
            probability = consequence.probability;
        }
        if (consequence.type === 'Complex') {
            const dependency = consequence.probabilityDependence;
            if (dependency.type === 'Player') {
                if (dependency.stat === 'Intelligence') {
                    probability = consequence.probability[game.players[playerId].relatives[dependency.stat].value];
                }
            }
            else {
                if (dependency.stat === 'Med' || dependency.stat === 'Safety' || dependency.stat === 'Tech') {
                    probability = consequence.probability[game.bunkerRelatives[dependency.stat].value];
                }
            }
        }
        if (random <= probability) {
            return i;
        }
        else {
            random -= probability;
        }
    }
    return 0;
};
const getEventIdList = () => {
    const result = [];
    while (result.length < 3) {
        const newValue = Math.floor(Math.random() * Events_1.Events.length);
        if (!result.includes(newValue)) {
            result.push(newValue);
        }
    }
    return result;
};
const initializeFinale = (game) => {
    const finale = game.finale;
    finale.eventsIdList = getEventIdList();
    finale.round = 1;
    finale.maxRounds = 10;
    finale.turn = 'Eliminated';
    for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].eliminated) {
            finale.eliminatedPlayersId.push(i);
        }
        else {
            finale.survivingPlayersId.push(i);
        }
    }
    finale.survivingPlayerTurnId = finale.survivingPlayersId[0];
    finale.eliminatedPlayerTurnId = finale.eliminatedPlayersId[0];
    finale.eventTargetPlayerId = game.finale.survivingPlayersId[Math.floor(Math.random() * game.finale.survivingPlayersId.length)];
};
const startNextFinaleRound = (game) => {
    const finale = game.finale;
    const bunkerStats = game.bunkerStats;
    finale.round += 1;
    if (finale.round < finale.maxRounds) {
        calculateNextTurnIds(game);
        finale.pickedEventId = null;
        finale.eventsIdList = getEventIdList();
        finale.turn = 'Eliminated';
        finale.prevRoundStatistics.eventTargetPlayerId = finale.eventTargetPlayerId;
        finale.eventTargetPlayerId = game.finale.survivingPlayersId[Math.floor(Math.random() * game.finale.survivingPlayersId.length)];
        bunkerStats.Food.value -= bunkerStats["Food Consumption"].value;
        bunkerStats.Medicines.value -= bunkerStats["Med Consumption"].value;
        if (bunkerStats.Food.value < 0) {
            bunkerStats.Food.value = 0;
            bunkerStats.Anxiety.value += 2;
            finale.prevRoundStatistics.foodEnough = false;
        }
        else {
            finale.prevRoundStatistics.foodEnough = true;
        }
        if (bunkerStats.Medicines.value < 0) {
            bunkerStats.Medicines.value = 0;
            bunkerStats.Anxiety.value += 2;
            finale.prevRoundStatistics.medicinesEnough = false;
        }
        else {
            finale.prevRoundStatistics.medicinesEnough = true;
        }
        if (bunkerStats["Electricity System"].value === 0) {
            bunkerStats.Anxiety.value += 2;
            finale.prevRoundStatistics.electricityWorks = false;
        }
        else {
            finale.prevRoundStatistics.electricityWorks = true;
        }
        if (bunkerStats["Vent System"].value === 0) {
            bunkerStats.Anxiety.value += 2;
            finale.prevRoundStatistics.airWorks = false;
        }
        else {
            finale.prevRoundStatistics.airWorks = true;
        }
        if (bunkerStats["Water Cleaning System"].value === 0) {
            bunkerStats.Anxiety.value += 2;
            finale.prevRoundStatistics.waterWorks = false;
        }
        else {
            finale.prevRoundStatistics.waterWorks = true;
        }
        CalculateDiseases(game);
    }
    else {
        console.log("Игра окончена");
    }
};
const calculateMedQualityBasedOnAge = (age) => {
    // MedicalQuality based on Age
    // from 0 to 0.5
    if (age < 25)
        return 0.5;
    if (age > 65)
        return 0;
    return -0.01 * age + 0.75;
};
const calculateMedicationQuality = (game, player) => {
    // MedicalQuality - value between 0 and 1
    let MedicationQuality = 0;
    const playerAge = Number(player.characteristics.age.value);
    if (game.bunkerStats.Medicines.value === 0)
        return 0;
    MedicationQuality += calculateMedQualityBasedOnAge(playerAge);
    // MedicalQuality based on Med Skills
    const MedicalQualityForRelative = {
        0: 0,
        1: 0.1,
        2: 0.25,
        3: 0.35,
        4: 0.5,
    };
    MedicationQuality += MedicalQualityForRelative[game.bunkerRelatives.Med.value];
    return MedicationQuality;
};
const calculatePlayerDisease = (game, player) => {
    const MedicationQuality = calculateMedicationQuality(game, player);
    const health = player.characteristics.health.value;
    const diseasesInfo = game.finale.prevRoundStatistics.diseasesInfo;
    if (health.name === 'Абсолютно здоров')
        return;
    if (Math.random() < health.contagious) {
        //Epidemic
        const countOfUsedMedicines = 2 * AveragePlayerStats_1.medConsumptionAverage * game.finale.survivingPlayersId.length;
        game.bunkerStats.Medicines.value -= countOfUsedMedicines;
        if (game.bunkerStats.Medicines.value < 0)
            game.bunkerStats.Medicines.value = 0;
        diseasesInfo.push({ status: 'epidemic', playerId: player.id, medConsumption: countOfUsedMedicines, diseaseName: health.name });
        player.characteristics.health.value = structuredClone(data_1.healthConditions[0]);
        calculatePlayerStats(player);
        calculateBunkerStats(game, false);
        calculateBunkerRelativeValues(game);
    }
    else if (Math.random() < health.lethal) {
        //Death
        diseasesInfo.push({ status: 'death', playerId: player.id });
        DeathOfPlayer(game, player.id);
    }
    else if (Math.random() < health.cureProbability) {
        //Cure
        diseasesInfo.push({ status: 'cured', playerId: player.id, diseaseName: health.name });
        player.characteristics.health.value = structuredClone(data_1.healthConditions[0]);
        calculatePlayerStats(player);
        calculateBunkerStats(game, false);
        calculateBunkerRelativeValues(game);
    }
};
const CalculateDiseases = (game) => {
    game.finale.prevRoundStatistics.diseasesInfo.length = 0;
    for (let i = 0; i < game.finale.survivingPlayersId.length; i++) {
        const playerId = game.finale.survivingPlayersId[i];
        const player = game.players[playerId];
        calculatePlayerDisease(game, player);
    }
};
const calculateEffectOnBunker = (game, effect) => {
    effect.map((effect) => {
        if (effect.stat === 'Death') {
            DeathOfPlayer(game, game.finale.eventTargetPlayerId);
        }
        else {
            if (effect.stat === 'Food') {
                const addValue = Math.floor(effect.value * game.finale.survivingPlayersId.length * AveragePlayerStats_1.foodConsumptionAverage);
                game.bunkerStats[effect.stat].value += addValue;
                game.finale.prevRoundStatistics.responseData.consequenceDescription += `(${addValue} Продовольствия)`;
            }
            else if (effect.stat === 'Medicines') {
                const addValue = Math.floor(effect.value * game.finale.survivingPlayersId.length * AveragePlayerStats_1.medConsumptionAverage);
                game.bunkerStats[effect.stat].value += addValue;
                game.finale.prevRoundStatistics.responseData.consequenceDescription += `(${addValue} Медикаментов)`;
            }
            else {
                game.bunkerStats[effect.stat].value += effect.value;
            }
            if (effect.stat === 'Electricity System' || effect.stat === 'Vent System' || effect.stat === 'Water Cleaning System') {
                if (game.bunkerStats[effect.stat].value > 10) {
                    game.bunkerStats[effect.stat].value = 10;
                }
            }
            if (game.bunkerStats[effect.stat].value < 0) {
                game.bunkerStats[effect.stat].value = 0;
            }
        }
    });
};
const DeathOfPlayer = (game, playerId) => {
    const playersId = game.finale.survivingPlayersId;
    const newsurvivingPlayersId = playersId.filter((id) => playerId !== id);
    game.players[playerId].eliminated = true;
    game.finale.survivingPlayersId = newsurvivingPlayersId;
    game.bunkerStats.Anxiety.value += 4;
    calculateBunkerStats(game, false);
    calculateBunkerRelativeValues(game);
};
const findNextEliminatedTurn = (game) => {
    for (let i = 0; i < game.finale.eliminatedPlayersId.length - 1; i++) {
        if (game.finale.eliminatedPlayersId[i] === game.finale.eliminatedPlayerTurnId) {
            return game.finale.eliminatedPlayersId[i + 1];
        }
    }
    return game.finale.eliminatedPlayersId[0];
};
const findNextSurvivorTurn = (game) => {
    for (let i = 0; i < game.players.length; i++) {
        if (!game.players[i].eliminated && game.players[i].id === game.finale.survivingPlayerTurnId) {
            for (let j = i + 1; j < game.players.length; j++) {
                if (!game.players[j].eliminated) {
                    return game.players[j].id;
                }
            }
            for (let j = 0; j < game.players.length; j++) {
                if (!game.players[j].eliminated) {
                    return game.players[j].id;
                }
            }
        }
    }
    return 0;
};
const calculateNextTurnIds = (game) => {
    game.finale.eliminatedPlayerTurnId = findNextEliminatedTurn(game);
    game.finale.survivingPlayerTurnId = findNextSurvivorTurn(game);
};
// Карты действий
const charExchange = (game, char, player1, player2) => {
    const temp = game.players[player1].characteristics[char].value;
    game.players[player1].characteristics[char].value = game.players[player2].characteristics[char].value;
    game.players[player2].characteristics[char].value = temp;
};
const charChange = (game, char, playerId) => {
    const data = charKeyToData.get(char);
    if (!data)
        throw Error('Данные не найдены');
    game.players[playerId].characteristics[char].value = pickRandomFromArray(data);
};
const charFullUpdate = (game, char) => {
    const data = charKeyToData.get(char);
    if (!data)
        throw Error('Данные не найдены');
    for (let i = 0; i < game.players.length; i++) {
        game.players[i].characteristics[char].value = pickRandomFromArray(data);
    }
};
// Омоложение
const rejuvenate = (game, player1) => {
    const newAge = Number(game.players[player1].characteristics.age.value) - 20;
    game.players[player1].characteristics.age.value = String(newAge < 18 ? 18 : newAge);
};
const changeSex = (game, player1) => {
    game.players[player1].characteristics.sex.value = game.players[player1].characteristics.sex.value === 'Мужчина' ? 'Женщина' : 'Мужчина';
};
const cure = (game, player1) => {
    game.players[player1].characteristics.health.value = structuredClone(data_1.healthConditions[0]);
};
// Сокеты 
io.on('connection', (socket) => {
    console.log(`Connection ${socket.id}`);
    socket.on("start_game", (code) => {
        const game = games.get(code);
        if (game) {
            game.gamestatus = 'preparing';
            game.countOfNotEliminatedPlayers = game.players.length;
            const roundsFlow = data_1.GameFlow.get(game.players.length.toString());
            if (roundsFlow) {
                game.roundsFlow = roundsFlow;
                io.to(code).emit("start_game_response", game);
            }
            else {
                console.log('Error: RoundFlow');
            }
        }
        else {
            console.log("Ошибка кода при старте игры");
        }
    });
    socket.on("create_game", (name) => {
        games.clear();
        const game = generateCodeAndCreateRoom(name);
        const response = responseHandler('create success', { code: game.code, name, players: game.players });
        socket.join(game.code);
        socket.emit("create_game_response", response);
    });
    socket.on("join_game", (code, name) => {
        const game = games.get(code);
        let response;
        if (!game) {
            const response = responseHandler('join code error');
            socket.emit("join_game_response", response);
            return;
        }
        const playerId = findPlayerIndexByName(game.players, name);
        if (playerId != -1) { // Игрок с таким именем уже в игре
            if (game.gamestatus === 'waiting') {
                response = responseHandler('join name error');
            }
            else { // Реконнект
                socket.join(code);
                response = responseHandler('join success', joinResponseDataHandler(game, playerId, name));
            }
            socket.emit("join_game_response", response);
            return;
        }
        if (game.gamestatus === 'waiting') {
            socket.join(code);
            const player = generatePlayer(name, false, game.players.length);
            game.players.push(player);
            game.countOfNotEliminatedPlayers += 1;
            response = responseHandler('join success', joinResponseDataHandler(game, game.players.length - 1, name));
            io.to(code).emit("player_connected", player);
            socket.emit("join_game_response", response);
        }
        else {
            response = responseHandler('join code error');
            socket.emit("join_game_response", response);
        }
    });
    socket.on("player_ready", ({ code, playerId, charachterName }) => {
        const game = games.get(code);
        if (!game)
            return;
        if (game.players[playerId].ready)
            return;
        game.players[playerId].ready = true;
        game.players[playerId].characteristics.name.value = charachterName;
        game.countOfReadyPlayers += 1;
        if (game.countOfReadyPlayers === game.players.length) {
            game.gamestatus = 'revealing';
            clearReady(game);
            io.to(code).emit("all_players_ready", game.players);
        }
        else {
            io.to(code).emit("player_ready_response");
        }
    });
    socket.on("char_revealed", ({ code, playerId, charTitle }) => {
        const game = games.get(code);
        if (!game)
            return;
        if (game.players[playerId].revealedCount >= game.round)
            return;
        game.players[playerId].revealedCount += 1;
        game.players[playerId].characteristics[charTitle].hidden = false;
        game.countOfReadyPlayers += 1;
        if (game.countOfReadyPlayers === game.countOfNotEliminatedPlayers) {
            game.countOfReadyPlayers = 0;
            calculateNextStage(game);
            io.to(code).emit("end_of_round_revealing", game.players);
        }
        else {
            io.to(code).emit("char_revealed_response", game.players);
        }
    });
    socket.on("ready_discussion", ({ code, playerId }) => {
        const game = games.get(code);
        if (!game)
            return;
        if (game.players[playerId].ready)
            return;
        game.players[playerId].ready = true;
        game.countOfReadyPlayers += 1;
        if (game.countOfReadyPlayers === game.countOfNotEliminatedPlayers) {
            clearReady(game);
            if (game.roundsFlow[game.round - 1]) {
                game.gamestatus = 'voting';
                io.to(code).emit("start_voting");
            }
            else {
                game.round += 1;
                game.gamestatus = 'revealing';
                io.to(code).emit("start_next_round");
            }
        }
        else {
            io.to(code).emit("ready_to_vote_response", game.countOfReadyPlayers);
        }
    });
    socket.on("vote", ({ code, playerId, vote }) => {
        const game = games.get(code);
        if (!game)
            return;
        if (game.players[playerId].ready)
            return;
        game.players[playerId].ready = true;
        game.countOfReadyPlayers += 1;
        game.players[vote].votes += 1;
        if (game.countOfReadyPlayers === game.countOfNotEliminatedPlayers) {
            // Логика конца голосования
            const playersToEliminate = [];
            let maxVotes = 0;
            for (let i = 0; i < game.players.length; i++) {
                if (game.players[i].votes > maxVotes) {
                    maxVotes = game.players[i].votes;
                    playersToEliminate.length = 0;
                    playersToEliminate.push(i);
                }
                else if (game.players[i].votes === maxVotes) {
                    playersToEliminate.push(i);
                }
            }
            let votingResults = game.players.map((player) => ({ playerId: player.id, votes: player.votes })).sort((p1, p2) => { return p2.votes - p1.votes; });
            if (game.gamestatus === 'voting') {
                if (playersToEliminate.length === 1) { // Единогласное изгнание
                    game.countOfNotEliminatedPlayers -= 1;
                    game.round += 1;
                    game.players[playersToEliminate[0]].eliminated = true;
                    game.gamestatus = 'revealing';
                    if (game.round > data_1.numberOfRounds) { // Конец игры
                        firstGameStageFinishResultsCalculation(game);
                    }
                    io.to(code).emit("end_of_voting", { votingResults, eliminatedPlayerId: votingResults[0].playerId });
                }
                else { // Голосование требуется повторить
                    game.gamestatus = 'second voting';
                    game.secondVotingOptions = playersToEliminate;
                    io.to(code).emit("second_voting", playersToEliminate);
                }
            }
            else if (game.gamestatus === 'second voting') { // Повторное голосование
                game.gamestatus = 'revealing';
                game.round += 1;
                game.countOfNotEliminatedPlayers -= 1;
                votingResults = votingResults.filter((player) => {
                    return game.secondVotingOptions.includes(player.playerId);
                });
                game.secondVotingOptions = [];
                if (playersToEliminate.length === 1) { // Единогласное изгнание
                    game.players[playersToEliminate[0]].eliminated = true;
                    io.to(code).emit("end_of_voting", { votingResults, eliminatedPlayerId: votingResults[0].playerId });
                }
                else { // Голоса разделились. Рандомный кик
                    const random = Math.floor(Math.random() * playersToEliminate.length);
                    game.players[playersToEliminate[random]].eliminated = true;
                    io.to(code).emit("end_of_voting", { votingResults, eliminatedPlayerId: playersToEliminate[random] });
                }
                if (game.round > data_1.numberOfRounds) { // Конец игры
                    firstGameStageFinishResultsCalculation(game);
                }
            }
            clearReady(game);
            clearVotes(game);
        }
        else { // Голос был не последним
            io.to(code).emit("vote_response", game.countOfReadyPlayers);
        }
    });
    socket.on("use_action_card", ({ code, playerId, actionCardId, data }) => {
        const game = games.get(code);
        if (!game)
            return;
        const player = game.players[playerId];
        const actionCard = player.actionCards[actionCardId];
        if (actionCard.used)
            return;
        actionCard.used = true;
        if (actionCard.serverType === 'full') {
            charFullUpdate(game, actionCard.char);
        }
        else if (actionCard.serverType === 'exchange') {
            if (data.pickedPlayerId === null)
                return;
            charExchange(game, actionCard.char, player.id, data.pickedPlayerId);
        }
        else if (actionCard.serverType === 'change') {
            if (data.pickedPlayerId === null)
                return;
            charChange(game, actionCard.char, data.pickedPlayerId);
        }
        else if (actionCard.serverType === 'cure') {
            if (data.pickedPlayerId === null)
                return;
            cure(game, data.pickedPlayerId);
        }
        else if (actionCard.serverType === 'unique') {
            if (actionCard.key === 'rejuvenate') {
                if (data.pickedPlayerId === null)
                    return;
                rejuvenate(game, data.pickedPlayerId);
            }
            else if (actionCard.key === 'changeSex') {
                if (data.pickedPlayerId === null)
                    return;
                changeSex(game, data.pickedPlayerId);
            }
        }
        io.to(code).emit("action_card_was_used", { playerId, actionCard, players: game.players });
    });
    socket.on("test_game", () => {
        // Создание игры
        const game = generateCodeAndCreateRoom('player0');
        socket.join(game.code);
        for (let i = 0; i < 11; i++) {
            const player = generatePlayer(`player${i + 1}`, false, game.players.length);
            game.players.push(player);
        }
        game.countOfNotEliminatedPlayers = game.players.length;
        for (let i = 0; i < game.players.length; i++) {
            game.players[i].eliminated = i < 6 ? false : true;
        }
        for (let i = 0; i < game.players.length; i++) {
            for (const key in game.players[i].characteristics) {
                game.players[i].characteristics[key].hidden = false;
            }
        }
        // Подсчет статов
        initializeFinale(game);
        calculateAllPlayersStats(game);
        calculateBunkerStats(game, true);
        calculatePlayerRelativeValues(game);
        calculateBunkerRelativeValues(game);
        socket.emit("test_get_players", game);
    });
    socket.on("get_first_stage_game_results", ({ code }) => {
        const game = games.get(code);
        if (!game)
            return;
        if (!game.finale.CalculationFinished) {
            socket.emit("wait_until_the_end_of_calculation");
            return;
        }
        socket.emit("game_results", game);
    });
    socket.on("pick_event", ({ code, eventId }) => {
        const game = games.get(code);
        if (!game)
            return;
        game.finale.pickedEventId = eventId;
        game.finale.turn = 'Survivors';
        const event = Events_1.Events[eventId];
        if (event.type === 'Simple') {
            game.finale.prevRoundStatistics.responseData.title = event.title;
            game.finale.prevRoundStatistics.responseData.consequenceDescription = event.description;
            calculateEffectOnBunker(game, event.effect);
        }
        io.to(code).emit("event_picked", { finale: game.finale, bunkerStats: game.bunkerStats });
    });
    socket.on("pick_response", ({ code, playerId, responseIndex }) => {
        const game = games.get(code);
        if (!game)
            return;
        if (game.finale.pickedEventId === null)
            return;
        const event = Events_1.Events[game.finale.pickedEventId];
        const consequenceId = calculateConsequences(game, event.responses[responseIndex].consequences, playerId);
        const consequence = event.responses[responseIndex].consequences[consequenceId];
        game.finale.prevRoundStatistics.responseData.title = event.responses[responseIndex].title;
        game.finale.prevRoundStatistics.responseData.consequenceDescription = consequence.descrition;
        game.finale.prevRoundStatistics.responseData.consequenceTitle = consequence.title;
        calculateEffectOnBunker(game, consequence.effect);
        startNextFinaleRound(game);
        io.to(code).emit("pick_response_response", game);
    });
    socket.on("game_ended", (code) => {
        const game = games.get(code);
        if (!game)
            return;
        games.delete(code);
    });
    socket.on("disconnect", (reason) => {
        console.log('Disconnect');
    });
});
server.listen(3001, () => {
    console.log('listening on *:3001');
});
// Dev Functions
const calculateAverage = () => {
    const game = generateCodeAndCreateRoom('player0');
    for (let i = 0; i < 5000; i++) {
        const player = generatePlayer(`player${i + 1}`, false, game.players.length);
        game.players.push(player);
    }
    for (let i = 0; i < game.players.length; i++) {
        for (const key in game.players[i].characteristics) {
            game.players[i].characteristics[key].hidden = false;
        }
    }
    // Подсчет статов
    calculateAllPlayersStats(game);
    calculateBunkerStats(game, true);
    calculateAverageValues(game);
};
const calculateAverageValues = (game) => {
    const sum = {
        Phisics: {
            key: 'Phisics',
            title: 'Физическая форма',
            value: 0,
        },
        Intelligence: {
            key: 'Intelligence',
            title: 'Интеллект',
            value: 0,
        },
        Tech: {
            key: 'Tech',
            title: 'Техническая компетентность',
            value: 0
        },
        Psycho: {
            key: 'Psycho',
            title: 'Психологическая устойчивотсь',
            value: 0,
        },
        Social: {
            key: 'Social',
            title: 'Социальность',
            value: 0,
        },
        "Food Consumption": {
            key: 'Food Consumption',
            title: 'Потребление пищи',
            value: 0,
        },
        "Med Consumption": {
            key: 'Med Consumption',
            title: 'Потребление медикаментов',
            value: 0
        },
        Med: {
            key: 'Med',
            title: 'Навыки медицины',
            value: 0
        }
    };
    const average = {
        Phisics: {
            key: 'Phisics',
            title: 'Физическая форма',
            value: 0,
        },
        Intelligence: {
            key: 'Intelligence',
            title: 'Интеллект',
            value: 0,
        },
        Tech: {
            key: 'Tech',
            title: 'Техническая компетентность',
            value: 0
        },
        Psycho: {
            key: 'Psycho',
            title: 'Психологическая устойчивотсь',
            value: 0,
        },
        Social: {
            key: 'Social',
            title: 'Социальность',
            value: 0,
        },
        "Food Consumption": {
            key: 'Food Consumption',
            title: 'Потребление пищи',
            value: 0,
        },
        "Med Consumption": {
            key: 'Med Consumption',
            title: 'Потребление медикаментов',
            value: 0
        },
        Med: {
            key: 'Med',
            title: 'Навыки медицины',
            value: 0
        }
    };
    game.players.map((player) => {
        for (const key in player.playerStats) {
            sum[key].value += player.playerStats[key].value;
        }
    });
    for (const key in sum) {
        average[key].value = sum[key].value / game.players.length;
    }
    console.log(sum);
    console.log(average);
};
