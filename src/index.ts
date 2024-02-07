import express from "express";
const app = express();
import http from 'http';
import { Server } from "socket.io";

import { professions, hobbies, traits, bodyTypes, bagage, healthConditions, interestingFacts, GameFlow, numberOfRounds, ActionCards } from "./data/data";

import cors from "cors";
import { GameType, JoinDataResponse, PlayerCharachteristicsType, PlayerType, VotingResultsType, charKeys, responseType, serverResponses, useActionCardDataType } from "./types";
app.use(cors())

const charKeyToData = new Map<charKeys, any[]>([
    ['profession', professions],
    ['health', healthConditions],
    ['hobby', hobbies],
    ['interestingFact', interestingFacts],
    ['trait', traits],
    ['bodyType', bodyTypes],
    ['bagage', bagage],
]);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const games = new Map<string, GameType>()

const findPlayerIndexByName = (players: PlayerType[], playerName: string): number => {
    const index = players.findIndex(player => player.name === playerName);
    return index;
};

function pickRandomFromArray<T>(array: T[]) {
    return structuredClone(array[Math.floor(Math.random() * array.length)])
}

function generatePlayer(name: string, host: boolean, id: number) {
    console.log("Генерирую игрока")
    const player: PlayerType = {
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
                value: pickRandomFromArray(bodyTypes),
                hidden: true,
            },
            profession: {
                key: 'profession',
                title: 'Профессия',
                value: pickRandomFromArray(professions),
                hidden: true,
            },
            health: {
                key: 'health',
                title: 'Здоровье',
                value: pickRandomFromArray(healthConditions),
                hidden: true,
            },
            trait: {
                key: 'trait',
                title: 'Черта характера',
                value: pickRandomFromArray(traits),
                hidden: true,
            },
            hobby: {
                key: 'hobby',
                title: 'Хобби',
                value: pickRandomFromArray(hobbies),
                hidden: true,
            },
            interestingFact: {
                key: 'interestingFact',
                title: 'Факт',
                value: pickRandomFromArray(interestingFacts),
                hidden: true,
            },
            bagage: {
                key: 'bagage',
                title: 'Багаж',
                value: pickRandomFromArray(bagage),
                hidden: true,
            }

        },
        actionCards: [pickRandomFromArray(ActionCards), pickRandomFromArray(ActionCards)],
        revealedCount: 0,
        eliminated: false,
    }
    return player
}

function generateCodeAndCreateRoom(name: string): GameType {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        code += alphabet.charAt(randomIndex);
    }

    if (games.has(code)) return generateCodeAndCreateRoom(name)

    const player = generatePlayer(name, true, 0)
    const game: GameType = { gamestatus: 'waiting', code, round: 1, countOfReadyPlayers: 0, players: [player], secondVotingOptions: [], roundsFlow: [], countOfNotEliminatedPlayers: 1 }
    games.set(code, game)
    return game
}

const joinResponseDataHandler = (game: GameType, playerId: number, name: string): JoinDataResponse => {
    const data: JoinDataResponse = {
        name,
        playerId,
        game
    }
    return data
}

const responseHandler = <TData>(resType: serverResponses, data = {} as TData) => {
    const response: responseType<TData> = { status: 'error', message: 'Внутренняя ошибка сервера', data }
    if (resType === 'create success') {
        response.status = 'success'
        response.message = 'Успешный вход'
    }
    if (resType === 'join success') {
        response.status = 'success'
        response.message = 'Успешный вход'
    }
    if (resType === 'join code error') {
        response.status = 'error'
        response.message = 'Неверный код'
    }
    if (resType === 'join name error') {
        response.status = 'error'
        response.message = 'Имя уже занято'
    }
    return response
}

const clearReady = (game: GameType) => {
    game.countOfReadyPlayers = 0
    for (let i = 0; i < game.players.length; i++) {
        game.players[i].ready = false
    }
}

const clearVotes = (game: GameType) => {
    for (let i = 0; i < game.players.length; i++) {
        game.players[i].votes = 0
    }
}

const calculateGameResults = (game: GameType) => {
    console.log('Результаты')
    console.log(game)
}

const calculateNextStage = (game: GameType) => {
    if (game.roundsFlow[game.round - 1]) {
        game.gamestatus = 'discussion'
    }
    else {
        game.round += 1
        game.gamestatus = 'revealing'
    }
}


// Карты действий

const charExchange = (game: GameType, char: charKeys, player1: number, player2: number) => {
    const temp = game.players[player1].characteristics[char].value
    game.players[player1].characteristics[char].value = game.players[player2].characteristics[char].value
    game.players[player2].characteristics[char].value = temp
}

const charFullUpdate = (game: GameType, char: charKeys) => {
    const data = charKeyToData.get(char)
    if (!data) throw Error('Данные не найдены')
    for (let i = 0; i < game.players.length; i++) {
        game.players[i].characteristics[char].value = pickRandomFromArray(data)
    }
}

