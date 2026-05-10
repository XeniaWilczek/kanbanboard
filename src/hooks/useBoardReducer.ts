import type { Board } from "@/types/card.types";
import { useEffect, useReducer } from "react";

export type BoardAction =
  | { type: "CREATE_BOARD"; payload: Board }
  | { type: "DELETE_BOARD"; payload: Board };
//| { type: "UPDATE_BOARD"; payload: Board };

export function useBoardReducer(state: Board[], action: BoardAction): Board[] {
  switch (action.type) {
    case "CREATE_BOARD":
      return [...state, action.payload];
    case "DELETE_BOARD":
      return state.filter((board) => board.id !== action.payload.id);
    //case "UPDATE_BOARD":
    //return state.map((user) =>
    //   board.id === action.payload.id ? { ...board, ...action.payload } : Board,
    //);
    default:
      return state;
  }
}

const [boards, dispatch] = useReducer(useBoardReducer, [], () => {
  const localData = localStorage.getItem("boards");
  return localData ? JSON.parse(localData) : [];
});

useEffect(() => {
  localStorage.setItem("boards", JSON.stringify(boards));
}, [boards]);
