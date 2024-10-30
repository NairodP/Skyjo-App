export interface Player {
  name: string;
  scores: number[];
}

export interface RoundScore {
  round: number;
  scores: number[];  // Ajout de la propriété scores
}

export interface GameState {
  players: Player[];
  currentRound: number;
  isGameOver: boolean;
  roundScores: RoundScore[];
}