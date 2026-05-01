import { useState, useEffect } from 'react';
import { isEnabled, enable, disable } from '@tauri-apps/plugin-autostart';

export const useAutostart = () => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load autostart status on mount
  useEffect(() => {
    const loadStatus = async () => {
      try {
        const status = await isEnabled();
        setEnabled(status);
      } catch (error) {
        console.error('Failed to get autostart status:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStatus();
  }, []);

  const toggle = async (value: boolean) => {
    try {
      if (value) {
        await enable();
      } else {
        await disable();
      }
      setEnabled(value);
    } catch (error) {
      console.error('Failed to toggle autostart:', error);
    }
  };

  return { enabled, loading, toggle };
};
