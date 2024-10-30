"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useGlobalState } from "@/context/GlobalState";
import { Button } from "@/components/ui/button";
import Nav from "@/components/Nav";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function HomePage() {
  const { state } = useGlobalState();

  const shouldShowNav =
    state.players.length > 0 &&
    state.players.some((player) => player.scores.some((score) => score > 0));

  const words = "Bienvenue sur l'assistant Skyjo";

  return (
    <>
      {shouldShowNav && <Nav />}

      <motion.div className="flex flex-col items-center justify-center h-screen m-3">
        <TextGenerateEffect words={words} className="text-center p-4" />
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-4 md:mb-8 relative w-48 h-48 mx-auto"
        >
          <Image
            src="/image/skyjo-cartes.png"
            alt="Cartes Skyjo"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </motion.div>
        <Link href="/playerSetup">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-sm md:text-base"
          >
            <Play className="mr-2 w-4 h-4 md:w-5 md:h-5" />
            Commencer une partie
          </Button>
        </Link>
      </motion.div>
    </>
  );
}
