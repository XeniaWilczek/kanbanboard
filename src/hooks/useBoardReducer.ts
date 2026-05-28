import type { Board } from "@/types/card.types";

export type BoardAction =
  | { type: "CREATE_BOARD"; payload: Board }
  | { type: "DELETE_BOARD"; payload: { id: string } }
  | { type: "SET_BOARDS"; payload: Board[] };

export function useBoardReducer(state: Board[], action: BoardAction): Board[] {
  switch (action.type) {
    case "CREATE_BOARD": {
      const newState = [...state, action.payload];
      return newState;
    }

    case "DELETE_BOARD": {
      const newState = state.filter((board) => board.id !== action.payload.id);
      return newState;
    }

    case "SET_BOARDS": {
      const newState = action.payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
