export interface Player {
  name: string
  scores: RoundScore[]
}

export interface RoundScore {
  score: number
  round: number
}

export interface GameState {
  players: Player[]
  currentRound: number
  isGameOver: boolean
}