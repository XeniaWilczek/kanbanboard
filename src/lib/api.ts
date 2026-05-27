import type { Board } from "@/types/card.types";
import supabase from "./supabaseConnection";
//Funktionen für Board-Liste

//Funktionen für Supabase
export async function getBoards(): Promise<Board[]> {
  const { data: boards, error } = await supabase
    .from("boards")
    .select("*, tasks(*)");

  if (error) {
    console.error("Error fetching boards:", error);
    return [];
  }

  return boards;
}

export async function insertBoard(board: Board): Promise<Board | null> {
  const { data, error } = await supabase
    .from("boards")
    .insert({
      title: board.title,
      created_at: board.created_at,
    })
    .select("*, tasks(*)")
    .single();

  if (error) {
    console.error("Error inserting boards:", error);
    return null;
  }

  return data;
}

export async function deleteBoard(id: string): Promise<void> {
  const { error } = await supabase.from("boards").delete().eq("id", id);
  if (error) {
    console.error("Error deleting board:", error);
    throw error;
  }
}

export async function getBoardById(id: string): Promise<Board | undefined> {
  const { data: board, error } = await supabase
    .from("boards")
    .select("*, tasks(*)")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching board by id:", error);
    return undefined;
  }
  return board;
}
