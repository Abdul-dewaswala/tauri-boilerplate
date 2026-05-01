import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'history';
const FAVORITES_KEY = 'favorites';
const MAX_HISTORY = 10;

interface ToolHistory {
  path: string;
  timestamp: number;
}

export const useToolHistory = () => {
  const [history, setHistory] = useState<ToolHistory[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      }
    } catch (error) {
      console.error('Failed to load tool history:', error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save tool history:', error);
    }
  }, [history]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favorites]);

  const addToHistory = useCallback((path: string) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.path !== path);
      const newHistory = [{ path, timestamp: Date.now() }, ...filtered].slice(0, MAX_HISTORY);
      return newHistory;
    });
  }, []);

  const getRecentTools = useCallback(() => {
    return history.map(item => item.path);
  }, [history]);

  const isFavorite = useCallback((path: string) => {
    return favorites.has(path);
  }, [favorites]);

  const toggleFavorite = useCallback((path: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(path)) {
        newFavorites.delete(path);
      } else {
        newFavorites.add(path);
      }
      return newFavorites;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const removeFavorite = useCallback((path: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      newFavorites.delete(path);
      return newFavorites;
    });
  }, []);

  return {
    history,
    favorites: Array.from(favorites),
    getRecentTools,
    addToHistory,
    isFavorite,
    toggleFavorite,
    clearHistory,
    removeFavorite
  };
};
