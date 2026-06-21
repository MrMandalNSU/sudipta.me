import React from "react";
import {
  SportsEsports as SportsEsportsIcon,
  TouchApp as TouchAppIcon,
  Share as ShareIcon,
  Storage as StorageIcon,
  Palette as PaletteIcon,
  DeveloperMode as DeveloperModeIcon,
  Timeline as TimelineIcon,
  SettingsSuggest as SettingsSuggestIcon,
  Terminal as TerminalIcon,
  LockReset as LockResetIcon,
} from "@mui/icons-material";

export const features = [
  { icon: <SportsEsportsIcon />, title: "Game Modes", shortTitle: "Modes", desc: "Three custom difficulty models (Easy, Hard, Insane) that dictate guess limits, visual clues feedback, and attempt history masking." },
  { icon: <TouchAppIcon />, title: "Hybrid Placement", shortTitle: "Interaction", desc: "Seamless drag-and-drop actions integrated alongside an elegant touch/click fallback handler for mobile users." },
  { icon: <ShareIcon />, title: "Wordle-Style Share", shortTitle: "Sharing", desc: "Generate adaptive Unicode share summaries displaying grid matrices, attempt indicators, or padlock icons based on difficulty." },
  { icon: <StorageIcon />, title: "Local Persistence", shortTitle: "Persistence", desc: "Saves total played matches, win ratios, and active win streaks per difficulty locally to keep users engaged." },
  { icon: <PaletteIcon />, title: "Glassmorphic Panels", shortTitle: "Aesthetics", desc: "Modern UI elements structured with CSS backdrop-blurs, linear-gradient scrollbars, and neon glow backdrops." },
  { icon: <DeveloperModeIcon />, title: "Zero Lag Loop", shortTitle: "Latency", desc: "Pure client-side rendering with functional state transformations that bypass server requests to deliver 0ms execution." },
];

export const systemNodes = {
  orchestrator: {
    title: "React State Hub (GameContainer.js)",
    shortTitle: "State Hub",
    icon: <SettingsSuggestIcon />,
    description: "Acts as the central reactive coordinator. Houses states for active rows, secret target keys, available trays, modal triggers, canvas elements, and statistics dashboards.",
    role: "Propagates reactive data states and dispatches interactive input handlers down to presentation sub-components.",
  },
  interaction: {
    title: "Hybrid Placement Engine (DnD & Touch)",
    shortTitle: "Inputs",
    icon: <TouchAppIcon />,
    description: "Supports desktop HTML5 Drag & Drop handlers alongside click/touch handlers. Manages marble source indicators and available color arrays securely during transitions.",
    role: "Parses user gestures and schedules placements/swaps inside active guess columns.",
  },
  engine: {
    title: "Permutation Logic Engine",
    shortTitle: "Evaluation",
    icon: <TimelineIcon />,
    description: "Computes guesses against target sequences. Maps placement indices into green (exact), yellow (misplaced), or red (wrong) status indicators, and checks game boundaries (Max attempts, solved matches).",
    role: "Performs mathematical array comparison algorithms on guess confirmations to declare win/loss outcomes.",
  },
  console: {
    title: "Diagnostic Console Log (stdout)",
    shortTitle: "Console",
    icon: <TerminalIcon />,
    description: "Emulates an standard log screen. Receives evaluation telemetry logs and formats diagnostic clue counters per attempt. Adjusts outputs based on mode rules.",
    role: "Renders stdout text records describing previous placement clues without scrolling the global viewport.",
  },
  persistence: {
    title: "Local Storage Manager",
    shortTitle: "Persistence",
    icon: <StorageIcon />,
    description: "Manages browser persistence for user scoring caches under keys. Runs safety try-catch loops to parse and merge default values when browser cookies are modified.",
    role: "Persists total played games, win counters, and consecutive win-streaks per difficulty across browser sessions.",
  },
  share: {
    title: "Wordle-style Decryption Encoder",
    shortTitle: "Share Encoder",
    icon: <ShareIcon />,
    description: "Encodes game evaluation results into share layouts. Outputs colored emoji matrices for Easy Mode, numeric logs for Hard Mode, and padlocked attempts for Insane Mode.",
    role: "Compiles grid histories into clipboard formats, triggering visual status alerts on copy success.",
  },
};

