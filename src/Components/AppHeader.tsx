import { FiMinus, FiSquare, FiX, FiCopy, FiSearch } from "react-icons/fi";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { useAppDate } from "../Hooks/useAppDate";
import styles from "./AppHeader.module.css";

interface AppHeaderProps {
  onSearchOpen?: () => void;
}

const AppHeader = ({ onSearchOpen }: AppHeaderProps) => {
  const { appname, appversion } = useAppDate();
  const appWindow = getCurrentWindow();
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    let unlistenFn: (() => void) | null = null;

    const setupMaximizeListener = async () => {
      try {
        // Get initial maximize state
        const maximized = await appWindow.isMaximized();
        setIsMaximized(maximized);

        // Listen for resize events to update maximize state
        const unlisten = await appWindow.onResized(async () => {
          const isMax = await appWindow.isMaximized();
          setIsMaximized(isMax);
        });

        unlistenFn = unlisten;
      } catch (error) {
        console.error('Failed to setup maximize listener:', error);
      }
    };

    setupMaximizeListener();

    return () => {
      if (unlistenFn) {
        unlistenFn();
      }
    };
  }, [appWindow]);

  return (
    <div
      data-tauri-drag-region
      className={`${styles.headerContainer} flex items-center justify-between bg-slate-900 text-white px-4 py-1 h-12 gap-4 border-b border-slate-700`}
    >
      {/* Left - Title Section (Draggable) */}
      <div className={`${styles.titleSection} font-semibold text-sm truncate flex items-center flex-shrink-0 text-slate-100`}>
        <img
          src="/tauri-boilerplate.png"
          className={`${styles.logo} h-7 mr-2`}
          alt="logo"
        />
        <span className={styles.appName}>{appname} v{appversion}</span>
      </div>

      {/* Center - Draggable spacer + Search Bar + Draggable spacer */}
      <div className="flex-1 flex items-center justify-center gap-4">
        {/* Left draggable spacer */}
        <div className={`${styles.headerContainer} flex-1`} />

        {/* Search Bar (Non-Draggable) */}
        <div className={`${styles.searchContainer} flex items-center`}>
          <button
            onClick={onSearchOpen}
            className={`${styles.searchButton} flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition text-xs text-slate-400 hover:text-slate-300 whitespace-nowrap`}
            title="Search (Ctrl+S)"
          >
            <FiSearch size={14} />
            <span className="hidden sm:inline">Search...</span>
            <kbd className={`${styles.kbdShortcut} px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 text-xs font-semibold`}>
              Ctrl+S
            </kbd>
          </button>
        </div>

        {/* Right draggable spacer */}
        <div className={`${styles.headerContainer} flex-1`} />
      </div>

      {/* Right - Window Controls (Non-Draggable) */}
      <div className={`${styles.controlsContainer} flex gap-2 items-center flex-shrink-0`}>
        <button
          onClick={() => appWindow.minimize()}
          className={`${styles.controlButton} p-1.5 hover:bg-slate-800 rounded transition text-slate-400 hover:text-slate-100`}
          title="Minimize"
        >
          <FiMinus size={14} />
        </button>

        <button
          onClick={() => appWindow.toggleMaximize()}
          className={`${styles.controlButton} p-1.5 hover:bg-slate-800 rounded transition text-slate-400 hover:text-slate-100`}
          title="Maximize"
        >
          {isMaximized ? <FiCopy size={14} /> : <FiSquare size={14} />}
        </button>

        <button
          onClick={() => appWindow.close()}
          className={`${styles.controlButton} p-1.5 hover:bg-red-600 rounded transition text-slate-400 hover:text-slate-100`}
          title="Close"
        >
          <FiX size={14} />
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
