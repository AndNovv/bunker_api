import express from "express";
const app = express();
import http from 'http';
import { Server } from "socket.io";

import { professions, hobbies, phobias, healthConditions, interestingFacts } from "./data/data";

import cors from "cors";
app.use(cors())

const server = http.createServer(app);

type GameStatus = 'waiting' | 'preparing' | 'in game' | 'discussion' | 'voting' | 'second voting' | 'results'

type JoinDataResponse = {
    name: string,
    playerId: number,
    game: GameType,
}

type GameType = {
    gamestatus: GameStatus,
    code: string,
    round: number,
    countOfReadyPlayers: number,
    players: PlayerType[],
    secondVotingOptions: number[],
}

type PlayerType = {
    id: number,
    name: string,
    host: boolean,
    ready: boolean,
    votes: number,
    characteristics: PlayerCharachteristicsType,
    revealedCount: number,
    eliminated: boolean,
}

type PlayerCharachteristicsType = {
    name: Charachteristic<'Имя', string>,
    sex: Charachteristic<'Пол', 'Мужчина' | 'Женщина'>,
    age: Charachteristic<'Возраст', string>,
    profession: Charachteristic<'Профессия', string>,
    hobby: Charachteristic<'Хобби', string>,
    phobia: Charachteristic<'Фобия', string>,
    health: Charachteristic<'Здоровье', string>,
    interestingFact: Charachteristic<'Факт', string>,
}

type Charachteristic<TTitle, Tvalue> = {
    key: keyof PlayerCharachteristicsType,
    title: TTitle,
    value: Tvalue,
    hidden: boolean
}

type responseType<TData> = {
    status: 'success' | 'error',
    data: TData,
    message: string
}

type VotingResultsType = {
    playerId: number,
    votes: number,
}[]

type serverResponses = 'join success' | 'create success' | 'join code error' | 'join name error'

const games = new Map<string, GameType>()

const findPlayerIndexByName = (players: PlayerType[], playerName: string): number => {
    const index = players.findIndex(player => player.name === playerName);
    return index;
};

function pickRandomFromArray<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)]
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
                value: Math.floor(Math.random() * 90 + 10).toString(),
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
            phobia: {
                key: 'phobia',
                title: 'Фобия',
                value: pickRandomFromArray(phobias),
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
        },
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
    const game: GameType = { gamestatus: 'waiting', code, round: 1, countOfReadyPlayers: 0, players: [player], secondVotingOptions: [] }
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

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

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


io.on('connection', (socket) => {
    console.log(`Connection ${socket.id}`)

    socket.on("start_game", (code: string) => {
        const game = games.get(code)
        if (game) {
            game.gamestatus = 'preparing'
            io.to(code).emit("start_game_response", game)
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
        game.players[playerId].ready = true
        game.players[playerId].characteristics.name.value = charachterName
        game.countOfReadyPlayers += 1
        if (game.countOfReadyPlayers === game.players.length) {
            game.gamestatus = 'in game'
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
        if (game.countOfReadyPlayers === game.players.length) {
            game.countOfReadyPlayers = 0
            game.gamestatus = 'discussion'
            io.to(code).emit("end_of_round_revealing", game.players)
        }
        else {
            io.to(code).emit("char_revealed_response", game.players)
        }
    })

    socket.on("ready_to_vote", ({ code, playerId }: { code: string, playerId: number }) => {
        const game = games.get(code)
        if (!game) return
        if (game.players[playerId].ready) return
        game.players[playerId].ready = true
        game.countOfReadyPlayers += 1

        if (game.countOfReadyPlayers === game.players.length) {
            clearReady(game)
            game.gamestatus = 'voting'
            io.to(code).emit("start_voting")
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

        if (game.countOfReadyPlayers === game.players.length) {
            // Логика конца голосования
            const playersToEliminate = []
            let maxVotes = 0
            for (let i = 0; i < game.players.length; i++) {
                console.log(game.players[i].name, game.players[i].votes)
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
                    game.round += 1
                    game.players[playersToEliminate[0]].eliminated = true
                    game.gamestatus = 'in game'
                    io.to(code).emit("end_of_voting", { votingResults, eliminatedPlayerId: votingResults[0].playerId })
                }
                else { // Голосование требуется повторить
                    game.gamestatus = 'second voting'
                    game.secondVotingOptions = playersToEliminate
                    io.to(code).emit("second_voting", votingResults)
                }
            }
            else if (game.gamestatus === 'second voting') { // Повторное голосование

                game.gamestatus = 'in game'
                game.round += 1

                console.log(game.secondVotingOptions)
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

    socket.on("disconnect", (reason) => {
        console.log('Disconnect')
    });

})

server.listen(3001, () => {
    console.log('listening on *:3001');
});
