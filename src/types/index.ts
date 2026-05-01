/**
 * Core application types
 */

/**
 * Represents a developer tool in the app
 */
export interface Tool {
  label: string;
  secondary: string;
  route: string;
  Icon: React.ComponentType<any>;
  category: string;
}

/**
 * Represents a category of tools
 */
export interface MenuCategory {
  category: string;
  description: string;
  icon: React.ComponentType<any>;
  items: Tool[];
}

/**
 * Page data for display in header
 */
export interface PageData {
  label: string;
  Icon: React.ComponentType<any>;
  secondary: string;
}

/**
 * Tool history entry
 */
export interface ToolHistory {
  path: string;
  timestamp: number;
}

/**
 * App information from Tauri
 */
export interface AppInfo {
  appname: string;
  appversion: string;
}
