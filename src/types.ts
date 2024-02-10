import { Bagage } from "./data/bagage"
import { BodyType } from "./data/bodyTypes"
import { BunkerStats, PlayerStats } from "./data/data"
import { HealthConditionType } from "./data/healthConditions"
import { Hobby } from "./data/hobbies"
import { InterestingFact } from "./data/interestingFacts"
import { Profession } from "./data/professions"
import { Trait } from "./data/traits"

export type GameStatus = 'waiting' | 'preparing' | 'revealing' | 'discussion' | 'voting' | 'second voting' | 'results'

export type JoinDataResponse = {
    name: string,
    playerId: number,
    game: GameType,
}

export type GameType = {
    gamestatus: GameStatus,
    code: string,
    round: number,
    countOfReadyPlayers: number,
    players: PlayerType[],
    secondVotingOptions: number[],
    roundsFlow: number[],
    countOfNotEliminatedPlayers: number,
    bunkerStats: BunkerStatsType
    bunkerRelatives: BunkerRelatives,
}

export type BunkerStat<TTitle> = {
    key: BunkerStats,
    title: TTitle,
    value: number,
}

export type BunkerStatsType = {
    "Med": BunkerStat<'Навыки медицины'>,
    "Safety": BunkerStat<'Безопасность'>,
    "Anxiety": BunkerStat<'Напряженность'>,
    "Food": BunkerStat<'Запасы еды'>,
    "Medicines": BunkerStat<'Запасы медикаментов'>,
    "Food Consumption": BunkerStat<'Потребление пищи'>,
    "Med Consumption": BunkerStat<'Потребление медикаментов'>,
    "Tech": BunkerStat<'Техническая компетентность'>,
    "Vent System": BunkerStat<'Система вентеляции'>,
    "Water Cleaning System": BunkerStat<'Система очистки воды'>,
    "Electricity System": BunkerStat<'Система электроснабжения'>,
}

export type RelativeValue = 0 | 1 | 2 | 3 | 4

export type RelativeBunkerStat<TTitle> = {
    title: TTitle
    key: BunkerStats
    value: RelativeValue
    expected: number
    real: number
}

export type BunkerRelatives = {
    "Safety": RelativeBunkerStat<"Безопасность">,
    "Med": RelativeBunkerStat<"Медицинские навыки">,
    "Tech": RelativeBunkerStat<"Технические навыки">,
}

export type RelativePlayerStat = {
    key: PlayerStats
    value: RelativeValue
}

export type PlayerRelatives = {
    "Intelligence": RelativePlayerStat,
}


export type PlayerType = {
    id: number,
    name: string,
    host: boolean,
    ready: boolean,
    votes: number,
    characteristics: PlayerCharachteristicsType,
    actionCards: ActionCardType[],
    revealedCount: number,
    eliminated: boolean,
    playerStats: PlayerStatsType,
    relatives: PlayerRelatives,
}

type Stat<TTitle> = {
    key: PlayerStats,
    title: TTitle,
    value: number,
}

export type PlayerStatsType = {
    "Phisics": Stat<'Физическая форма'>,
    "Intelligence": Stat<'Интеллект'>,
    "Tech": Stat<'Техническая компетентность'>,
    "Psycho": Stat<'Психологическая устойчивотсь'>,
    "Social": Stat<'Социальность'>,
    "Food Consumption": Stat<'Потребление пищи'>,
    "Med Consumption": Stat<'Потребление медикаментов'>,
    "Med": Stat<'Навыки медицины'>,
}

export type PlayerCharachteristicsType = {
    name: Charachteristic<'Имя', string>,
    sex: Charachteristic<'Пол', 'Мужчина' | 'Женщина'>,
    age: Charachteristic<'Возраст', string>,
    bodyType: Charachteristic<'Телосложение', BodyType>,
    profession: Charachteristic<'Профессия', Profession>,
    hobby: Charachteristic<'Хобби', Hobby>,
    health: Charachteristic<'Здоровье', HealthConditionType>,
    interestingFact: Charachteristic<'Факт', InterestingFact>,
    bagage: Charachteristic<'Багаж', Bagage>,
    trait: Charachteristic<'Черта характера', Trait>,
}

export type charKeys = keyof PlayerCharachteristicsType


export type Charachteristic<TTitle, Tvalue> = {
    key: charKeys,
    title: TTitle,
    value: Tvalue,
    hidden: boolean
}

export type ActionTypes = 'pick' | 'no pick' | 'pick except yourself'

export type ServerActionTypes = 'exchange' | 'full' | 'unique' | 'cure' | 'change'

export type ActionCardType = {
    key: string,
    type: ActionTypes,
    serverType: ServerActionTypes,
    char: charKeys,
    name: string,
    used: boolean,
}

export type responseType<TData> = {
    status: 'success' | 'error',
    data: TData,
    message: string
}

export type VotingResultsType = {
    playerId: number,
    votes: number,
}[]

export type serverResponses = 'join success' | 'create success' | 'join code error' | 'join name error'

export type useActionCardDataType = {
    pickedPlayerId: number | null
}