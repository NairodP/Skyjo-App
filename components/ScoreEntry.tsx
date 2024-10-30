"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
    <Card className="p-3 md:p-6">
      <h2 className="text-xl md:text-2xl mb-3 md:mb-4">
        Scores de la manche {state.currentRound}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        {state.players.map((player, index) => (
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

      <Dialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mt-2 text-2xl" >Confirmer les scores</DialogTitle>
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
    </Card>
  );
}