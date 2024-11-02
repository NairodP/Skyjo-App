"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowRight } from "lucide-react";
import { useGlobalState } from "@/context/GlobalState";
import ScoreEntry from "@/components/ScoreEntry";
import { Button } from "@/components/ui/button";
import Nav from "@/components/Nav";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import useBeforeUnloadWarning from "@/hooks/useReloadWarning";

export default function RoundStart() {
  const router = useRouter();
  const { dispatch, state } = useGlobalState();
  const [showScoreEntry, setShowScoreEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const shouldWarn = state.players.length > 0 || state.currentRound > 1;
  useBeforeUnloadWarning(shouldWarn);

  useEffect(() => {
    if (!state.players.length) {
      router.push("/playerSetup");
    } else {
      setIsLoading(false);
    }
  }, [state.players, router]);

  if (isLoading) {
    return null;
  }

  const handleContinue = () => {
    setShowScoreEntry(true);
  };

  const handleScoreSubmitted = () => {
    const isGameOver = state.players.some(
      (player) =>
        player.scores.reduce((total, score) => total + score, 0) >= 100
    );

    if (isGameOver) {
      dispatch({ type: "SET_IS_GAME_OVER", payload: true });
      router.push("/gameOver");
    } else {
      dispatch({ type: "SET_CURRENT_ROUND", payload: state.currentRound + 1 });
      setShowScoreEntry(false);
    }
  };

  return (
    <div className="min-h-screen flex p-4">
      <div className="flex-grow flex  flex-col items-center justify-center">
        {state.players.length > 0 && <Nav />}
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <AnimatePresence mode="wait">
              {!showScoreEntry ? (
                <motion.div
                  key="round-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-[#421e69]">
                      Manche {state.currentRound}
                    </CardTitle>
                    <CardDescription>
                      Préparez-vous pour la prochaine manche !
                    </CardDescription>
                  </CardHeader>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1.05, 1] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.3, 0.6, 1],
                    }}
                    className="mb-6"
                  >
                    <Trophy size={64} className="mx-auto text-yellow-500" />
                  </motion.div>
                  <Button
                    onClick={handleContinue}
                    className="bg-gradient-to-r from-custom-purple to-custom-blue text-white text-lg py-2 px-6 rounded-full shadow-md"
                  >
                    Entrer les scores
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="score-entry"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScoreEntry onScoreSubmitted={handleScoreSubmitted} />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
