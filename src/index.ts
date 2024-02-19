import express from "express";
const app = express();
import http from 'http';
import { Server } from "socket.io";

import { professions, hobbies, traits, bodyTypes, bagage, healthConditions, interestingFacts, GameFlow, numberOfRounds, ActionCards, PlayerStats, BunkerStats } from "./data/data";

import cors from "cors";
import { GameType, JoinDataResponse, PlayerCharachteristicsType, PlayerStatsType, PlayerType, RelativeValue, VotingResultsType, charKeys, responseType, serverResponses, useActionCardDataType } from "./types";
import { foodConsumptionAverage, intelligenceAverage, medAverage, medConsumptionAverage, phisicsAverage, psychoAverage, socialAverage, techAverage } from "./data/AveragePlayerStats";
import { Consequence, EventEffect, Events } from "./data/Events";
app.use(cors())

const charKeyToData = new Map<charKeys, any[]>([
    ['profession', professions],
    ['health', healthConditions],
    ['hobby', hobbies],
    ['interestingFact', interestingFacts],
    ['trait', traits],
    ['bodyType', bodyTypes],
    ['bagage', bagage],
] as const);

const statsToAverage = new Map<BunkerStats | PlayerStats, number>([
    ['Med', medAverage],
    ['Food Consumption', foodConsumptionAverage],
    ['Phisics', phisicsAverage],
    ['Psycho', psychoAverage],
    ['Intelligence', intelligenceAverage],
    ['Med Consumption', medConsumptionAverage]
] as const)

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", 'http://192.168.1.27:3000', 'http://166.1.160.98:3000'],
        methods: ["GET", "POST"],
    },
});

console.log(process.env.SERVER_IP)

const games = new Map<string, GameType>()

const findPlayerIndexByName = (players: PlayerType[], playerName: string): number => {
    const index = players.findIndex(player => player.name === playerName);
    return index;
};

function pickRandomFromArray<T>(array: T[]) {
    return structuredClone(array[Math.floor(Math.random() * array.length)])
}

function generatePlayer(name: string, host: boolean, id: number) {
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
    const game: GameType = {
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
            isInitialized: false,
        }
    }
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

// Final calculations

const calculateBunkerStats = (game: GameType, firstCalculation: boolean) => {
    game.bunkerStats['Med Consumption'].value = 0
    game.bunkerStats['Food Consumption'].value = 0
    game.bunkerStats["Med"].value = 0
    game.bunkerStats["Tech"].value = 0
    game.bunkerStats["Safety"].value = 0

    game.finale.survivingPlayersId.forEach((playerId) => {
        const player = game.players[playerId]
        game.bunkerStats['Med Consumption'].value += player.playerStats["Med Consumption"].value
        game.bunkerStats['Food Consumption'].value += player.playerStats["Food Consumption"].value

        game.bunkerStats["Med"].value += player.playerStats["Med"].value
        game.bunkerStats["Tech"].value += player.playerStats["Tech"].value
        game.bunkerStats["Safety"].value += player.playerStats["Phisics"].value

        if (firstCalculation) {
            game.bunkerStats["Anxiety"].value += socialAverage + 1 - player.playerStats["Social"].value
            game.bunkerStats["Anxiety"].value += psychoAverage + 1 - player.playerStats["Psycho"].value

            // Подсчет багажа
            const effect = player.characteristics.bagage.value.effect
            for (let i = 0; i < effect.length; i++) {
                if (effect[i].stat !== 'Anxiety') {
                    game.bunkerStats[effect[i].stat].value += effect[i].value
                }
            }
        }
    })

    // Проверка на нули
    if (game.bunkerStats["Anxiety"].value < 0) {
        game.bunkerStats["Anxiety"].value = 0
    }
}

const calculateAllPlayersStats = (game: GameType) => {
    for (let i = 0; i < game.finale.survivingPlayersId.length; i++) {
        const playerId = game.finale.survivingPlayersId[i]
        calculatePlayerStats(game.players[playerId])
    }
}

