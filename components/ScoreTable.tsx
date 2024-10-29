import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Player, RoundScore } from "@/types/game";

interface ScoreTableProps {
  players: Player[];
}

export default function ScoreTable({ players }: ScoreTableProps) {
  const maxRounds = Math.max(...players.map((p) => p.scores?.length || 0));

  const calculateTotalScore = (scores: RoundScore[]): number => {
    return scores ? scores.reduce((total, round) => total + round.score, 0) : 0;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Joueur</TableHead>
            {[...Array(maxRounds)].map((_, i) => (
              <TableHead key={i} className="w-[80px]">
                Manche {i + 1}
              </TableHead>
            ))}
            <TableHead className="w-[80px]">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{player.name}</TableCell>
              {player.scores?.map((score, j) => (
                <TableCell key={j}>{score.score}</TableCell>
              ))}
              {[...Array(maxRounds - (player.scores?.length || 0))].map(
                (_, j) => (
                  <TableCell key={`empty-${j}`}>-</TableCell>
                )
              )}
              <TableCell className="font-bold">
                {calculateTotalScore(player.scores)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
