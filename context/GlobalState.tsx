"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
} from "react";
import { Player, RoundScore } from "@/types/game";

// Définir les types pour l'état global et les actions
interface State {
  players: Player[];
  currentRound: number;
  isGameOver: boolean;
  roundScores: RoundScore[];
}

type Action =
  | { type: "SET_PLAYERS"; payload: Player[] }
  | { type: "SET_CURRENT_ROUND"; payload: number }
  | { type: "SET_IS_GAME_OVER"; payload: boolean }
  | { type: "ADD_ROUND_SCORE"; payload: RoundScore }
  | { type: "RESET_GAME" };

// Définir l'état initial
const initialState: State = {
  players: [],
  currentRound: 1,
  isGameOver: false,
  roundScores: [],
};

// Créer le contexte
const GlobalStateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Créer le reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PLAYERS":
      return { ...state, players: action.payload };
    case "SET_CURRENT_ROUND":
      return { ...state, currentRound: action.payload };
    case "SET_IS_GAME_OVER":
      return { ...state, isGameOver: action.payload };
    case "ADD_ROUND_SCORE":
      return { ...state, roundScores: [...state.roundScores, action.payload] };
    case "RESET_GAME":
      return initialState;
    default:
      return state;
  }
};

// Créer le fournisseur
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Hook pour utiliser le contexte global
export const useGlobalState = () => useContext(GlobalStateContext)