const calculatePlayerRelativeValues = (game: GameType) => {
    const stats: { key: PlayerStats, average: number }[] = [{ key: 'Intelligence', average: intelligenceAverage }, { key: 'Social', average: socialAverage }]
    game.finale.survivingPlayersId.map((playerId) => {

        const player = game.players[playerId]

        stats.map((stat) => {
            const value = player.playerStats[stat.key].value

            let relativeValue: RelativeValue = 0
            if (value < stat.average * 0.4) {
                relativeValue = 0
            }
            else if (value < stat.average * 0.7) {
                relativeValue = 1
            }
            else if (value < stat.average * 1.3) {
                relativeValue = 2
            }
            else if (value < stat.average * 1.5) {
                relativeValue = 3
            }
            else {
                relativeValue = 4
            }
            if (stat.key === 'Intelligence' || stat.key === 'Social') {
                player.relatives[stat.key].value = relativeValue
            }
        })
    })
}

const calculateBunkerRelativeValues = (game: GameType) => {
    const stats: { key: BunkerStats, average: number }[] = [{ key: 'Med', average: medAverage }, { key: 'Tech', average: techAverage }, { key: 'Safety', average: phisicsAverage }]
    stats.map((stat) => {
        const average = Math.floor(game.players.length / 2) * stat.average
        const value = game.bunkerStats[stat.key].value

        let relativeValue: RelativeValue = 0
        if (value < average * 0.7) {
            relativeValue = 0
        }
        else if (value < average * 0.8) {
            relativeValue = 1
        }
        else if (value < average * 1.2) {
            relativeValue = 2
        }
        else if (value < average * 1.4) {
            relativeValue = 3
        }
        else {
            relativeValue = 4
        }
        if (stat.key === 'Med' || stat.key === 'Safety' || stat.key === 'Tech') {
            game.bunkerRelatives[stat.key].value = relativeValue
            game.bunkerRelatives[stat.key].expected = average
            game.bunkerRelatives[stat.key].real = value
        }
    })

}


const resetPlayerStats = (player: PlayerType) => {
    player.playerStats["Food Consumption"].value = 6
    player.playerStats["Intelligence"].value = 3
    player.playerStats["Med"].value = 0
    player.playerStats["Med Consumption"].value = 0
    player.playerStats["Phisics"].value = 3
    player.playerStats["Psycho"].value = 3
    player.playerStats["Social"].value = 3
    player.playerStats["Tech"].value = 1
}

const calculatePlayerStats = (player: PlayerType) => {

    resetPlayerStats(player)
    const chars = player.characteristics
    const stats = player.playerStats

    let ageMultiplier = 1 // Влияет на профит от профессии и хобби (кроме физической формы)

    // Пол
    if (chars.sex.value === 'Мужчина') {
        stats["Food Consumption"].value += 1
        stats.Phisics.value += 1
    }

    // Возраст
    const age = Number(chars.age.value)
    if (age < 20) {
        ageMultiplier = 0.7

        stats.Phisics.value += 2
        stats["Food Consumption"].value += 1
    }
    else if (age < 30) {
        ageMultiplier = 1

        stats.Phisics.value += 2
        stats.Intelligence.value += 1
        stats.Tech.value += 1
        stats.Psycho.value += 1
        stats["Food Consumption"].value += 1

    }
    else if (age < 50) {
        ageMultiplier = 1.3

        stats.Phisics.value += 1
        stats.Intelligence.value += 2
        stats.Tech.value += 2
        stats.Psycho.value += 2
        stats["Food Consumption"].value += 1
    }
    else if (age < 70) {
        ageMultiplier = 1.5

        stats.Phisics.value += -1
        stats.Intelligence.value += 1
        stats.Tech.value += 1
        stats.Psycho.value += 2
        stats["Med Consumption"].value += 1
    }
    else {
        ageMultiplier = 1.5

        stats["Med Consumption"].value += 1
        stats.Phisics.value += -4
    }

    // Профессия и хобби
    chars.profession.value.effect.map((statEffect) => {
        if (statEffect.stat === 'Intelligence' || statEffect.stat === 'Tech' || statEffect.stat === 'Med' || statEffect.stat === 'Social') {
            stats[statEffect.stat].value += Math.floor(ageMultiplier * statEffect.value)
        }
        else {
            stats[statEffect.stat].value += statEffect.value
        }
    })
    chars.hobby.value.effect.map((statEffect) => {
        if (statEffect.stat === 'Intelligence' || statEffect.stat === 'Tech' || statEffect.stat === 'Med' || statEffect.stat === 'Social') {
            stats[statEffect.stat].value += Math.floor(ageMultiplier * statEffect.value)
        }
        else {
            stats[statEffect.stat].value += statEffect.value
        }
    })

    // Остальное
    chars.bodyType.value.effect.map((statEffect) => {
        stats[statEffect.stat].value += statEffect.value
    })
    chars.health.value.effect.map((statEffect) => {
        stats[statEffect.stat].value += statEffect.value
    })
    chars.interestingFact.value.effect.map((statEffect) => {
        stats[statEffect.stat].value += statEffect.value
    })
    chars.trait.value.effect.map((statEffect) => {
        stats[statEffect.stat].value += statEffect.value
    })


    // Проверка на отрицательные значения (Вместо отрицательных нули)
    for (const key in stats) {
        if (stats[key as PlayerStats].value < 0) {
            stats[key as PlayerStats].value = 0
        }
    }
}

