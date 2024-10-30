import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Player } from "@/types/game";
import { motion } from "framer-motion";

interface ScoreTableProps {
  players: Player[];
}

export default function ScoreTable({ players }: ScoreTableProps) {
  // Vérifier que les joueurs existent avant de calculer maxRounds
  const maxRounds = players.length
    ? Math.max(...players.map((p) => p.scores?.length || 0))
    : 0;

  const calculateTotalScore = (scores: number[]): number => {
    return scores ? scores.reduce((total, score) => total + score, 0) : 0;
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white shadow-md rounded-lg">
        <TableHeader>
          <TableRow className=" bg-red-300 text-black">
            <TableHead className="w-[100px] p-4 text-black font-bold uppercase">Joueur</TableHead>
            {[...Array(maxRounds)].map((_, i) => (
              <TableHead key={i} className="w-[80px] p-4 text-black font-bold uppercase">
                Manche {i + 1}
              </TableHead>
            ))}
            <TableHead className="w-[80px] p-4 text-black font-bold uppercase">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="hover:bg-gray-100"
            >
              <TableCell className="font-medium p-4">{player.name}</TableCell>
              {player.scores?.map((score, j) => (
                <TableCell key={j} className="p-4">
                  {score}
                </TableCell>
              ))}
              {[...Array(maxRounds - (player.scores?.length || 0))].map(
                (_, j) => (
                  <TableCell key={`empty-${i}-${j}`} className="p-4">
                    -
                  </TableCell>
                )
              )}
              <TableCell className="font-bold p-4">
                {calculateTotalScore(player.scores)}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}