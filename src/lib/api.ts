import type {
  Board,
  CreateTask,
  Task,
  UpdateBoard,
  UpdateTask,
} from "@/types/card.types";
// 1. Wir importieren jetzt getSupabase statt dem alten default-client
import { getSupabase } from "./supabaseConnection";

// ==========================================
// FUNKTIONEN FÜR BOARDS
// ==========================================

export async function getBoards(token: string): Promise<Board[]> {
  // Client mit dem Token des Nutzers erstellen
  const supabase = getSupabase(token);

  const { data: boards, error } = await supabase
    .from("boards")
    .select("*, tasks(*)");

  if (error) {
    console.error("Error fetching boards:", error);
    return [];
  }

  return boards as unknown as Board[];
}

export async function insertBoard(
  board: Board,
  token: string,
  userId: string,
): Promise<Board | null> {
  const supabase = getSupabase(token);

  const { data, error } = await supabase
    .from("boards")
    .insert({
      title: board.title,
      created_at: board.created_at,
      user_id: userId,
    })
    .select("*, tasks(*)")
    .single();

  if (error) {
    console.error("Error inserting boards:", error);
    return null;
  }

  return data as unknown as Board | null;
}

export async function deleteBoard(id: string, token: string): Promise<void> {
  const supabase = getSupabase(token);

  const { error } = await supabase.from("boards").delete().eq("id", id);
  if (error) {
    console.error("Error deleting board:", error);
    throw error;
  }
}

export async function getBoardById(
  id: string,
  token: string,
): Promise<Board | undefined> {
  const supabase = getSupabase(token);

  const { data: board, error } = await supabase
    .from("boards")
    .select("*, tasks(*)")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching board by id:", error);
    return undefined;
  }
  return board as Board;
}

export async function updateBoard(
  id: string,
  board: UpdateBoard,
  token: string,
): Promise<Board | null> {
  const supabase = getSupabase(token);

  const { data, error } = await supabase
    .from("boards")
    .update(board)
    .eq("id", id)
    .select("*, tasks(*)")
    .single();

  if (error) {
    console.error("Error updating boards:", error);
    return null;
  }
  return data as Board;
}

// ==========================================
// FUNKTIONEN FÜR TASKS
// ==========================================

export async function insertTask(
  task: CreateTask,
  token: string,
  userId: string,
): Promise<Task | null> {
  const supabase = getSupabase(token);

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      ...task,
      user_id: userId,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Error inserting tasks", error);
    throw error;
  }

  return data as Task;
}

export async function updateTask(
  id: string,
  task: UpdateTask,
  token: string,
): Promise<Task | null> {
  const supabase = getSupabase(token);

  const { data, error } = await supabase
    .from("tasks")
    .update(task)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating task:", error);
    throw error;
  }
  return data as Task;
}

export async function deleteTask(id: string, token: string): Promise<void> {
  const supabase = getSupabase(token);

  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}