// Финальная игра

const calculateConsequences = (game: GameType, consequences: Consequence[], playerId: number) => {
    let random = Math.random()

    for (let i = 0; i < consequences.length; i++) {
        const consequence = consequences[i]

        let probability = 0
        if (consequence.type === 'Simple') {
            probability = consequence.probability
        }
        if (consequence.type === 'Complex') {
            const dependency = consequence.probabilityDependence
            if (dependency.type === 'Player') {
                if (dependency.stat === 'Intelligence') {
                    probability = consequence.probability[game.players[playerId].relatives[dependency.stat].value]
                }
            }
            else {
                if (dependency.stat === 'Med' || dependency.stat === 'Safety' || dependency.stat === 'Tech') {
                    probability = consequence.probability[game.bunkerRelatives[dependency.stat].value]
                }
            }
        }

        if (random <= probability) {
            return i
        }
        else {
            random -= probability
        }
    }
    return 0
}

const getEventIdList = () => {
    const result: number[] = []
    while (result.length < 3) {
        const newValue = Math.floor(Math.random() * Events.length)
        if (!result.includes(newValue)) {
            result.push(newValue)
        }
    }
    return result
}

const initializeFinale = (game: GameType) => {
    const finale = game.finale
    finale.isInitialized = true
    finale.eventsIdList = getEventIdList()
    finale.round = 1
    finale.maxRounds = 10
    finale.turn = 'Eliminated'
    for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].eliminated) {
            finale.eliminatedPlayersId.push(i)
        }
        else {
            finale.survivingPlayersId.push(i)
        }
    }
    finale.survivingPlayerTurnId = finale.survivingPlayersId[0]
    finale.eliminatedPlayerTurnId = finale.eliminatedPlayersId[0]
    finale.eventTargetPlayerId = game.finale.survivingPlayersId[Math.floor(Math.random() * game.finale.survivingPlayersId.length)]
}

