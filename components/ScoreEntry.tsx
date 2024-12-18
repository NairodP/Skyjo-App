"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RoundScore, Player } from "@/types/game";
import { useGameStore } from "@/store/gameStore";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface ScoreEntryProps {
  onScoreSubmitted: () => void;
}

export default function ScoreEntry({ onScoreSubmitted }: ScoreEntryProps) {
  const router = useRouter();
  const { players, currentRound, setPlayers, addRoundScore, setCurrentRound, setIsGameOver } = useGameStore();
  const { toast } = useToast();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [submittedScores, setSubmittedScores] = useState<RoundScore | null>(null);
  const [playerScores, setPlayerScores] = useState<string[]>(players.map(() => "0"));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Créer les nouveaux scores
    const newRoundScores: RoundScore = {
      round: currentRound,
      scores: playerScores.map(score => parseInt(score)),
    };

    // Stocker les scores soumis
    setSubmittedScores(newRoundScores);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirm = () => {
    if (!submittedScores) return;

    // Mettre à jour les scores des joueurs
    const updatedPlayers: Player[] = players.map((player, index) => ({
      ...player,
      scores: [...player.scores, submittedScores.scores[index]],
    }));

    // Mettre à jour le state
    setPlayers(updatedPlayers);
    addRoundScore(submittedScores);

    // Vérifier si c'est la fin de la partie
    const isGameOver = updatedPlayers.some(
      (player) =>
        player.scores.reduce((total, score) => total + score, 0) >= 100
    );

    if (isGameOver) {
      setIsGameOver(true);
      router.push("/gameOver");
    } else {
      // Passer à la manche suivante
      setCurrentRound(currentRound + 1);

      toast({
        title: "Scores enregistrés",
        description: "Les scores ont été enregistrés avec succès",
        duration: 3000,
      });

      // Appeler la fonction de callback
      onScoreSubmitted();
    }

    setIsConfirmDialogOpen(false);
  };

  const handleScoreChange = (index: number, value: string) => {
    const newScores = [...playerScores];
    newScores[index] = parseInt(value).toString(); // Updated to ensure string value
    setPlayerScores(newScores);
  };

  return (
    <>
      <Card className="w-full max-w-md border-none shadow-none p-0 m-0">
        <CardHeader className="w-full max-w-md border-none shadow-none p-0 m-0">
          <CardTitle className="text-2xl font-bold text-center text-[#1a326e]">
            Scores de la manche {currentRound}
          </CardTitle>
          <CardDescription className="text-center">
            Entrez les scores pour chaque joueur
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full max-w-md border-none shadow-none p-0 m-0">
          <form onSubmit={handleSubmit} noValidate className="space-y-6 mt-6">
            <AnimatePresence>
              {players.map((player, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor={`score-${index}`}
                    className="text-sm font-medium"
                  >
                    {player.name}
                  </Label>
                  <Select
                    value={playerScores[index]}
                    onValueChange={(value) => handleScoreChange(index, value)}
                  >
                    <SelectTrigger id={`score-${index}`} className="w-full">
                      <SelectValue>
                        {playerScores[index]}
                      </SelectValue>
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
                </motion.div>
              ))}
            </AnimatePresence>

            <CardFooter className="px-0 pt-6">
              <Button
                type="submit"
                className="w-full text-sm md:text-base transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Valider la manche
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="w-[90%] rounded-lg border-sm max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-[#1a326e] mt-2 text-2xl">
              Confirmer les scores
            </DialogTitle>
            <DialogDescription className="mt-2 text-lg">
              Veuillez confirmer les scores suivants :
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {submittedScores &&
              players.map((player, index) => (
                <div key={index} className="flex justify-between">
                  <span>{player.name}</span>
                  <span>{submittedScores.scores[index]}</span>
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button
              className="mt-2 text-lg"
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button
              className="mt-2 text-lg"
              variant="destructive"
              style={{ backgroundColor: "#9694ff" }}
              onClick={handleConfirm}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}