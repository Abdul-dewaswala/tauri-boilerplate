import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { useSearch } from '../Hooks/useSearch';
import { menuItems } from '../Services/MenuItems';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { query, setQuery, results, clearQuery } = useSearch(menuItems);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      clearQuery();
      setSelectedIndex(0);
    }
  }, [isOpen, clearQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (results.length || 1)) % (results.length || 1));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      const tool = results[selectedIndex];
      navigate(`/${tool.route}`);
      onClose();
    }
  };

  const handleSelectResult = (tool: typeof results[number]) => {
    navigate(`/${tool.route}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 pointer-events-none">
        <div
          className="w-full max-w-2xl mx-auto px-4 pointer-events-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            {/* Search Input */}
            <div className="relative px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <FiSearch className="w-5 h-5 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search routes by name, description, or category..."
                  className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                />
                {query && (
                  <button
                    onClick={() => {
                      clearQuery();
                      setSelectedIndex(0);
                    }}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                <ul className="py-2">
                  {results.map((tool, idx) => (
                    <li key={tool.route}>
                      <button
                        onClick={() => handleSelectResult(tool)}
                        className={`w-full px-4 py-3 text-left transition-colors flex items-start gap-3 ${
                          idx === selectedIndex
                            ? 'bg-indigo-50 dark:bg-indigo-900/30'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <div className="mt-0.5 text-lg text-slate-400">
                          <tool.Icon />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-900 dark:text-white">
                            {tool.label}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                            {tool.secondary}
                          </div>
                          <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                            {tool.category}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : query ? (
                <div className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                  No routes found matching "{query}"
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                  Start typing to search for routes...
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <div>
                {results.length > 0 && (
                  <span>
                    {selectedIndex + 1} of {results.length}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">Esc</kbd>
                <span>to close</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
