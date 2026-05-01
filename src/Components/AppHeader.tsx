import { FiMinus, FiSquare, FiX, FiCopy, FiSearch } from "react-icons/fi";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { useAppDate } from "../Hooks/useAppDate";

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
      className="flex items-center justify-between bg-slate-900 text-white px-4 py-1 select-none h-12 gap-4 border-b border-slate-700"
    >
      {/* Left - Title */}
      <div className="font-semibold text-sm truncate flex items-center flex-shrink-0 text-slate-100">
        <img src="/32X32.png" className="h-7 mr-2" alt="logo" />
        <span>{appname} v{appversion}</span>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 flex items-center justify-center">
        <button
          onClick={onSearchOpen}
          className="w-full max-w-xs flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition text-xs text-slate-400 hover:text-slate-300"
          title="Search (Ctrl+K)"
        >
          <FiSearch size={14} />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 text-xs font-semibold">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right - Window Controls */}
      <div className="flex gap-2 items-center flex-shrink-0">
        <button
          onClick={() => appWindow.minimize()}
          className="p-1.5 hover:bg-slate-800 rounded transition text-slate-400 hover:text-slate-100"
          title="Minimize"
        >
          <FiMinus size={14} />
        </button>

        <button
          onClick={() => appWindow.toggleMaximize()}
          className="p-1.5 hover:bg-slate-800 rounded transition text-slate-400 hover:text-slate-100"
          title="Maximize"
        >
          {isMaximized ? <FiCopy size={14} /> : <FiSquare size={14} />}
        </button>

        <button
          onClick={() => appWindow.close()}
          className="p-1.5 hover:bg-red-600 rounded transition text-slate-400 hover:text-slate-100"
          title="Close"
        >
          <FiX size={14} />
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