const startNextFinaleRound = (game: GameType) => {

    const finale = game.finale
    const bunkerStats = game.bunkerStats
    finale.round += 1
    if (finale.round < finale.maxRounds) {
        calculateNextTurnIds(game)
        finale.pickedEventId = null
        finale.eventsIdList = getEventIdList()
        finale.turn = 'Eliminated'
        finale.prevRoundStatistics.eventTargetPlayerId = finale.eventTargetPlayerId
        finale.eventTargetPlayerId = game.finale.survivingPlayersId[Math.floor(Math.random() * game.finale.survivingPlayersId.length)]

        bunkerStats.Food.value -= bunkerStats["Food Consumption"].value
        bunkerStats.Medicines.value -= bunkerStats["Med Consumption"].value

        if (bunkerStats.Food.value < 0) {
            bunkerStats.Food.value = 0
            bunkerStats.Anxiety.value += 2

            finale.prevRoundStatistics.foodEnough = false
        }
        else {
            finale.prevRoundStatistics.foodEnough = true
        }

        if (bunkerStats.Medicines.value < 0) {
            bunkerStats.Medicines.value = 0
            bunkerStats.Anxiety.value += 2

            finale.prevRoundStatistics.medicinesEnough = false
        }
        else {
            finale.prevRoundStatistics.medicinesEnough = true
        }

        if (bunkerStats["Electricity System"].value === 0) {
            bunkerStats.Anxiety.value += 2
            finale.prevRoundStatistics.electricityWorks = false
        }
        else {
            finale.prevRoundStatistics.electricityWorks = true
        }

        if (bunkerStats["Vent System"].value === 0) {
            bunkerStats.Anxiety.value += 2
            finale.prevRoundStatistics.airWorks = false
        }
        else {
            finale.prevRoundStatistics.airWorks = true
        }

        if (bunkerStats["Water Cleaning System"].value === 0) {
            bunkerStats.Anxiety.value += 2
            finale.prevRoundStatistics.waterWorks = false
        }
        else {
            finale.prevRoundStatistics.waterWorks = true
        }

        CalculateDiseases(game)
    }
    else {
        console.log("Игра окончена")
    }
}

const calculateMedQualityBasedOnAge = (age: number) => {
    // MedicalQuality based on Age
    // from 0 to 0.5
    if (age < 25) return 0.5
    if (age > 65) return 0
    return -0.01 * age + 0.75
}

const calculateMedicationQuality = (game: GameType, player: PlayerType) => {

    // MedicalQuality - value between 0 and 1
    let MedicationQuality = 0
    const playerAge = Number(player.characteristics.age.value)

    if (game.bunkerStats.Medicines.value === 0) return 0
    MedicationQuality += calculateMedQualityBasedOnAge(playerAge)

    // MedicalQuality based on Med Skills
    const MedicalQualityForRelative: Record<RelativeValue, number> = {
        0: 0,
        1: 0.1,
        2: 0.25,
        3: 0.35,
        4: 0.5,
    }
    MedicationQuality += MedicalQualityForRelative[game.bunkerRelatives.Med.value]

    return MedicationQuality
}

const calculatePlayerDisease = (game: GameType, player: PlayerType) => {

    const MedicationQuality = calculateMedicationQuality(game, player)

    const health = player.characteristics.health.value

    const diseasesInfo = game.finale.prevRoundStatistics.diseasesInfo

    if (health.name === 'Абсолютно здоров') return

    if (Math.random() < health.contagious) {
        //Epidemic
        const countOfUsedMedicines = 2 * medConsumptionAverage * game.finale.survivingPlayersId.length

        game.bunkerStats.Medicines.value -= countOfUsedMedicines
        if (game.bunkerStats.Medicines.value < 0) game.bunkerStats.Medicines.value = 0

        diseasesInfo.push({ status: 'epidemic', playerId: player.id, medConsumption: countOfUsedMedicines, diseaseName: health.name })
        player.characteristics.health.value = structuredClone(healthConditions[0])
        calculatePlayerStats(player)
        calculateBunkerStats(game, false)
        calculateBunkerRelativeValues(game)
    }
    else if (Math.random() < health.lethal) {
        //Death
        diseasesInfo.push({ status: 'death', playerId: player.id })
        DeathOfPlayer(game, player.id)
    }
    else if (Math.random() < health.cureProbability) {
        //Cure
        diseasesInfo.push({ status: 'cured', playerId: player.id, diseaseName: health.name })
        player.characteristics.health.value = structuredClone(healthConditions[0])
        calculatePlayerStats(player)
        calculateBunkerStats(game, false)
        calculateBunkerRelativeValues(game)
    }
}

const CalculateDiseases = (game: GameType) => {

    game.finale.prevRoundStatistics.diseasesInfo.length = 0

    for (let i = 0; i < game.finale.survivingPlayersId.length; i++) {

        const playerId = game.finale.survivingPlayersId[i]
        const player = game.players[playerId]

        calculatePlayerDisease(game, player)
    }
}

