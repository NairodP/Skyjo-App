"use client";

import React, { useState, useEffect } from "react";
import { Check, Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { useGameStore } from "@/store/gameStore";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";

export default function PlayerSetup() {
  const router = useRouter();
  const { players, setPlayers, setCurrentRound, setIsGameOver } =
    useGameStore();
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [localPlayers, setLocalPlayers] = useState<Player[]>([
    { name: "", scores: [] },
    { name: "", scores: [] },
  ]);
  const [showValidation, setShowValidation] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (players.length > 0) {
      router.push("/roundStart");
    }
  }, [players, router]);

  const handlePlayerCountChange = (value: string): void => {
    const count = parseInt(value);
    setPlayerCount(count);
    setLocalPlayers((prev) => {
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
    const newPlayers = [...localPlayers];
    newPlayers[index] = { ...newPlayers[index], name };
    setLocalPlayers(newPlayers);
  };

  const resetZoom = () => {
    document.body.style.zoom = "100%";
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (localPlayers.some((player) => player.name.trim() === "")) {
      toast({
        description:
          "Veuillez saisir le pseudo de l'ensemble des participants.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (
      localPlayers.some(
        (player) =>
          player.name
            .trim()
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes("fab") &&
          player.name.trim().replace(/\s+/g, "").toLowerCase().includes("grand")
      )
    ) {
      toast({
        description:
          "Pseudo trop prétentieux. Votre pseudo ne peut pas contenir les mots 'fab' et 'grand' en même temps.",
        variant: "destructive",
        duration: 6000,
      });
      return;
    }
    if (
      localPlayers.some((player) =>
        player.name
          .trim()
          .replace(/\s+/g, "")
          .toLowerCase()
          .includes("magnifico")
      )
    ) {
      toast({
        description:
          "Pseudo trop prétentieux. Celui-ci ne peut contenir 'Magnifico'. Merci de le modifier.",
        variant: "destructive",
        duration: 6000,
      });
      return;
    }

    const uniqueNames = new Set(
      localPlayers.map((player) => player.name.trim())
    );
    if (uniqueNames.size !== localPlayers.length) {
      toast({
        description: "Deux joueurs ne peuvent pas avoir le même pseudo.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    setPlayers(localPlayers);
    setCurrentRound(1);
    setIsGameOver(false);

    setShowValidation(true);
    setTimeout(() => {
      setShowValidation(false);
      resetZoom();
      router.push("/roundStart");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BackButton />
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600">
            Configuration des joueurs
          </CardTitle>
          <CardDescription className="text-center">
            Entrez les noms des joueurs pour commencer la partie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="playerCount" className="text-sm font-medium">
                Nombre de joueurs
              </Label>
              <Select
                value={playerCount.toString()}
                onValueChange={handlePlayerCountChange}
              >
                <SelectTrigger id="playerCount" className="w-full">
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

            <AnimatePresence>
              {localPlayers.map((player, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor={`player-${index}`}
                    className="text-sm font-medium"
                  >
                    Joueur {index + 1}
                  </Label>
                  <Input
                    id={`player-${index}`}
                    value={player.name}
                    onChange={(e) =>
                      handlePlayerNameChange(index, e.target.value)
                    }
                    placeholder={`Nom du joueur ${index + 1}`}
                    required
                    className="w-full"
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            <CardFooter className="px-0 pt-6">
              <Button
                type="submit"
                className="w-full text-sm md:text-base transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                {showValidation ? (
                  <Check className="mr-2 h-4 w-4" />
                ) : (
                  <Users className="mr-2 h-4 w-4" />
                )}
                {showValidation ? "Validé !" : "Commencer la partie"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
