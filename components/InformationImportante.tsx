"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function InformationImportante() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(false);

  // Delay avant l'apparition de l'icône
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
                className="p-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-full shadow-lg cursor-pointer"
                title="Information Importante"
              >
                <Info className="text-white w-6 h-6" />
              </motion.div>
            </DialogTrigger>
            
            <DialogContent className="w-[90%] max-w-[450px] rounded-lg border-sm shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-[#1a326e] text-2xl mt-3">
                  Règles du jeu
                </DialogTitle>
                <DialogDescription className="pt-2 mt-2 text-lg text-gray-700">
                On dispose 12 cartes devant soit faces cachées. Chaque joueur à son tour prend la première carte de la pioche ou de la défausse. S’il prend une carte visible de la défausse il doit échanger cette carte avec l’une de ses cartes (cachée ou visible) et la poser face visible. Avec une carte de la pioche il peut la défausser directement, mais doit révéler une de ses cartes. Il est possible de défausser 3 cartes d’un coup si elles sont identiques et dans une même colonne. Lorsqu’un joueur a révélé toutes ses cartes, le tour se termine puis la manche s’arrête. Si le premier joueur a avoir révélé toutes ses cartes n&apos;a pas <strong>strictement</strong> le moins de points, alors son score est doublé ! Le jeu se joue en plusieurs manches, l&apos;objectif est de totaliser le moins de point possible. Le jeu se termine lorsqu&apos;un joueur atteint 100 points. Bonne chance !
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" className="mt-2 text-lg mx-auto" onClick={() => setIsDialogOpen(false)}>
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