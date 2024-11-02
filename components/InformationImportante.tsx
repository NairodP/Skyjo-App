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
                  Information Importante
                </DialogTitle>
                <DialogDescription className="pt-2 mt-2 text-lg text-gray-700">
                  Afin de ne pas compliquer l&apos;application, elle n&apos;est pas connectée à une base de données. Veuillez donc ne pas rafraîchir la page lorsque vous êtes en partie, sinon les données comme les pseudos, les scores ou encore les manches seront perdus.
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