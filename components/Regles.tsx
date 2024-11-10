"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Regles() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsIconVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isIconVisible && (
        <div className="fixed top-4 right-4 z-50">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="p-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-full shadow-lg cursor-pointer flex items-center"
                title="Règles du jeu"
              >
                <Info className="text-white w-6 h-6" />
                <span className="text-white px-2">Règles du jeu</span>
              </motion.div>
            </DialogTrigger>
            
            <DialogContent className="w-[90%] max-w-[450px] rounded-lg border-sm shadow-lg max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle className="text-[#1a326e] text-2xl mt-3">
                  Règles du jeu
                </DialogTitle>
                <DialogDescription className="pt-2 mt-2 text-lg text-gray-700 overflow-y-auto max-h-[60vh] pr-2">
                  <div className="space-y-4">
                    On dispose 12 cartes devant soit faces cachées. Chaque joueur à son tour prend la première carte de la pioche ou de la défausse. S&apos;il prend une carte visible de la défausse il doit échanger cette carte avec l&apos;une de ses cartes (cachée ou visible) et la poser face visible. Avec une carte de la pioche il peut la défausser directement, mais doit révéler une de ses cartes. Il est possible de défausser 3 cartes d&apos;un coup si elles sont identiques et dans une même colonne. Lorsqu&apos;un joueur a révélé toutes ses cartes, le tour se termine puis la manche s&apos;arrête. Si le premier joueur a avoir révélé toutes ses cartes n&apos;a pas <strong>strictement</strong> le moins de points, alors son score est doublé ! Le jeu se joue en plusieurs manches, l&apos;objectif est de totaliser le moins de point possible. Le jeu se termine lorsqu&apos;un joueur atteint 100 points. Bonne chance !
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <Button variant="outline" className="text-lg mx-auto" onClick={() => setIsDialogOpen(false)}>
                  J&apos;ai compris
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </AnimatePresence>
  );
}