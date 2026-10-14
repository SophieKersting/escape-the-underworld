// User interface: draws the screens and connects buttons and clicks to the game logic.
import {
  BOARD_SIZE,
  createGame,
  currentPlayer,
  isOccupied,
  moveCurrentPlayer,
  placeCurrentPlayer,
  type Direction,
  type GameState,
  type MoveResult,
} from "./game";

const COLORS = [
  { label: "Rot", value: "#e05252" },
  { label: "Blau", value: "#4a90e2" },
  { label: "Grün", value: "#50b860" },
  { label: "Gelb", value: "#e8c547" },
  { label: "Lila", value: "#a066d3" },
  { label: "Orange", value: "#ec8a3a" },
];

const MAX_PLAYERS = 6;

/** A player as configured on the setup screen. The number stays fixed when the order changes. */
interface SetupPlayer {
  number: number;
  color: string;
}

// --- App state -------------------------------------------------------------
// Everything shown on screen is derived from these three variables.
// After every change we call render(), which redraws the whole screen.

let setupPlayers: SetupPlayer[] = [
  { number: 1, color: COLORS[0].value },
  { number: 2, color: COLORS[1].value },
];
/** null means: the setup screen is shown. */
let game: GameState | null = null;
/** Short note below the status line, e.g. "Feld belegt — Zug verfällt". */
let message = "";

// index.html always contains <div id="app">, hence the "!".
const app = document.querySelector<HTMLDivElement>("#app")!;

function render(): void {
  if (game === null) {
    renderSetup();
  } else {
    renderGame(game);
  }
}

// --- Setup screen ----------------------------------------------------------

function renderSetup(): void {
  const showOrderButtons = setupPlayers.length >= 2;

  const countOptions = Array.from({ length: MAX_PLAYERS }, (_, i) => i + 1)
    .map((n) => `<option value="${n}" ${n === setupPlayers.length ? "selected" : ""}>${n}</option>`)
    .join("");

  const playerRows = setupPlayers
    .map((player, index) => {
      // Colors of the other players are disabled, so every color is used only once.
      const colorOptions = COLORS.map((c) => {
        const takenByOther = setupPlayers.some((p) => p !== player && p.color === c.value);
        return `<option value="${c.value}" ${c.value === player.color ? "selected" : ""} ${takenByOther ? "disabled" : ""}>${c.label}</option>`;
      }).join("");
      const orderButtons = showOrderButtons
        ? `<button class="small" data-up="${index}" ${index === 0 ? "disabled" : ""} aria-label="Früher am Zug">▲</button>
           <button class="small" data-down="${index}" ${index === setupPlayers.length - 1 ? "disabled" : ""} aria-label="Später am Zug">▼</button>`
        : "";
      return `
        <li class="setup-player">
          <span class="dot" style="background:${player.color}"></span>
          <span class="name">Spieler ${player.number}</span>
          <select data-color="${index}">${colorOptions}</select>
          ${orderButtons}
        </li>`;
    })
    .join("");

  app.innerHTML = `
    <h1>Entkomme dem Totenreich</h1>
    <label>Anzahl Spieler <select id="player-count">${countOptions}</select></label>
    <ol class="setup-list">${playerRows}</ol>
    <button id="start">Spiel starten</button>
  `;

  app.querySelector<HTMLSelectElement>("#player-count")!.addEventListener("change", (event) => {
    setPlayerCount(Number((event.target as HTMLSelectElement).value));
  });
  app.querySelectorAll<HTMLSelectElement>("[data-color]").forEach((select) => {
    select.addEventListener("change", () => {
      setupPlayers[Number(select.dataset.color)].color = select.value;
      render();
    });
  });
  app.querySelectorAll<HTMLButtonElement>("[data-up]").forEach((button) => {
    button.addEventListener("click", () => swapPlayers(Number(button.dataset.up), -1));
  });
  app.querySelectorAll<HTMLButtonElement>("[data-down]").forEach((button) => {
    button.addEventListener("click", () => swapPlayers(Number(button.dataset.down), 1));
  });
  app.querySelector("#start")!.addEventListener("click", startGame);
}

/**
 * Removes players with higher numbers, or adds missing numbers at the end of the turn order.
 * A new player gets the first color nobody has yet (there are as many colors as max. players).
 */
function setPlayerCount(count: number): void {
  setupPlayers = setupPlayers.filter((p) => p.number <= count);
  for (let number = 1; number <= count; number++) {
    if (!setupPlayers.some((p) => p.number === number)) {
      const freeColor = COLORS.find((c) => !setupPlayers.some((p) => p.color === c.value))!;
      setupPlayers.push({ number, color: freeColor.value });
    }
  }
  render();
}

/** Swaps a player with the one before (-1) or after (+1) in turn order. */
function swapPlayers(index: number, offset: -1 | 1): void {
  const other = index + offset;
  [setupPlayers[index], setupPlayers[other]] = [setupPlayers[other], setupPlayers[index]];
  render();
}

