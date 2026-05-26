import type { Board } from "@/types/card.types";

export type BoardAction =
  | { type: "CREATE_BOARD"; payload: Board }
  | { type: "DELETE_BOARD"; payload: { id: string } }
  | { type: "SET_BOARDS"; payload: Board[] };

export function useBoardReducer(state: Board[], action: BoardAction): Board[] {
  switch (action.type) {
    case "CREATE_BOARD": {
      return [...state, action.payload];
    }

    case "DELETE_BOARD": {
      return state.filter((board) => board.id !== action.payload.id);
    }

    case "SET_BOARDS": {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
