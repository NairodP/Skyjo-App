"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { useGlobalState } from "@/context/GlobalState";
import { Button } from "@/components/ui/button";
import Nav from "@/components/Nav";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Vortex } from "@/components/ui/vortex";

export default function HomePage() {
  const { state } = useGlobalState();
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const shouldShowNav =
    state.players.length > 0 &&
    state.players.some((player) => player.scores.some((score) => score > 0));

  const words = "Bienvenue sur l'assistant";

  useEffect(() => {
    const titleDuration = words.length * 40 + 500;
    const logoTimer = setTimeout(() => setShowLogo(true), titleDuration);
    const contentTimer = setTimeout(
      () => setShowContent(true),
      titleDuration + 1000
    );
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

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
    <div className="min-h-screen bg-sky-100 text-blue-900">
      {shouldShowNav && <Nav />}

      <motion.div
        className="flex flex-col items-center pt-16 px-2 min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <TextGenerateEffect
            words={words}
            className="font-zillaSlab uppercase text-center text-4xl md:text-5xl text-blue-600"
          />
        </motion.div>

        <AnimatePresence>
          {showLogo && (
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 relative mx-auto rounded-md w-[calc(100%-4rem)]  h-[5rem] overflow-hidden"
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
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContent && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  times: [0, 0.2, 0.8, 1],
                }}
                className="mb-8 md:mb-12 relative w-64 h-64 mx-auto"
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
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl font-bold uppercase tracking-wider px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="mr-2 w-6 h-6 md:w-7 md:h-7" />
                  COMMENCER UNE PARTIE
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
