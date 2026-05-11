import { saveBoards } from "@/lib/api";
import type { Board, Task } from "@/types/card.types";


export type DetailState = Board[];//Stimmt es??


export type DetailAction =
  | { type: "UPDATE_TITLE"; payload: string }
  | { type: "CREATE_TASK"; payload: Task};
{ type: "DELETE_TASK", payload: task.id }

export function useDetailReducer(state: Board[], action: DetailAction): Board[] {
  let newState = state;

  switch (action.type) {
    case "UPDATE_TITLE": {
      newState = [...state, action.payload];
      break;
    }

    case "CREATE_TASK": {
      newState = state.filter(
        (board: { id: string }) => board.id !== action.payload.id,
      );
      break;
    }
    case "DELETE_TASK": {
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
