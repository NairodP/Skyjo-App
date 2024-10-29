import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoundStartProps {
  round: number;
  onContinue: () => void;
}

export default function RoundStart({ round, onContinue }: RoundStartProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center px-4 md:px-0"
    >
      <h2 className="text-xl md:text-2xl mb-3 md:mb-4">Manche {round}</h2>
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2 }}
        className="mb-3 md:mb-4"
      >
        <Trophy size={48} className="mx-auto text-blue-600" />
      </motion.div>
      <Button
        onClick={onContinue}
        className="bg-blue-600 hover:bg-blue-700 text-sm md:text-base"
      >
        Entrer les scores
      </Button>
    </motion.div>
  );
}
