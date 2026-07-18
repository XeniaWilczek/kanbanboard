import { saveBoards } from "@/lib/localStorage";
import type { Board } from "@/types/card.types";

export type BoardAction =
  | { type: "CREATE_BOARD"; payload: Board }
  | { type: "DELETE_BOARD"; payload: { id: string } };

export function useBoardReducer(state: Board[], action: BoardAction): Board[] {
  let newState = state;

  switch (action.type) {
    case "CREATE_BOARD": {
      newState = [...state, action.payload];
      break;
    }

    case "DELETE_BOARD": {
      newState = state.filter(
        (board: { id: string }) => board.id !== action.payload.id,
      );
      break;
    }

    default: {
      break;
    }
  }

  saveBoards(newState);
  return newState;
}
