import type { Database } from "./database.types";

export type Board = Database["public"]["Tables"]["boards"]["Row"] & {
  tasks: Task[];
};
export type UpdateBoard = Database["public"]["Tables"]["boards"]["Update"];

export type Task = Database["public"]["Tables"]["tasks"]["Row"] & {
  status: "ToDo" | "InProgress" | "Done";
};

export type CreateTask = Database["public"]["Tables"]["tasks"]["Insert"];

export type UpdateTask = Database["public"]["Tables"]["tasks"]["Update"];
