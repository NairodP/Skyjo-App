import { useState, useEffect } from 'react'
import { Player, GameState } from '@/types/game'

export const useGameState = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [currentRound, setCurrentRound] = useState<number>(1)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  useEffect(() => {
    const storedData = localStorage.getItem('skyjoGame')
    if (storedData) {
      const { players, currentRound, isGameOver } = JSON.parse(storedData) as GameState
      setPlayers(players)
      setCurrentRound(currentRound)
      setIsGameOver(isGameOver)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('skyjoGame', JSON.stringify({
      players,
      currentRound,
      isGameOver
    }))
  }, [players, currentRound, isGameOver])

  const resetGame = () => {
    setPlayers([])
    setCurrentRound(1)
    setIsGameOver(false)
    localStorage.removeItem('skyjoGame')
  }

  return { 
    players, 
    setPlayers, 
    currentRound, 
    setCurrentRound, 
    isGameOver, 
    setIsGameOver, 
    resetGame 
  }
}