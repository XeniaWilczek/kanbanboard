import type { Board } from "@/types/card.types";

import type { Task } from "@/types/card.types";

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
  if (!state && action.type !== "SET_BOARD") return state;

  switch (action.type) {
    case "SET_BOARD": {
      return action.payload;
    }

    case "UPDATE_TITLE": {
      return { ...state!, title: action.payload.title };
    }

    case "CREATE_TASK": {
      return {
        ...state!,
        tasks: [...state!.tasks, action.payload.task],
      };
    }

    case "DELETE_TASK": {
      return {
        ...state!,
        tasks: state!.tasks.filter((t) => t.id !== action.payload.taskId),
      };
    }

    case "UPDATE_TASK": {
      const updatedTask = action.payload.task;
      return {
        ...state!,
        tasks: state!.tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t,
        ),
      };
    }

    case "UPDATE_TASK_STATUS": {
      const { taskId, newStatus } = action.payload;
      return {
        ...state!,
        tasks: state!.tasks.map((t) =>
          t.id === taskId ? { ...t, status: newStatus } : t,
        ),
      };
    }

    default: {
      return state;
    }
  }
}
