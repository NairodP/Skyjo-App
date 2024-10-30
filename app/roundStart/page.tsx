"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

import { useGlobalState } from "@/context/GlobalState";

import ScoreEntry from "@/components/ScoreEntry";
import { Button } from "@/components/ui/button";
import Nav from "@/components/Nav";

export default function RoundStart() {
  const router = useRouter();
  const { dispatch, state } = useGlobalState();
  const [showScoreEntry, setShowScoreEntry] = useState(false);

  if (!state.players.length) {
    router.push("/playerSetup");
    return null;
  }

  const handleContinue = () => {
    setShowScoreEntry(true);
  };

  const handleScoreSubmitted = () => {
    // Vérifier si un joueur a atteint ou dépassé 100 points
    const isGameOver = state.players.some(
      (player) =>
        player.scores.reduce((total, score) => total + score, 0) >= 100
    );

    if (isGameOver) {
      dispatch({ type: "SET_IS_GAME_OVER", payload: true });
      router.push("/gameOver");
    } else {
      setShowScoreEntry(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      {state.players.length > 0 && <Nav />}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-6"
      >
        {!showScoreEntry ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center px-4 md:px-0"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
              Manche {state.currentRound}
            </h2>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2 }}
              className="mb-4"
            >
              <Trophy size={48} className="mx-auto text-blue-600" />
            </motion.div>
            <Button
              onClick={handleContinue}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base py-2 px-4 rounded-lg shadow-md"
            >
              Entrer les scores
            </Button>
          </motion.div>
        ) : (
          <ScoreEntry onScoreSubmitted={handleScoreSubmitted} />
        )}
      </motion.div>
    </div>
  );
}