export const workflows = {
  initialization: {
    title: "Game Board Initialization",
    shortTitle: "Init",
    icon: <LockResetIcon />,
    description: "Triggers pool generation, secret key shuffling, and grid dimension configurations.",
    steps: [
      { label: "Pool Selection", text: "Select 5 random colors from the global pool of 8 color marble options to serve as the active set." },
      { label: "Target Shuffling", text: "Shuffle these 5 colors randomly to generate the secret correct sequence key." },
      { label: "Tray Sorting", text: "Sort the remaining 5 colors alphabetically by name in the Available tray, avoiding placement suggestions to the player." },
      { label: "Dimension Setup", text: "Set grid rows dynamically based on difficulty: 5 attempts for Easy Mode, or a single row expanding on demand for Hard/Insane." },
      { label: "Stdout Reset", text: "Initialize Console logs with system settings, mode labels, and guidelines, clear canvas contexts, and render panels." }
    ],
    payload: {
      difficulty: "easy",
      maxAttempts: 5,
      activeColorPool: ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Cyan", "Pink"]
    },
    responsePayload: {
      status: "INITIALIZED",
      targetSequence: ["Green", "Yellow", "Blue", "Orange", "Red"],
      availableTray: ["Blue", "Green", "Orange", "Red", "Yellow"]
    }
  },
  evaluation: {
    title: "Confirm Guess & Board Flip Workflow",
    shortTitle: "Evaluate",
    icon: <TimelineIcon />,
    description: "Computes guess indices, runs card flip render threads, and checks win/loss bounds.",
    steps: [
      { label: "Input Verification", text: "Ensure that all 5 color slots in the active row are filled. If incomplete, log a console alert and cancel validation." },
      { label: "Array Intersect", text: "Compare colors against targetSequence. Exact index matches equal 'green', misplaced colors equal 'yellow', wrong colors equal 'red'." },
      { label: "Flip Animation", text: "Trigger sequential 3D CSS card flip animations across slots, staggered with a 180ms delay. Apply indicator colors (or mask them in Hard/Insane modes)." },
      { label: "Append Clues", text: "Upon completion of flips, log clues stdout to the Console panel (e.g. Attempt 1: [1 Green, 2 Yellow])." },
      { label: "Outcome Check", text: "If solved, launch victory canvas confetti and save stats. If max attempts are reached, trigger loss state. Otherwise, reset tray and increment row." }
    ],
    payload: {
      guessRow: ["Green", "Blue", "Yellow", "Pink", "Red"],
      targetSequence: ["Green", "Yellow", "Blue", "Orange", "Red"],
      currentAttempt: 0
    },
    responsePayload: {
      correctCount: 1,
      wrongPosCount: 2,
      rowFeedback: ["green", "none", "yellow", "none", "yellow"],
      gameStatus: "playing",
      nextAttempt: 1
    }
  },
  sharing: {
    title: "Wordle-style Clue Share Compiler",
    shortTitle: "Share",
    icon: <ShareIcon />,
    description: "Compiles board attempts histories into difficulty-adjusted clipboard formats.",
    steps: [
      { label: "Trigger Share", text: "Upon game completion (Won/Lost), user clicks 'Share Decryption' to export performance records." },
      { label: "Difficulty Switch", text: "Inspect active game settings. Easy mode routes to Grid Emoji parser; Hard and Insane modes route to Logs compilers." },
      { label: "Emoji Parsing", text: "For Easy Mode: Loop guess rows and write 5 emoji characters matching border evaluations: green => 🟩, yellow => 🟨, red/empty => 🟥." },
      { label: "Log Compiling", text: "For Hard Mode: Print attempt index numbers along with green circle (🟢) and yellow circle (🟡) counts. Insane mode adds padlock (🔒) indicators." },
      { label: "Clipboard Push", text: "Write formatted text string to navigator.clipboard. Dispatches a Glassmorphic ToastBanner notifier indicating copy success." }
    ],
    payload: {
      difficulty: "insane",
      gameStatus: "won",
      attemptsUsed: 4,
      targetFeedbackGrid: [
        [0, 2],
        [1, 1],
        [2, 3],
        [5, 0]
      ]
    },
    responsePayload: {
      clipboardData: "🎨 Color Cuddle (Insane) - 4 Attempts\nAttempt 1: 🔒 [0 🟢, 2 🟡]\nAttempt 2: 🔒 [1 🟢, 1 🟡]\nAttempt 3: 🔒 [2 🟢, 3 🟡]\nAttempt 4: 🔒 [5 🟢, 0 🟡] (SOLVED 🧠)\nPlay here: https://colorcuddle.sudipta.xyz/",
      toastAlert: "Decryption clues copied to clipboard!"
    }
  }
};