const calculateEffectOnBunker = (game: GameType, effect: EventEffect[]) => {

    effect.map((effect) => {
        if (effect.stat === 'Death') {
            DeathOfPlayer(game, game.finale.eventTargetPlayerId)
        }
        else {
            if (effect.stat === 'Food') {
                const addValue = Math.floor(effect.value * game.finale.survivingPlayersId.length * foodConsumptionAverage)
                game.bunkerStats[effect.stat].value += addValue
                game.finale.prevRoundStatistics.responseData.consequenceDescription += `(${addValue} Продовольствия)`
            }
            else if (effect.stat === 'Medicines') {
                const addValue = Math.floor(effect.value * game.finale.survivingPlayersId.length * medConsumptionAverage)
                game.bunkerStats[effect.stat].value += addValue
                game.finale.prevRoundStatistics.responseData.consequenceDescription += `(${addValue} Медикаментов)`
            }
            else {
                game.bunkerStats[effect.stat].value += effect.value
            }

            if (effect.stat === 'Electricity System' || effect.stat === 'Vent System' || effect.stat === 'Water Cleaning System') {
                if (game.bunkerStats[effect.stat].value > 10) {
                    game.bunkerStats[effect.stat].value = 10
                }
            }

            if (game.bunkerStats[effect.stat].value < 0) {
                game.bunkerStats[effect.stat].value = 0
            }
        }

    })
}

const DeathOfPlayer = (game: GameType, playerId: number) => {
    const playersId = game.finale.survivingPlayersId
    const newsurvivingPlayersId = playersId.filter((id) => playerId !== id)
    game.players[playerId].eliminated = true
    game.finale.survivingPlayersId = newsurvivingPlayersId
    game.bunkerStats.Anxiety.value += 4
    calculateBunkerStats(game, false)
    calculateBunkerRelativeValues(game)
}

const findNextEliminatedTurn = (game: GameType) => {
    for (let i = 0; i < game.finale.eliminatedPlayersId.length - 1; i++) {
        if (game.finale.eliminatedPlayersId[i] === game.finale.eliminatedPlayerTurnId) {
            return game.finale.eliminatedPlayersId[i + 1]
        }
    }
    return game.finale.eliminatedPlayersId[0]
}

const findNextSurvivorTurn = (game: GameType) => {

    for (let i = 0; i < game.players.length; i++) {
        if (!game.players[i].eliminated && game.players[i].id === game.finale.survivingPlayerTurnId) {
            for (let j = i + 1; j < game.players.length; j++) {
                if (!game.players[j].eliminated) {
                    return game.players[j].id
                }
            }
            for (let j = 0; j < game.players.length; j++) {
                if (!game.players[j].eliminated) {
                    return game.players[j].id
                }
            }
        }
    }
    return 0
}

const calculateNextTurnIds = (game: GameType) => {
    game.finale.eliminatedPlayerTurnId = findNextEliminatedTurn(game)
    game.finale.survivingPlayerTurnId = findNextSurvivorTurn(game)

}


// Карты действий

const charExchange = (game: GameType, char: charKeys, player1: number, player2: number) => {
    const temp = game.players[player1].characteristics[char].value
    game.players[player1].characteristics[char].value = game.players[player2].characteristics[char].value
    game.players[player2].characteristics[char].value = temp
}

