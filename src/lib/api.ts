import type { Board } from "@/types/card.types";

export function getBoards(): Board[] {
  const stringifiedBoards = localStorage.getItem("boards") || "[]";
  return JSON.parse(stringifiedBoards);
}

export function saveBoards(boards: Board[]): void {
  localStorage.setItem("boards", JSON.stringify(boards));
}