function startGame(): void {
  game = createGame(setupPlayers.map((p) => ({ name: `Spieler ${p.number}`, color: p.color })));
  message = "";
  render();
}

function backToSetup(): void {
  game = null;
  message = "";
  render();
}

// --- Game screen -----------------------------------------------------------

function renderGame(state: GameState): void {
  const player = currentPlayer(state);
  const statusText = {
    placing: `${player.name} — Wähle dein Startfeld`,
    playing: `${player.name} ist am Zug`,
    finished: `${player.name} hat gewonnen!`,
  }[state.phase];

  // The move buttons always exist but are invisible outside the "playing" phase,
  // so they keep their space and the exit button below does not jump.
  const controlsClass = state.phase === "playing" ? "controls" : "controls hidden";
  const exitButton =
    state.phase === "finished"
      ? `<button id="exit">Nochmal spielen / Zurück zum Setup</button>`
      : `<button id="exit" class="secondary">Spiel beenden / Zurück zum Setup</button>`;

  app.innerHTML = `
    <h1>Entkomme dem Totenreich</h1>
    <p class="status"><span class="dot" style="background:${player.color}"></span>${statusText}</p>
    <p class="message">${message}</p>
    ${renderBoard(state)}
    <div class="${controlsClass}">
      <button data-move="left">schräg links vor</button>
      <button data-move="right">schräg rechts vor</button>
    </div>
    ${exitButton}
  `;

  app.querySelectorAll<SVGPolygonElement>(".selectable").forEach((cell) => {
    cell.addEventListener("click", () => {
      placeCurrentPlayer(state, Number(cell.dataset.col));
      render();
    });
  });
  app.querySelectorAll<HTMLButtonElement>("[data-move]").forEach((button) => {
    button.addEventListener("click", () => handleMove(state, button.dataset.move as Direction));
  });
  app.querySelector("#exit")!.addEventListener("click", backToSetup);
}

const MOVE_MESSAGES: Record<MoveResult, string> = {
  moved: "",
  won: "",
  blocked: "Feld belegt — Zug verfällt",
  offBoard: "Außerhalb des Spielfelds — Zug verfällt",
};

function handleMove(state: GameState, direction: Direction): void {
  // Remember the player now: after the move it is already the next player's turn.
  const player = currentPlayer(state);
  const result = moveCurrentPlayer(state, direction);
  message = MOVE_MESSAGES[result] ? `${player.name}: ${MOVE_MESSAGES[result]}` : "";
  render();
}

// --- Board (SVG) -----------------------------------------------------------
// "Pointy-top" hexagons: a corner points up, so every field has neighbours
// to the left and right and diagonally in front and behind.

/** Distance from the centre of a hexagon to one of its corners, in pixels. */
const HEX_RADIUS = 30;
const HEX_WIDTH = Math.sqrt(3) * HEX_RADIUS;
/** Rows overlap, so they are only 1.5 radii apart instead of 2. */
const ROW_DISTANCE = 1.5 * HEX_RADIUS;

function hexCenter(row: number, col: number): { x: number; y: number } {
  const shift = row % 2 === 1 ? HEX_WIDTH / 2 : 0; // odd rows are shifted right (see game.ts)
  return {
    x: HEX_WIDTH / 2 + col * HEX_WIDTH + shift,
    y: HEX_RADIUS + (BOARD_SIZE - 1 - row) * ROW_DISTANCE, // row 0 is drawn at the bottom
  };
}

/** The six corners of a hexagon as an SVG "points" string, e.g. "10,20 30,40 ...". */
function hexCorners(x: number, y: number): string {
  const corners: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i + 30);
    corners.push(`${x + HEX_RADIUS * Math.cos(angle)},${y + HEX_RADIUS * Math.sin(angle)}`);
  }
  return corners.join(" ");
}

function renderBoard(state: GameState): string {
  const width = BOARD_SIZE * HEX_WIDTH + HEX_WIDTH / 2;
  const height = 2 * HEX_RADIUS + (BOARD_SIZE - 1) * ROW_DISTANCE;

  let cells = "";
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const { x, y } = hexCenter(row, col);
      const selectable = state.phase === "placing" && row === 0 && !isOccupied(state, { row, col });
      cells += `<polygon class="cell ${selectable ? "selectable" : ""}" data-col="${col}" points="${hexCorners(x, y)}" />`;
    }
  }

  let pieces = "";
  for (const player of state.players) {
    if (player.position !== null) {
      const { x, y } = hexCenter(player.position.row, player.position.col);
      pieces += `<circle class="piece" cx="${x}" cy="${y}" r="${HEX_RADIUS * 0.55}" fill="${player.color}" />`;
    }
  }

  return `<svg class="board" viewBox="0 0 ${width} ${height}">${cells}${pieces}</svg>`;
}

render();
