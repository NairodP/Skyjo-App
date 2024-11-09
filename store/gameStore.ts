import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Player, RoundScore, initialState } from "@/types/game"

type GameState = {
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

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,

      setPlayers: (newPlayers) => set((state) => {
        if (JSON.stringify(state.players) !== JSON.stringify(newPlayers)) {
          return { players: newPlayers };
        }
        return state;
      }),

      setCurrentRound: (round) => set({ currentRound: round }),

      setIsGameOver: (isOver) => set({ isGameOver: isOver }),

      addRoundScore: (score) => set((state) => ({
        roundScores: [...state.roundScores, score]
      })),

      resetGame: () => set(initialState),
    }),
    {
      name: 'game-storage', // nom unique pour ce stockage
      storage: createJSONStorage(() => localStorage), // utilise localStorage par défaut
    }
  )
)