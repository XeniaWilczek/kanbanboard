import type { Database } from "./database.types";

export interface BoardLocalStorage {
  id: string;
  title: string;
  tasks: Task[];
}

export type Board = Database["public"]["Tables"]["boards"]["Row"] & {
  tasks: Database["public"]["Tables"]["tasks"]["Row"][];
};

export interface Task {
  id: string;
  title: string;
  status: "ToDo" | "InProgress" | "Done";
  description?: string;
  responsibility?: string;
  deadline?: Date;
}
