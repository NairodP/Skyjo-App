"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Table } from "lucide-react";
import ScoreTable from "./ScoreTable";
import { useGameStore } from "@/store/gameStore";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

export default function Nav() {
  const { players, setPlayers, setCurrentRound, setIsGameOver, resetGame } = useGameStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isScoreDialogOpen, setIsScoreDialogOpen] = useState(false);
  const [keepPlayers, setKeepPlayers] = useState(false);
  const router = useRouter();

  const handleResetGame = () => {
    if (!keepPlayers) {
      resetGame();
      router.push("/playerSetup");
    } else {
      setCurrentRound(1);
      setIsGameOver(false);
      const updatedPlayers = players.map((player) => ({
        ...player,
        scores: [],
      }));
      setPlayers(updatedPlayers);
    }
    setIsDialogOpen(false);
  };

  return (
    <nav className="flex justify-end space-x-4 p-4">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="destructive"
          className="p-2 text-white"
          style={{
            backgroundImage: "linear-gradient(to right, #7a47ff, #408cff)",
          }}
          onClick={() => setIsScoreDialogOpen(true)}
        >
          <Table className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Voir les scores</span>
        </Button>
      </motion.div>
      <Dialog open={isScoreDialogOpen} onOpenChange={setIsScoreDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scores</DialogTitle>
          </DialogHeader>
          <ScoreTable players={players} />
        </DialogContent>
      </Dialog>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="p-2 text-white"
              style={{
                backgroundImage: "linear-gradient(to right, #e14df7, #7931c0)",
              }}
            >
              <RefreshCw className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Nouvelle partie</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] max-w-[450px] rounded-lg border-sm">
            <DialogHeader>
              <DialogTitle className="text-[#1a326e] mt-2 text-2xl">Confirmation</DialogTitle>
              <DialogDescription className="mt-2 text-lg">
                Êtes-vous sûr de vouloir réinitialiser la partie ? Les Scores
                seront perdus.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="keepPlayers"
                checked={keepPlayers}
                onChange={(e) => setKeepPlayers(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="keepPlayers">Garder les mêmes joueurs</label>
            </div>
            <DialogFooter>
              <Button
                className="mt-2 text-lg"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button
                className="mt-2 text-lg"
                variant="destructive"
                style={{ backgroundColor: "#fbb6ff" }}
                onClick={handleResetGame}
              >
                Oui, réinitialiser
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </nav>
  );
}