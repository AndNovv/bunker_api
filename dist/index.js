"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const data_1 = require("./data/data");
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
const charKeyToData = new Map([
    ['profession', data_1.professions],
    ['health', data_1.healthConditions],
    ['hobby', data_1.hobbies],
    ['interestingFact', data_1.interestingFacts],
    ['trait', data_1.traits],
    ['bodyType', data_1.bodyTypes],
    ['bagage', data_1.bagage],
]);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
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
    console.log("Генерирую игрока");
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
    const game = { gamestatus: 'waiting', code, round: 1, countOfReadyPlayers: 0, players: [player], secondVotingOptions: [], roundsFlow: [], countOfNotEliminatedPlayers: 1 };
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
const calculateGameResults = (game) => {
    console.log('Результаты');
    console.log(game);
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
const calculateAllPlayersStats = (game) => {
    for (let i = 0; i < game.players.length; i++) {
        if (!game.players[i].eliminated) {
            calculatePlayerStats(game.players[i]);
        }
    }
};
const calculatePlayerStats = (player) => {
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
        stats.Phisics.value += -4;
    }
    // Профессия и хобби
    chars.profession.value.effect.map((statEffect) => {
        if (statEffect.stat === 'Phisics') {
            stats[statEffect.stat].value += statEffect.value;
        }
        else {
            stats[statEffect.stat].value += Math.floor(ageMultiplier * statEffect.value);
        }
    });
    chars.hobby.value.effect.map((statEffect) => {
        if (statEffect.stat === 'Phisics') {
            stats[statEffect.stat].value += statEffect.value;
        }
        else {
            stats[statEffect.stat].value += Math.floor(ageMultiplier * statEffect.value);
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
// Карты действий
const charExchange = (game, char, player1, player2) => {
    const temp = game.players[player1].characteristics[char].value;
    game.players[player1].characteristics[char].value = game.players[player2].characteristics[char].value;
    game.players[player2].characteristics[char].value = temp;
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
                        game.gamestatus = 'results';
                        calculateGameResults(game);
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
                if (game.round > data_1.numberOfRounds) { // Конец игры
                    game.gamestatus = 'results';
                    calculateGameResults(game);
                }
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
            console.log('Обмен');
            console.log(data);
            if (data.pickedPlayerId === null)
                return;
            console.log('Успех');
            charExchange(game, actionCard.char, player.id, data.pickedPlayerId);
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
    socket.on("get_results", () => {
        socket.emit("get_results_response");
    });
    socket.on("test_game", () => {
        // Создание игры на 8 игроков
        const game = generateCodeAndCreateRoom('1');
        for (let i = 0; i < 7; i++) {
            const player = generatePlayer('f', false, game.players.length);
            game.players.push(player);
        }
        for (let i = 0; i < game.players.length; i++) {
            for (const key in game.players[i].characteristics) {
                game.players[i].characteristics[key].hidden = false;
            }
        }
        // Подсчет статов
        calculateAllPlayersStats(game);
        socket.emit("test_get_players", game.players);
    });
    socket.on("disconnect", (reason) => {
        console.log('Disconnect');
    });
});
server.listen(3001, () => {
    console.log('listening on *:3001');
});
