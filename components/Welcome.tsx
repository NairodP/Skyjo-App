import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center px-4 md:px-0"
    >
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-blue-900">
        Bienvenue sur l&apos;assistant Skyjo
      </h1>
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-4 md:mb-8 relative w-48 h-48 mx-auto"
      >
        <Image
          src="/image/skyjo-cartes.png"
          alt="Cartes Skyjo"
          layout="fill"
          objectFit="contain"
        />
      </motion.div>
      <Button
        size="lg"
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-sm md:text-base"
      >
        <Play className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Commencer une partie
      </Button>
    </motion.div>
  );
}
