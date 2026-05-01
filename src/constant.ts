/**
 * Application Configuration
 * Centralized constants and config values
 */

// App metadata
export const APP_CONFIG = {
  name: "Tauri Boilerplate",
  author: "Abdul Quadir",
  authorUrl: "https://abdulquadir.com",
  version: "0.0.0"
};

// Global Shortcuts
export const SHORTCUTS = {
  TOGGLE_WINDOW: "ctrl+shift+space",
  OPEN_SEARCH: "ctrl+k"
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOOL_HISTORY: "history",
  FAVORITES: "favorites"
};

// Debounce timings (in ms)
export const DEBOUNCE = {
  SHORTCUT: 300,
  SEARCH: 100
};

// UI Constants
export const UI = {
  SIDEBAR_WIDTH: 288, // 72 in Tailwind (288px)
  HEADER_HEIGHT: 48, // 12 in Tailwind (48px)
  MAX_RECENT_TOOLS: 10,
  MAX_SEARCH_RESULTS: 20
};

// Deprecated: Use APP_CONFIG instead
export const appdata = {
  appName: APP_CONFIG.name,
  author: APP_CONFIG.author
};