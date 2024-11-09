export type Player = {
  name: string;
  scores: number[];
}

export type RoundScore = {
  round: number;
  scores: number[];  // Ajout de la propriété scores
}

export type GameState = {
  players: Player[];
  currentRound: number;
  isGameOver: boolean;
  roundScores: RoundScore[];
}

export const initialState: GameState = {
  players: [],
  currentRound: 1,
  isGameOver: false,
  roundScores: [],
}