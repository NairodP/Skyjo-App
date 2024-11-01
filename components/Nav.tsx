"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Table } from "lucide-react";
import ScoreTable from "./ScoreTable";
import { useGlobalState } from "@/context/GlobalState";
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
  const { state, dispatch } = useGlobalState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isScoreDialogOpen, setIsScoreDialogOpen] = useState(false);
  const [keepPlayers, setKeepPlayers] = useState(false);
  const router = useRouter();

  const resetGame = () => {
    if (!keepPlayers) {
      dispatch({ type: "RESET_GAME" });
      router.push("/playerSetup");
    } else {
      dispatch({ type: "SET_CURRENT_ROUND", payload: 1 });
      dispatch({ type: "SET_IS_GAME_OVER", payload: false });
      const updatedPlayers = state.players.map((player) => ({
        ...player,
        scores: [],
      }));
      dispatch({ type: "SET_PLAYERS", payload: updatedPlayers });
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
          <ScoreTable players={state.players} />
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl">Confirmation</DialogTitle>
              <DialogDescription className="text-lg">
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
                onClick={resetGame}
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
