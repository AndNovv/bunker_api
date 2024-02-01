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
}

export type PlayerCharachteristicsType = {
    name: Charachteristic<'Имя', string>,
    sex: Charachteristic<'Пол', 'Мужчина' | 'Женщина'>,
    age: Charachteristic<'Возраст', string>,
    profession: Charachteristic<'Профессия', string>,
    hobby: Charachteristic<'Хобби', string>,
    phobia: Charachteristic<'Фобия', string>,
    health: Charachteristic<'Здоровье', string>,
    interestingFact: Charachteristic<'Факт', string>,
}

export type charKeys = keyof PlayerCharachteristicsType

export type Charachteristic<TTitle, Tvalue> = {
    key: charKeys,
    title: TTitle,
    value: Tvalue,
    hidden: boolean
}

export type ActionTypes = 'pick' | 'no pick' | 'pick except yourself'

export type ServerActionTypes = 'exchange' | 'full' | 'unique' | 'cure'

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