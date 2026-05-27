import { saveBoard } from "@/lib/api";
import type { Board, Task } from "@/types/card.types";

export type DetailState = Board | undefined;

export type DetailAction =
  | { type: "SET_BOARD"; payload: Board | undefined }
  | { type: "UPDATE_TITLE"; payload: { title: string } }
  | { type: "CREATE_TASK"; payload: { task: Task } }
  | { type: "DELETE_TASK"; payload: { taskId: string } }
  | { type: "UPDATE_TASK"; payload: { task: Task } }
  | {
      type: "UPDATE_TASK_STATUS";
      payload: { taskId: string; newStatus: "ToDo" | "InProgress" | "Done" };
    };

export function useDetailReducer(
  state: DetailState,
  action: DetailAction,
): DetailState {
  let newState = state;
  switch (action.type) {
    case "SET_BOARD": {
      newState= action.payload; 
      break;
      
    }

    case "UPDATE_TITLE": {
      if (!state) return state; 
      return { ...state, title: action.payload.title };
    }

    default: {
      return state;
    }
  }
}

    case "CREATE_TASK": {
      newDetailState = {
        ...state,
        tasks: [...state.tasks, action.payload.task],
      };
      break;
    }

    case "DELETE_TASK": {
      newDetailState = {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.taskId),
      };
      break;
    }

    case "UPDATE_TASK": {
      const updatedTask = action.payload.task;
      newDetailState = {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t,
        ),
      };
      break;
    }
    case "UPDATE_TASK_STATUS": {
      const { taskId, newStatus } = action.payload;
      newDetailState = {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === taskId ? { ...t, status: newStatus } : t,
        ),
      };
      break;
    }
    default: {
      break;
    }
  }

  saveBoard(newDetailState);

  return newDetailState;
}
