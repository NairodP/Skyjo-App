"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScoreTable from "@/components/ScoreTable";
import { useGlobalState } from "@/context/GlobalState";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import useBeforeUnloadWarning from "@/hooks/useReloadWarning";
import { Vortex } from "@/components/ui/vortex";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Home } from "lucide-react";
import Confetti from "react-confetti";

export default function GameOver() {
  const { state, dispatch } = useGlobalState();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [keepPlayers, setKeepPlayers] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  const shouldWarn = state.players.length > 0 || state.currentRound > 1;
  useBeforeUnloadWarning(shouldWarn);

  useEffect(() => {
    if (!state.players.length) {
      router.push("/playerSetup");
    }
  }, [state.players, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Conditionnel: si les joueurs existent, calculer gagnant et perdant
  const sortedPlayers = state.players.length
    ? [...state.players].sort((a, b) => {
        const totalA = a.scores.reduce((sum, score) => sum + score, 0);
        const totalB = b.scores.reduce((sum, score) => sum + score, 0);
        return totalA - totalB;
      })
    : [];

  const winner = sortedPlayers[0];
  const loser = sortedPlayers[sortedPlayers.length - 1];

  const resetGame = () => {
    if (!keepPlayers) {
      dispatch({ type: "RESET_GAME" });
      setTimeout(() => {
        router.push("/playerSetup");
      }, 0);
    } else {
      dispatch({ type: "SET_CURRENT_ROUND", payload: 1 });
      dispatch({ type: "SET_IS_GAME_OVER", payload: false });
      const updatedPlayers = state.players.map((player) => ({
        ...player,
        scores: [],
      }));
      dispatch({ type: "SET_PLAYERS", payload: updatedPlayers });
      setTimeout(() => {
        router.push("/roundStart");
      }, 0);
    }
    setIsDialogOpen(false);
  };

  const handleReturnHome = () => {
    dispatch({ type: "RESET_GAME" });
  };

  useEffect(() => {
    // Vérifie si l'état a été réinitialisé, puis redirige
    if (
      state.players.length === 0 ||
      state.players.every((player) =>
        player.scores.every((score) => score === 0)
      )
    ) {
      router.push("/");
    }
  }, [state.players, router]);

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.7,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4 relative">
      {showConfetti && <Confetti />}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="space-y-4">
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 relative mx-auto rounded-md rounded-b-none w-full h-[5rem] overflow-hidden shadow-xl"
          >
            <Vortex
              backgroundColor="black"
              className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
            >
              <Image
                src="/image/skyjo-logo-title.png"
                alt="Skyjo Logo"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Vortex>
          </motion.div>
          <h2 className="font-zillaSlab uppercase text-2xl md:text-3xl text-center mb-4">
            Fin de la partie
          </h2>

          {/* Afficher seulement si winner et loser existent */}
          {winner && loser ? (
            <div className="text-center mb-4 p-4 md:p-6">
              <p className="text-lg md:text-xl">
                <span className="font-semibold">{winner.name}</span> a gagné
                avec {winner.scores.reduce((sum, score) => sum + score, 0)}{" "}
                points !
              </p>
              <p className="text-sm md:text-base text-gray-600">
                <span className="font-semibold">{loser.name}</span> a perdu avec{" "}
                {loser.scores.reduce((sum, score) => sum + score, 0)} points.
              </p>
            </div>
          ) : (
            <p className="text-center text-lg md:text-xl p-4 md:p-6">
              Préparez-vous pour une nouvelle partie !
            </p>
          )}

          <ScoreTable players={state.players} />
          <CardFooter className="p-6 pb-12 flex flex-col text-center">
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="w-full mt-4"
            >
              Nouvelle partie
            </Button>
            <Separator className="my-4" />
            <Button
              onClick={handleReturnHome}
              variant="outline"
              className="w-full"
            >
              <Home className="mr-2" size={20} />
              Accueil
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[90%] rounded-lg border-sm">
          <DialogHeader>
            <DialogTitle className="text-[#1a326e] mt-2 text-2xl">Nouvelle partie</DialogTitle>
            <DialogDescription className="mt-2 text-lg">
              Voulez-vous garder les mêmes joueurs pour la nouvelle partie ?
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
              onClick={resetGame}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
