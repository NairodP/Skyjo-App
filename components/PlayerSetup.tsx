import React, { useState } from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Player } from "@/types/game";
import { useToast } from "@/hooks/use-toast";

interface PlayerSetupProps {
  onSubmit: (players: Player[]) => void;
}

export default function PlayerSetup({ onSubmit }: PlayerSetupProps) {
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [players, setPlayers] = useState<Player[]>([
    { name: "", scores: [] },
    { name: "", scores: [] },
  ]);
  const [showValidation, setShowValidation] = useState<boolean>(false);
  const { toast } = useToast();

  const handlePlayerCountChange = (value: string): void => {
    const count = parseInt(value);
    setPlayerCount(count);
    setPlayers((prev) => {
      const newPlayers = [...prev];
      while (newPlayers.length < count) {
        newPlayers.push({ name: "", scores: [] });
      }
      while (newPlayers.length > count) {
        newPlayers.pop();
      }
      return newPlayers;
    });
  };

  const handlePlayerNameChange = (index: number, name: string): void => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], name };
    setPlayers(newPlayers);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (players.some((player) => player.name === "")) {
      toast({
        title: "Erreur",
        description: "Vous n'avez pas saisi le nom de tous les participants",
        variant: "destructive",
      });
      return;
    }

    const uniqueNames = new Set(players.map((p) => p.name));
    if (uniqueNames.size !== players.length) {
      toast({
        title: "Erreur",
        description: "2 joueurs ne peuvent pas avoir le même pseudo",
        variant: "destructive",
      });
      return;
    }

    setShowValidation(true);
    setTimeout(() => {
      setShowValidation(false);
      onSubmit(players);
    }, 1500);
  };

  return (
    <Card className="p-3 md:p-6">
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-3 md:space-y-4">
          <div>
            <Label>Nombre de joueurs</Label>
            <Select
              value={playerCount.toString()}
              onValueChange={handlePlayerCountChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...Array(9)].map((_, i) => (
                  <SelectItem key={i + 2} value={(i + 2).toString()}>
                    {i + 2} joueurs
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {players.map((player, index) => (
            <div key={index}>
              <Label>Joueur n°{index + 1}</Label>
              <Input
                value={player.name}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                placeholder={`Nom du joueur ${index + 1}`}
                required
              />
            </div>
          ))}

          <Button type="submit" className="w-full text-sm md:text-base">
            {showValidation ? <Check className="text-green-500" /> : "Valider"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
