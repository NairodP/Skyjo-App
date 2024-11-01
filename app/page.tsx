"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalState } from "@/context/GlobalState";
import Nav from "@/components/Nav";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Vortex } from "@/components/ui/vortex";
import GlowingButton from "@/components/GlowingButton";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function HomePage() {
  const { state } = useGlobalState();
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showBackgroundLines, setShowBackgroundLines] = useState(false);

  const shouldShowNav =
    state.players.length > 0 &&
    state.players.some((player) => player.scores.some((score) => score > 0));

  const words = "Bienvenue sur l'assistant";

  useEffect(() => {
    const titleDuration = words.length * 40 + 500;
    const logoTimer = setTimeout(() => setShowLogo(true), titleDuration);
    const contentTimer = setTimeout(() => {
      setShowContent(true);
      setShowBackgroundLines(true);
    }, titleDuration + 1000);
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
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.7,
      },
    },
  };

  return (
    <>
      {shouldShowNav && <Nav />}
      {showBackgroundLines && (
        // eslint-disable-next-line react/no-children-prop
        <BackgroundLines className="absolute inset-0 min-h-screen bg-sky-100" children={undefined} />
      )}
      <motion.div
        className="flex flex-col items-center pt-16 px-2 min-h-screen relative z-10"
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

              <GlowingButton href="/playerSetup">
                COMMENCER UNE PARTIE
              </GlowingButton>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}