// Game logic only: no access to the browser (DOM) in this file.
// Keeping logic and display apart lets us unit-test the rules without a browser.

/** The board has BOARD_SIZE rows and BOARD_SIZE columns. */
export const BOARD_SIZE = 6;

/** Row 0 is the bottom row (start), row BOARD_SIZE - 1 is the top row (goal). */
export interface Position {
  row: number;
  col: number;
}

export interface Player {
  name: string;
  color: string;
  /** null until the player has chosen a start field. */
  position: Position | null;
}

export type Phase = "placing" | "playing" | "finished";
export type Direction = "left" | "right";
export type MoveResult = "moved" | "blocked" | "offBoard" | "won";

export interface GameState {
  /** Players in turn order. */
  players: Player[];
  /** Whose turn it is. In the "finished" phase this is the winner. */
  currentPlayerIndex: number;
  phase: Phase;
}

export function createGame(players: { name: string; color: string }[]): GameState {
  return {
    players: players.map((p) => ({ name: p.name, color: p.color, position: null })),
    currentPlayerIndex: 0,
    phase: "placing",
  };
}

export function currentPlayer(state: GameState): Player {
  return state.players[state.currentPlayerIndex];
}

export function isOnBoard(pos: Position): boolean {
  return pos.row >= 0 && pos.row < BOARD_SIZE && pos.col >= 0 && pos.col < BOARD_SIZE;
}

export function isOccupied(state: GameState, pos: Position): boolean {
  return state.players.some(
    (p) => p.position !== null && p.position.row === pos.row && p.position.col === pos.col,
  );
}

/**
 * Returns the field diagonally in front (one row up) of `from`.
 *
 * Hex layout: every odd row is shifted half a field to the right.
 * So which column lies diagonally in front depends on whether
 * the current row is shifted or not.
 */
export function targetPosition(from: Position, direction: Direction): Position {
  const rowIsShifted = from.row % 2 === 1;
  const row = from.row + 1;
  if (direction === "left") {
    return { row, col: rowIsShifted ? from.col : from.col - 1 };
  }
  return { row, col: rowIsShifted ? from.col + 1 : from.col };
}

/** Puts the current player's piece on a field of the bottom row. Returns false if not allowed. */
export function placeCurrentPlayer(state: GameState, col: number): boolean {
  const pos = { row: 0, col };
  if (state.phase !== "placing" || !isOnBoard(pos) || isOccupied(state, pos)) {
    return false;
  }
  currentPlayer(state).position = pos;
  if (state.players.every((p) => p.position !== null)) {
    state.phase = "playing";
  }
  advanceTurn(state);
  return true;
}

/** Moves the current player diagonally forward, if the target field is free. */
export function moveCurrentPlayer(state: GameState, direction: Direction): MoveResult {
  const player = currentPlayer(state);
  if (state.phase !== "playing" || player.position === null) {
    throw new Error("Moving is only possible while the game is running");
  }

  const target = targetPosition(player.position, direction);
  if (!isOnBoard(target)) {
    advanceTurn(state);
    return "offBoard";
  }
  if (isOccupied(state, target)) {
    advanceTurn(state);
    return "blocked";
  }

  player.position = target;
  if (target.row === BOARD_SIZE - 1) {
    // The winner stays the current player, so the turn does not advance.
    state.phase = "finished";
    return "won";
  }
  advanceTurn(state);
  return "moved";
}

/** Next player in turn order; after the last player it starts again with the first. */
function advanceTurn(state: GameState): void {
  state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
}
