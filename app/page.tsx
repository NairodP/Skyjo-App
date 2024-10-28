"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, Check, Trophy, RefreshCw, Table } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types
interface Player {
  name: string;
  scores: RoundScore[];
}

interface RoundScore {
  score: number;
  round: number;
}

interface GameState {
  players: Player[];
  currentRound: number;
}

const SkyjoApp: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [showValidation, setShowValidation] = useState<boolean>(false);

  useEffect(() => {
    const storedData = localStorage.getItem('skyjoGame');
    if (storedData) {
      const { players, currentRound } = JSON.parse(storedData) as GameState;
      setPlayers(players);
      setCurrentRound(currentRound);
      setPlayerCount(players.length);
    }
  }, []);

  const saveGameState = (updatedPlayers: Player[], round: number): void => {
    localStorage.setItem('skyjoGame', JSON.stringify({
      players: updatedPlayers,
      currentRound: round
    }));
  };

  const handlePlayerCountChange = (value: string): void => {
    const count = parseInt(value);
    setPlayerCount(count);
    setPlayers(prev => {
      const newPlayers = [...prev];
      while (newPlayers.length < count) {
        newPlayers.push({ name: '', scores: [] });
      }
      while (newPlayers.length > count) {
        newPlayers.pop();
      }
      return newPlayers;
    });
  };

  const handlePlayerNameChange = (index: number, name: string): void => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], name };
    setPlayers(newPlayers);
    saveGameState(newPlayers, currentRound);
  };

  const handleScoreSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newScores = players.map((_, index) => ({
      score: parseInt(formData.get(`score-${index}`) as string),
      round: currentRound
    }));
    
    const updatedPlayers = players.map((player, index) => ({
      ...player,
      scores: [...(player.scores || []), newScores[index]]
    }));
    
    setPlayers(updatedPlayers);
    setCurrentRound(prev => prev + 1);
    saveGameState(updatedPlayers, currentRound + 1);
    setStep(3);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (players.every(player => player.name)) {
      setShowValidation(true);
      setTimeout(() => {
        setShowValidation(false);
        setStep(3);
      }, 1500);
    }
  };

  const resetGame = (): void => {
    setPlayers([]);
    setCurrentRound(1);
    setStep(1);
    localStorage.removeItem('skyjoGame');
  };

  const calculateTotalScore = (scores: RoundScore[]): number => {
    return scores ? scores.reduce((total, round) => total + round.score, 0) : 0;
  };

  const ScoreTable: React.FC = () => {
    const maxRounds = Math.max(...players.map(p => p.scores?.length || 0));
    
    return (
      <UITable>
        <TableHeader>
          <TableRow>
            <TableHead>Joueur</TableHead>
            {[...Array(maxRounds)].map((_, i) => (
              <TableHead key={i}>Manche {i + 1}</TableHead>
            ))}
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{player.name}</TableCell>
              {player.scores?.map((score, j) => (
                <TableCell key={j}>{score.score}</TableCell>
              ))}
              {[...Array(maxRounds - (player.scores?.length || 0))].map((_, j) => (
                <TableCell key={`empty-${j}`}>-</TableCell>
              ))}
              <TableCell className="font-bold">
                {calculateTotalScore(player.scores)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </UITable>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          {step > 1 && (
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
            >
              <ChevronLeft className="mr-2" /> Retour
            </Button>
          )}
          {players.length > 0 && (
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Table className="mr-2" /> Voir les scores
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Tableau des scores</DialogTitle>
                    <DialogDescription>
                      Récapitulatif des scores par manche
                    </DialogDescription>
                  </DialogHeader>
                  <ScoreTable />
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                onClick={resetGame}
              >
                <RefreshCw className="mr-2" /> Nouvelle partie
              </Button>
            </div>
          )}
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-8 text-blue-900">
              Bienvenue sur l&apos;assistant Skyjo
            </h1>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-8"
            >
              <Trophy size={100} className="mx-auto text-blue-600" />
            </motion.div>
            <Button
              size="lg"
              onClick={() => setStep(2)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className="mr-2" /> Commencer une partie
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <Card className="p-6">
            <form onSubmit={handleFormSubmit}>
              <div className="space-y-4">
                <div>
                  <Label>Nombre de joueurs</Label>
                  <Select
                    value={playerCount.toString()}
                    onValueChange={handlePlayerCountChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(9)].map((_, i) => (
                        <SelectItem key={i + 2} value={(i + 2).toString()}>
                          {i + 2} joueurs
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {[...Array(playerCount)].map((_, index) => (
                  <div key={index}>
                    <Label>Joueur n°{index + 1}</Label>
                    <Input
                      value={players[index]?.name || ''}
                      onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                      placeholder={`Nom du joueur ${index + 1}`}
                      required
                    />
                  </div>
                ))}

                <Button type="submit" className="w-full">
                  {showValidation ? (
                    <Check className="text-green-500" />
                  ) : (
                    'Valider'
                  )}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl mb-4">Manche {currentRound}</h2>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2 }}
              className="mb-4"
            >
              <Trophy size={64} className="mx-auto text-blue-600" />
            </motion.div>
            <Button
              onClick={() => setStep(4)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Entrer les scores
            </Button>
          </motion.div>
        )}

        {step === 4 && (
          <Card className="p-6">
            <h2 className="text-2xl mb-4">Scores de la manche {currentRound}</h2>
            <form onSubmit={handleScoreSubmit} className="space-y-4">
              {players.map((player, index) => (
                <div key={index}>
                  <Label>{player.name}</Label>
                  <Select name={`score-${index}`} defaultValue="0">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(201)].map((_, i) => (
                        <SelectItem key={i} value={(i - 100).toString()}>
                          {i - 100}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <Button type="submit" className="w-full">
                Valider la manche
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SkyjoApp;