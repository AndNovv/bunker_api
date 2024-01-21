import express from "express";
const app = express();
import http from 'http';
import { Server } from "socket.io";

import { professions, hobbies, phobias, healthConditions, interestingFacts } from "./data/data";

import cors from "cors";
app.use(cors())

const server = http.createServer(app);

type GameStatus = 'waiting' | 'preparing' | 'in game' | 'results'

type JoinDataResponse = {
    code: string,
    name: string,
    playerId: number,
    players: PlayerType[],
    gameStatus: GameStatus
}

type GameType = {
    gamestatus: GameStatus,
    code: string,
    countOfReadyPlayers: number,
    players: PlayerType[],
}

type PlayerType = {
    name: string,
    host: boolean,
    ready: boolean,
    characteristics: {
        sex: { title: 'Пол', value: 'Мужчина' | 'Женщина' },
        age: { title: 'Возраст', value: string }
        profession: { title: 'Профессия', value: string },
        hobby: { title: 'Хобби', value: string },
        phobia: { title: 'Фобия', value: string },
        health: { title: 'Здоровье', value: string },
        interestingFact: { title: 'Факт', value: string },
    }
}

export type responseType<TData> = {
    status: 'success' | 'error',
    data: TData,
    message: string
}

type serverResponses = 'join success' | 'create success' | 'join code error' | 'join name error'

const games = new Map<string, GameType>()

const findPlayerIndexByName = (players: PlayerType[], playerName: string): number => {
    const index = players.findIndex(player => player.name === playerName);
    return index;
};

function pickRandomFromArray<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)]
}

function generatePlayer(name: string, host: boolean) {
    console.log("Генерирую игрока")
    const player: PlayerType = {
        name,
        host,
        ready: false,
        characteristics: {
            sex: {
                title: 'Пол',
                value: Math.random() > 0.5 ? 'Мужчина' : 'Женщина',
            },
            age: {
                title: 'Возраст',
                value: Math.floor(Math.random() * 90).toString(),
            },
            profession: {
                title: 'Профессия',
                value: pickRandomFromArray(professions)
            },
            health: {
                title: 'Здоровье',
                value: pickRandomFromArray(healthConditions)
            },
            phobia: {
                title: 'Фобия',
                value: pickRandomFromArray(phobias)
            },
            hobby: {
                title: 'Хобби',
                value: pickRandomFromArray(hobbies)
            },
            interestingFact: {
                title: 'Факт',
                value: pickRandomFromArray(interestingFacts)
            },
        }
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

    const player = generatePlayer(name, true)
    const game: GameType = { gamestatus: 'waiting', code, countOfReadyPlayers: 0, players: [player] }
    games.set(code, game)
    return game
}

const joinResponseDataHandler = (game: GameType, playerId: number, name: string): JoinDataResponse => {
    const data: JoinDataResponse = {
        name,
        code: game.code,
        playerId,
        players: game.players,
        gameStatus: game.gamestatus,
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
        if (game) {
            const playerId = findPlayerIndexByName(game.players, name)
            if (playerId != -1) { // Игрок с таким именем уже в игре
                if (game.gamestatus === 'waiting') {
                    response = responseHandler('join name error')
                }
                else { // Реконнект
                    response = responseHandler('join success', joinResponseDataHandler(game, playerId, name))
                }
            }
            else {
                socket.join(code)
                const player: PlayerType = generatePlayer(name, false)
                game.players.push(player)
                response = responseHandler('join success', joinResponseDataHandler(game, game.players.length - 1, name))
                io.to(code).emit("player_connected", player);
            }
        } else {
            response = responseHandler('join code error')
        }
        socket.emit("join_game_response", response)
    })


    socket.on("player_ready", (code: string, playerId: number) => {
        const game = games.get(code)
        if (game) {
            game.players[playerId].ready = true
        }

    })

    socket.on("disconnect", (reason) => {
        console.log('Disconnect')
    });

})

server.listen(3001, () => {
    console.log('listening on *:3001');
});