export const stateSchemas = {
  selectedColors: {
    description: "Chosen pool of 5 colors randomly picked from 8 core constants.",
    fields: [
      { name: "id", type: "String", isKey: "Key" },
      { name: "name", type: "String" },
      { name: "hex", type: "String (HEX Code)" },
      { name: "bgClass", type: "String (Tailwind CSS Color)" }
    ],
    relations: ["targetSequence", "availableColors"]
  },
  grid: {
    description: "Attempts matrix holding colors placed in active/historical slots.",
    fields: [
      { name: "grid[row][slot]", type: "Array<Array<Color | null>>", isKey: "Matrix" }
    ],
    relations: ["feedbackGrid", "flippedGrid"]
  },
  feedbackGrid: {
    description: "Evaluated indicators showing placement clues per grid slot.",
    fields: [
      { name: "feedbackGrid[row][slot]", type: "Array<Array<String>>", isKey: "Clue Map" }
    ],
    relations: ["grid", "targetSequence", "flippedGrid", "gameStatus"]
  },
  history: {
    description: "Terminal logs array printed stdout on attempt evaluations.",
    fields: [
      { name: "history[index]", type: "Array<String>", isKey: "Console logs" }
    ],
    relations: ["DiagnosticConsole"]
  },
  localStorage: {
    description: "Browser database caching user game scoring metrics.",
    fields: [
      { name: "easy.played", type: "Int", isKey: "Easy Mode" },
      { name: "easy.wins", type: "Int" },
      { name: "easy.currentStreak", type: "Int" },
      { name: "hard.played", type: "Int", isKey: "Hard Mode" },
      { name: "hard.wins", type: "Int" },
      { name: "hard.currentStreak", type: "Int" },
      { name: "insane.played", type: "Int", isKey: "Insane Mode" },
      { name: "insane.wins", type: "Int" },
      { name: "insane.currentStreak", type: "Int" }
    ],
    relations: ["StatsPanel", "gameStatus"]
  },
  targetSequence: {
    description: "The secret shuffled 5-color marble sequence that the player is trying to guess.",
    fields: [
      { name: "sequence[index]", type: "Array<Color>", isKey: "Secret" }
    ],
    relations: ["selectedColors", "feedbackGrid"]
  },
  flippedGrid: {
    description: "Grid matrix storing 3D rotation animation triggers for each slots.",
    fields: [
      { name: "flipped[row][slot]", type: "Array<Array<Boolean>>", isKey: "Anim" }
    ],
    relations: ["feedbackGrid"]
  },
  gameStatus: {
    description: "The active status of the game loop: playing, won, or lost.",
    fields: [
      { name: "status", type: "String", isKey: "State" },
      { name: "isRevealing", type: "Boolean" }
    ],
    relations: ["feedbackGrid", "localStorage"]
  }
};

export const snapshotsList = [
  { type: "desktop", src: "/screenshots/projects/colorcuddle/cc (1).webp", title: "Easy Mode Gameplay" },
  { type: "desktop", src: "/screenshots/projects/colorcuddle/cc (2).webp", title: "Hard Mode Console" },
  { type: "desktop", src: "/screenshots/projects/colorcuddle/cc (3).webp", title: "Insane Mode Board" },
  { type: "desktop", src: "/screenshots/projects/colorcuddle/cc (4).webp", title: "Victory Decryption Modal" },
  { type: "mobile", src: "/screenshots/projects/colorcuddle/cc (5).webp", title: "Mobile Console Dashboard" },
  { type: "mobile", src: "/screenshots/projects/colorcuddle/cc (6).webp", title: "Easy Mode Grid" },
  { type: "mobile", src: "/screenshots/projects/colorcuddle/cc (7).webp", title: "Hard Mode Logs" },
  { type: "mobile", src: "/screenshots/projects/colorcuddle/cc (8).webp", title: "Insane Mode Padlock Screen" },
  { type: "mobile", src: "/screenshots/projects/colorcuddle/cc (9).webp", title: "Solved Permutation Modal" },
  { type: "mobile", src: "/screenshots/projects/colorcuddle/cc (10).webp", title: "Tutorial Slide Guidelines" },
  { type: "mobile", src: "/screenshots/projects/colorcuddle/cc (11).webp", title: "Local Statistics Tracker" }
];