// Омоложение
const rejuvenate = (game: GameType, player1: number) => {
    const newAge = Number(game.players[player1].characteristics.age.value) - 20
    game.players[player1].characteristics.age.value = String(newAge < 18 ? 18 : newAge)
}

const changeSex = (game: GameType, player1: number) => {
    game.players[player1].characteristics.sex.value = game.players[player1].characteristics.sex.value === 'Мужчина' ? 'Женщина' : 'Мужчина'
}

const cure = (game: GameType, player1: number) => {
    game.players[player1].characteristics.health.value = structuredClone(healthConditions[0])
}

io.on('connection', (socket) => {
    console.log(`Connection ${socket.id}`)

    socket.on("start_game", (code: string) => {
        const game = games.get(code)
        if (game) {
            game.gamestatus = 'preparing'
            game.countOfNotEliminatedPlayers = game.players.length
            const roundsFlow = GameFlow.get(game.players.length.toString())
            if (roundsFlow) {
                game.roundsFlow = roundsFlow
                io.to(code).emit("start_game_response", game)
            }
            else {
                console.log('Error: RoundFlow')
            }
        }
        else {
            console.log("Ошибка кода при старте игры")
        }
    })

    socket.on("create_game", (name: string) => {
        games.clear()
        const game = generateCodeAndCreateRoom(name)
        const response = responseHandler('create success', { code: game.code, name, players: game.players })
        socket.join(game.code)
        socket.emit("create_game_response", response)
    })

    socket.on("join_game", (code: string, name: string) => {
        const game = games.get(code)
        let response

        if (!game) {
            const response = responseHandler('join code error')
            socket.emit("join_game_response", response)
            return
        }

        const playerId = findPlayerIndexByName(game.players, name)

        if (playerId != -1) { // Игрок с таким именем уже в игре

            if (game.gamestatus === 'waiting') {
                response = responseHandler('join name error')
            }
            else { // Реконнект
                socket.join(code)
                response = responseHandler('join success', joinResponseDataHandler(game, playerId, name))
            }
            socket.emit("join_game_response", response)
            return
        }

        if (game.gamestatus === 'waiting') {
            socket.join(code)
            const player: PlayerType = generatePlayer(name, false, game.players.length)
            game.players.push(player)
            game.countOfNotEliminatedPlayers += 1
            response = responseHandler('join success', joinResponseDataHandler(game, game.players.length - 1, name))
            io.to(code).emit("player_connected", player);
            socket.emit("join_game_response", response)
        }
        else {
            response = responseHandler('join code error')
            socket.emit("join_game_response", response)
        }
    })


    socket.on("player_ready", ({ code, playerId, charachterName }: { code: string, playerId: number, charachterName: string }) => {
        const game = games.get(code)
        if (!game) return
        if (game.players[playerId].ready) return
        game.players[playerId].ready = true
        game.players[playerId].characteristics.name.value = charachterName
        game.countOfReadyPlayers += 1
        if (game.countOfReadyPlayers === game.players.length) {
            game.gamestatus = 'revealing'
            clearReady(game)
            io.to(code).emit("all_players_ready", game.players)
        }
        else {
            io.to(code).emit("player_ready_response")
        }

    })

    socket.on("char_revealed", ({ code, playerId, charTitle }: { code: string, playerId: number, charTitle: keyof PlayerCharachteristicsType }) => {
        const game = games.get(code)
        if (!game) return
        if (game.players[playerId].revealedCount >= game.round) return
        game.players[playerId].revealedCount += 1
        game.players[playerId].characteristics[charTitle].hidden = false
        game.countOfReadyPlayers += 1
        if (game.countOfReadyPlayers === game.countOfNotEliminatedPlayers) {
            game.countOfReadyPlayers = 0
            calculateNextStage(game)
            io.to(code).emit("end_of_round_revealing", game.players)
        }
        else {
            io.to(code).emit("char_revealed_response", game.players)
        }
    })


    socket.on("ready_discussion", ({ code, playerId }: { code: string, playerId: number }) => {
        const game = games.get(code)
        if (!game) return
        if (game.players[playerId].ready) return
        game.players[playerId].ready = true
        game.countOfReadyPlayers += 1

        if (game.countOfReadyPlayers === game.countOfNotEliminatedPlayers) {
            clearReady(game)
            if (game.roundsFlow[game.round - 1]) {
                game.gamestatus = 'voting'
                io.to(code).emit("start_voting")
            }
            else {
                game.round += 1
                game.gamestatus = 'revealing'
                io.to(code).emit("start_next_round")
            }
        }
        else {
            io.to(code).emit("ready_to_vote_response", game.countOfReadyPlayers)
        }
    })

    socket.on("vote", ({ code, playerId, vote }: { code: string, playerId: number, vote: number }) => {
        const game = games.get(code)
        if (!game) return
        if (game.players[playerId].ready) return
        game.players[playerId].ready = true
        game.countOfReadyPlayers += 1
        game.players[vote].votes += 1

        if (game.countOfReadyPlayers === game.countOfNotEliminatedPlayers) {
            // Логика конца голосования
            const playersToEliminate = []
            let maxVotes = 0
            for (let i = 0; i < game.players.length; i++) {
                if (game.players[i].votes > maxVotes) {
                    maxVotes = game.players[i].votes
                    playersToEliminate.length = 0
                    playersToEliminate.push(i)
                }
                else if (game.players[i].votes === maxVotes) {
                    playersToEliminate.push(i)
                }
            }
            let votingResults: VotingResultsType = game.players.map((player) => ({ playerId: player.id, votes: player.votes })).sort((p1, p2) => { return p2.votes - p1.votes })

            if (game.gamestatus === 'voting') {
                if (playersToEliminate.length === 1) { // Единогласное изгнание
                    game.countOfNotEliminatedPlayers -= 1
                    game.round += 1
                    game.players[playersToEliminate[0]].eliminated = true
                    game.gamestatus = 'revealing'

                    if (game.round > numberOfRounds) { // Конец игры
                        game.gamestatus = 'results'
                        calculateGameResults(game)
                    }

                    io.to(code).emit("end_of_voting", { votingResults, eliminatedPlayerId: votingResults[0].playerId })
                }
                else { // Голосование требуется повторить
                    game.gamestatus = 'second voting'
                    game.secondVotingOptions = playersToEliminate
                    io.to(code).emit("second_voting", playersToEliminate)
                }
            }
            else if (game.gamestatus === 'second voting') { // Повторное голосование

                game.gamestatus = 'revealing'
                game.round += 1
                game.countOfNotEliminatedPlayers -= 1

                if (game.round > numberOfRounds) { // Конец игры
                    game.gamestatus = 'results'
                    calculateGameResults(game)
                }

                votingResults = votingResults.filter((player) => {
                    return game.secondVotingOptions.includes(player.playerId)
                })
                game.secondVotingOptions = []

                if (playersToEliminate.length === 1) { // Единогласное изгнание
                    game.players[playersToEliminate[0]].eliminated = true
                    io.to(code).emit("end_of_voting", { votingResults, eliminatedPlayerId: votingResults[0].playerId })
                }
                else { // Голоса разделились. Рандомный кик
                    const random = Math.floor(Math.random() * playersToEliminate.length)
                    game.players[playersToEliminate[random]].eliminated = true
                    io.to(code).emit("end_of_voting", { votingResults, eliminatedPlayerId: playersToEliminate[random] })
                }
            }
            clearReady(game)
            clearVotes(game)
        }
        else { // Голос был не последним
            io.to(code).emit("vote_response", game.countOfReadyPlayers)
        }
    })

    socket.on("use_action_card", ({ code, playerId, actionCardId, data }: { code: string, playerId: number, actionCardId: number, data: useActionCardDataType }) => {
        const game = games.get(code)
        if (!game) return
        const player = game.players[playerId]
        const actionCard = player.actionCards[actionCardId]

        if (actionCard.used) return
        actionCard.used = true

        if (actionCard.serverType === 'full') {
            charFullUpdate(game, actionCard.char)
        }

        else if (actionCard.serverType === 'exchange') {
            console.log('Обмен')
            console.log(data)
            if (data.pickedPlayerId === null) return
            console.log('Успех')
            charExchange(game, actionCard.char, player.id, data.pickedPlayerId)
        }

        else if (actionCard.serverType === 'cure') {
            if (data.pickedPlayerId === null) return
            cure(game, data.pickedPlayerId)
        }

        else if (actionCard.serverType === 'unique') {
            if (actionCard.key === 'rejuvenate') {
                if (data.pickedPlayerId === null) return
                rejuvenate(game, data.pickedPlayerId)
            }
            else if (actionCard.key === 'changeSex') {
                if (data.pickedPlayerId === null) return
                changeSex(game, data.pickedPlayerId)
            }
        }
        io.to(code).emit("action_card_was_used", { playerId, actionCard, players: game.players })
    })


    socket.on("get_results", () => {
        socket.emit("get_results_response")
    })


    socket.on("test_game", () => {
        const game = generateCodeAndCreateRoom('1')
        for (let i = 0; i < 7; i++) {
            const player: PlayerType = generatePlayer('f', false, game.players.length)
            game.players.push(player)
        }
        for (let i = 0; i < game.players.length; i++) {
            for (const key in game.players[i].characteristics) {
                game.players[i].characteristics[key as charKeys].hidden = false
            }
        }
        socket.emit("test_get_players", game.players)
    })


    socket.on("disconnect", (reason) => {
        console.log('Disconnect')
    });

})

server.listen(3001, () => {
    console.log('listening on *:3001');
});
