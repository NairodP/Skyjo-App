"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
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
import { useGlobalState } from "@/context/GlobalState";
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
  const { state, dispatch } = useGlobalState();
  const { toast } = useToast();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [submittedScores, setSubmittedScores] = useState<RoundScore | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Créer les nouveaux scores
    const newRoundScores: RoundScore = {
      round: state.currentRound,
      scores: state.players.map((_, index) =>
        parseInt(formData.get(`score-${index}`) as string)
      ),
    };

    // Stocker les scores soumis
    setSubmittedScores(newRoundScores);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirm = () => {
    if (!submittedScores) return;

    // Mettre à jour les scores des joueurs
    const updatedPlayers: Player[] = state.players.map((player, index) => ({
      ...player,
      scores: [...player.scores, submittedScores.scores[index]],
    }));

    // Mettre à jour le state
    dispatch({ type: "SET_PLAYERS", payload: updatedPlayers });
    dispatch({ type: "ADD_ROUND_SCORE", payload: submittedScores });

    // Vérifier si c'est la fin de la partie
    const isGameOver = updatedPlayers.some(player =>
      player.scores.reduce((total, score) => total + score, 0) >= 100
    );

    if (isGameOver) {
      dispatch({ type: "SET_IS_GAME_OVER", payload: true });
      router.push("/gameOver");
    } else {
      // Passer à la manche suivante
      dispatch({
        type: "SET_CURRENT_ROUND",
        payload: state.currentRound + 1,
      });

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

  return (
    <div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600">Scores de la manche {state.currentRound}</CardTitle>
          <CardDescription className="text-center">Entrez les scores pour chaque joueur</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <AnimatePresence>
              {state.players.map((player, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor={`score-${index}`} className="text-sm font-medium">
                    {player.name}
                  </Label>
                  <Select name={`score-${index}`} defaultValue="0">
                    <SelectTrigger id={`score-${index}`} className="w-full">
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
                </motion.div>
              ))}
            </AnimatePresence>

            <CardFooter className="px-0 pt-6">
              <Button type="submit" className="w-full text-sm md:text-base transition-all duration-200 ease-in-out transform hover:scale-105">
                Valider la manche
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <Dialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mt-2 text-2xl">Confirmer les scores</DialogTitle>
            <DialogDescription className="mt-2 text-lg">
              Veuillez confirmer les scores suivants :
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {submittedScores &&
              state.players.map((player, index) => (
                <div key={index} className="flex justify-between">
                  <span>{player.name}</span>
                  <span>{submittedScores.scores[index]}</span>
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button className="mt-2 text-lg" variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="mt-2 text-lg" variant="destructive" onClick={handleConfirm}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}