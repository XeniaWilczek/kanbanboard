import type { Board } from "@/types/card.types";
import supabase from "./supabaseConnection";
//Funktionen für Board-Liste
export async function getBoards(): Promise<Board[]> {
  const { data: boards, error } = await supabase
    .from("boards")
    .select("*, tasks(*)");

  if (error) {
    console.error("Error fetching boards:", error);
    return [];
  }

  return boards as unknown as Board[];
}

//Funktion kopiert für Arbeit mit LocalStorage
export function getBoardsFromLocalStorage(): Board[] {
  const stringifiedBoards = localStorage.getItem("boards") || "[]";
  return JSON.parse(stringifiedBoards);
}

export function saveBoards(boards: Board[]): void {
  localStorage.setItem("boards", JSON.stringify(boards));
}

//Funktionen für einzelnes Board
export function getBoard(id: string): Board | undefined {
  const storedBoards = getBoards();
  return storedBoards.find((board) => board.id === id);
}

export function saveBoard(updatedBoard: Board): void {
  const storedBoards = getBoards();
  const selectedBoard = storedBoards.find(
    (board) => board.id === updatedBoard.id,
  );

  let newBoardList: Board[] = [];

  if (selectedBoard) {
    newBoardList = storedBoards.map((board) =>
      board.id === updatedBoard.id ? updatedBoard : board,
    );
  } else {
    newBoardList = [...storedBoards, updatedBoard];
  }

  saveBoards(newBoardList);
}
