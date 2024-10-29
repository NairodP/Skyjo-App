import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Player, RoundScore } from "@/types/game";

interface ScoreEntryProps {
  players: Player[];
  round: number;
  onSubmit: (scores: RoundScore[]) => void;
}

export default function ScoreEntry({
  players,
  round,
  onSubmit,
}: ScoreEntryProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newScores = players.map((_, index) => ({
      score: parseInt(formData.get(`score-${index}`) as string),
      round,
    }));
    onSubmit(newScores);
  };

  return (
    <Card className="p-3 md:p-6">
      <h2 className="text-xl md:text-2xl mb-3 md:mb-4">
        Scores de la manche {round}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        {players.map((player, index) => (
          <div key={index}>
            <Label className="text-sm md:text-base">{player.name}</Label>
            <Select name={`score-${index}`} defaultValue="0">
              <SelectTrigger className="text-sm md:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...Array(201)].map((_, i) => (
                  <SelectItem
                    key={i}
                    value={(i - 100).toString()}
                    className="text-sm md:text-base"
                  >
                    {i - 100}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
        <Button type="submit" className="w-full text-sm md:text-base">
          Valider la manche
        </Button>
      </form>
    </Card>
  );
}
