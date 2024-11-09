// import { create } from "zustand";
// import { Player, RoundScore } from "@/types/game";

// // Définir les types pour l'état
// interface GameState {
//   players: Player[];
//   currentRound: number;
//   isGameOver: boolean;
//   roundScores: RoundScore[];
//   setPlayers: (players: Player[]) => void;
//   setCurrentRound: (round: number) => void;
//   setIsGameOver: (isOver: boolean) => void;
//   addRoundScore: (score: RoundScore) => void;
//   resetGame: () => void;
// }

// // Définir l'état initial
// const initialState = {
//   players: [],
//   currentRound: 1,
//   isGameOver: false,
//   roundScores: [],
// };

// // Créer le store
// export const useGameStore = create<GameState>((set) => ({
//   ...initialState,

//   setPlayers: (players) => set({ players }),

//   setCurrentRound: (round) => set({ currentRound: round }),

//   setIsGameOver: (isOver) => set({ isGameOver: isOver }),

//   addRoundScore: (score) =>
//     set((state) => ({
//       roundScores: [...state.roundScores, score],
//     })),

//   resetGame: () => set(initialState),
// }));

import { create } from 'zustand'
import { Player, RoundScore } from "@/types/game"

// Définir les types pour l'état
interface GameState {
  players: Player[]
  currentRound: number
  isGameOver: boolean
  roundScores: RoundScore[]
  setPlayers: (players: Player[]) => void
  setCurrentRound: (round: number) => void
  setIsGameOver: (isOver: boolean) => void
  addRoundScore: (score: RoundScore) => void
  resetGame: () => void
}

// Définir l'état initial
const initialState = {
  players: [],
  currentRound: 1,
  isGameOver: false,
  roundScores: [],
}

// Créer le store
export const useGameStore = create<GameState>((set) => ({
  ...initialState,

  setPlayers: (players) => set({ players }),

  setCurrentRound: (round) => set({ currentRound: round }),

  setIsGameOver: (isOver) => set({ isGameOver: isOver }),

  addRoundScore: (score) => set((state) => ({
    roundScores: [...state.roundScores, score]
  })),

  resetGame: () => set(initialState),
}))