import { useEffect, useRef } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { SHORTCUTS, DEBOUNCE } from '../constant';

export const useGlobalShortcut = () => {
  const lastInvokeTimeRef = useRef<number>(0);

  useEffect(() => {
    let unregisterFn: (() => Promise<void>) | null = null;

    const registerShortcut = async () => {
      try {
        const { register, unregister } = await import('@tauri-apps/plugin-global-shortcut');

        // Register Ctrl+Shift+Space to toggle window visibility with debounce
        await register(SHORTCUTS.TOGGLE_WINDOW, async () => {
          const now = Date.now();
          // Only invoke if enough time has passed since last invocation
          if (now - lastInvokeTimeRef.current >= DEBOUNCE.SHORTCUT) {
            lastInvokeTimeRef.current = now;
            try {
              await invoke('toggle_window_visibility');
            } catch (error) {
              console.error('Failed to toggle window visibility:', error);
            }
          }
        });

        unregisterFn = () => unregister(SHORTCUTS.TOGGLE_WINDOW);
      } catch (error) {
        console.error('Failed to register global shortcut:', error);
      }
    };

    registerShortcut();

    // Cleanup on unmount
    return () => {
      if (unregisterFn) {
        unregisterFn().catch(console.error);
      }
    };
  }, []);
};
