"use client";

import React, { useState } from "react";
import { ChevronLeft, RefreshCw, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Player, RoundScore } from "@/types/game";
import Welcome from "@/components/Welcome";
import PlayerSetup from "@/components/PlayerSetup";
import RoundStart from "@/components/RoundStart";
import ScoreEntry from "@/components/ScoreEntry";
import ScoreTable from "@/components/ScoreTable";
import GameOver from "@/components/GameOver";
import { useGameState } from "@/hooks/useGameState";
import { Toaster } from "@/components/ui/toaster";

export default function SkyjoApp() {
  const [step, setStep] = useState<number>(1);
  const {
    players,
    setPlayers,
    currentRound,
    setCurrentRound,
    resetGame,
    isGameOver,
    setIsGameOver,
  } = useGameState();

  const handlePlayerSetup = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
    setStep(3);
  };

  const handleScoreSubmit = (newScores: RoundScore[]) => {
    const updatedPlayers = players.map((player, index) => ({
      ...player,
      scores: [...(player.scores || []), newScores[index]],
    }));

    const gameOver = updatedPlayers.some(
      (player) =>
        player.scores.reduce((sum, score) => sum + score.score, 0) >= 100
    );

    setPlayers(updatedPlayers);

    if (gameOver) {
      setIsGameOver(true);
      setStep(5);
    } else {
      setCurrentRound((prev) => prev + 1);
      setStep(3);
    }
  };

  const handleRestart = () => {
    resetGame();
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      <div className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-4">
          {step > 1 && step < 5 && (
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              className="p-2"
            >
              <ChevronLeft className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Retour</span>
            </Button>
          )}
          {players.length > 0 && !isGameOver && (
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="p-2">
                    <Table className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Voir les scores</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-full md:max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Tableau des scores</DialogTitle>
                    <DialogDescription>
                      Récapitulatif des scores par manche
                    </DialogDescription>
                  </DialogHeader>
                  <ScoreTable players={players} />
                </DialogContent>
              </Dialog>
              <Button variant="destructive" onClick={resetGame} className="p-2">
                <RefreshCw className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Nouvelle partie</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex-grow flex flex-col ${
          step === 1 ? "justify-center" : "justify-start md:justify-center"
        } items-center p-4 md:p-8 ${step !== 1 ? "pt-8 md:pt-4" : ""}`}
      >
        <div className="w-full max-w-md">
          {step === 1 && <Welcome onStart={() => setStep(2)} />}
          {step === 2 && <PlayerSetup onSubmit={handlePlayerSetup} />}
          {step === 3 && (
            <RoundStart round={currentRound} onContinue={() => setStep(4)} />
          )}
          {step === 4 && (
            <ScoreEntry
              players={players}
              round={currentRound}
              onSubmit={handleScoreSubmit}
            />
          )}
          {step === 5 && (
            <GameOver players={players} onRestart={handleRestart} />
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
