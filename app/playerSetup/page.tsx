"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
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
import { useGlobalState } from "@/context/GlobalState";

export default function PlayerSetup() {
  const router = useRouter();
  const { dispatch } = useGlobalState();
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

    // Vérification des noms vides
    if (players.some((player) => player.name.trim() === "")) {
      toast({
        description:
          "Veuillez saisir le pseudo de l'ensemble des participants.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    // Vérification de l'unicité des noms
    const uniqueNames = new Set(players.map((player) => player.name.trim()));
    if (uniqueNames.size !== players.length) {
      toast({
        description: "Deux joueurs ne peuvent pas avoir le même pseudo.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    // Mise à jour du state global
    dispatch({ type: "SET_PLAYERS", payload: players });
    dispatch({ type: "SET_CURRENT_ROUND", payload: 1 });
    dispatch({ type: "SET_IS_GAME_OVER", payload: false });

    // Affichage de la validation avant la redirection
    setShowValidation(true);
    setTimeout(() => {
      setShowValidation(false);
      router.push("/roundStart"); // Redirection vers roundStart
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <form onSubmit={handleFormSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <Label>Nombre de joueurs</Label>
              <Select
                value={playerCount.toString()}
                onValueChange={handlePlayerCountChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez le nombre de joueurs" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(7)].map((_, i) => (
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
                  onChange={(e) =>
                    handlePlayerNameChange(index, e.target.value)
                  }
                  placeholder={`Nom du joueur ${index + 1}`}
                  required
                  className="w-full"
                />
              </div>
            ))}

            <Button type="submit" className="w-full text-sm md:text-base">
              {showValidation ? (
                <Check className="text-green-500" />
              ) : (
                "Valider"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
