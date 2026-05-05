export interface Board {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  status: "ToDo" | "InProgress" | "Done";
  description: string;
}
