import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Player } from "@/types/game";
import ScoreTable from "./ScoreTable";

interface GameOverProps {
  players: Player[];
  onRestart: () => void;
}

export default function GameOver({ players, onRestart }: GameOverProps) {
  const sortedPlayers = [...players].sort((a, b) => {
    const totalA = a.scores.reduce((sum, score) => sum + score.score, 0);
    const totalB = b.scores.reduce((sum, score) => sum + score.score, 0);
    return totalA - totalB;
  });

  const winner = sortedPlayers[0];
  const loser = sortedPlayers[sortedPlayers.length - 1];

  return (
    <Card className="p-4 md:p-6 space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Fin de la partie
      </h2>
      <div className="text-center mb-4">
        <p className="text-lg md:text-xl">
          <span className="font-semibold">{winner.name}</span> a gagné avec{" "}
          {winner.scores.reduce((sum, score) => sum + score.score, 0)} points !
        </p>
        <p className="text-sm md:text-base text-gray-600">
          <span className="font-semibold">{loser.name}</span> a perdu avec{" "}
          {loser.scores.reduce((sum, score) => sum + score.score, 0)} points.
        </p>
      </div>
      <ScoreTable players={players} />
      <Button onClick={onRestart} className="w-full mt-4">
        Nouvelle partie
      </Button>
    </Card>
  );
}