const charChange = (game: GameType, char: charKeys, playerId: number) => {
    const data = charKeyToData.get(char)
    if (!data) throw Error('Данные не найдены')
    game.players[playerId].characteristics[char].value = pickRandomFromArray(data)
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


// Сокеты 

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
            if (data.pickedPlayerId === null) return
            charExchange(game, actionCard.char, player.id, data.pickedPlayerId)
        }

        else if (actionCard.serverType === 'change') {
            if (data.pickedPlayerId === null) return
            charChange(game, actionCard.char, data.pickedPlayerId)
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

    socket.on("initialize_finale", ({ code }: { code: string }) => {
        const game = games.get(code)
        if (!game) return
        if (game.finale.isInitialized) return

        // Подсчет статов
        initializeFinale(game)

        calculateAllPlayersStats(game)
        calculateBunkerStats(game, true)

        calculatePlayerRelativeValues(game)
        calculateBunkerRelativeValues(game)

        io.to(code).emit("initialize_finale_response", game)
    })

    socket.on("test_game", () => {
        // Создание игры
        const game = generateCodeAndCreateRoom('player0')
        socket.join(game.code)
        for (let i = 0; i < 11; i++) {
            const player: PlayerType = generatePlayer(`player${i + 1}`, false, game.players.length)
            game.players.push(player)
        }
        game.countOfNotEliminatedPlayers = game.players.length

        for (let i = 0; i < game.players.length; i++) {
            game.players[i].eliminated = i < 6 ? false : true
        }

        for (let i = 0; i < game.players.length; i++) {
            for (const key in game.players[i].characteristics) {
                game.players[i].characteristics[key as charKeys].hidden = false
            }
        }

        // Подсчет статов
        initializeFinale(game)

        calculateAllPlayersStats(game)
        calculateBunkerStats(game, true)

        calculatePlayerRelativeValues(game)
        calculateBunkerRelativeValues(game)
        socket.emit("test_get_players", game)
    })

    socket.on("pick_event", ({ code, eventId }: { code: string, eventId: number }) => {
        const game = games.get(code)
        if (!game) return
        game.finale.pickedEventId = eventId
        game.finale.turn = 'Survivors'

        const event = Events[eventId]

        if (event.type === 'Simple') {
            game.finale.prevRoundStatistics.responseData.title = event.title
            game.finale.prevRoundStatistics.responseData.consequenceDescription = event.description
            calculateEffectOnBunker(game, event.effect)
        }
        io.to(code).emit("event_picked", { finale: game.finale, bunkerStats: game.bunkerStats })

    })

    socket.on("pick_response", ({ code, playerId, responseIndex }: { code: string, playerId: number, responseIndex: number }) => {
        const game = games.get(code)
        if (!game) return
        if (game.finale.pickedEventId === null) return
        const event = Events[game.finale.pickedEventId]

        const consequenceId = calculateConsequences(game, event.responses[responseIndex].consequences, playerId)
        const consequence = event.responses[responseIndex].consequences[consequenceId]

        game.finale.prevRoundStatistics.responseData.title = event.responses[responseIndex].title
        game.finale.prevRoundStatistics.responseData.consequenceDescription = consequence.descrition
        game.finale.prevRoundStatistics.responseData.consequenceTitle = consequence.title

        calculateEffectOnBunker(game, consequence.effect)
        startNextFinaleRound(game)

        io.to(code).emit("pick_response_response", game)
    })

    socket.on("disconnect", (reason) => {
        console.log('Disconnect')
    });

})


server.listen(3001, () => {
    console.log('listening on *:3001');
});


// Dev Functions

const calculateAverage = () => {
    const game = generateCodeAndCreateRoom('player0')
    for (let i = 0; i < 5000; i++) {
        const player: PlayerType = generatePlayer(`player${i + 1}`, false, game.players.length)
        game.players.push(player)
    }
    for (let i = 0; i < game.players.length; i++) {
        for (const key in game.players[i].characteristics) {
            game.players[i].characteristics[key as charKeys].hidden = false
        }
    }
    // Подсчет статов
    calculateAllPlayersStats(game)
    calculateBunkerStats(game, true)
    calculateAverageValues(game)
}


const calculateAverageValues = (game: GameType) => {

    const sum: PlayerStatsType = {
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
    }

    const average: PlayerStatsType = {
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
    }

    game.players.map((player) => {
        for (const key in player.playerStats) {
            sum[key as PlayerStats].value += player.playerStats[key as PlayerStats].value
        }
    })

    for (const key in sum) {
        average[key as PlayerStats].value = sum[key as PlayerStats].value / game.players.length
    }

    console.log(sum)
    console.log(average)
}
