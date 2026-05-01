import { Link } from "react-router-dom";
import { menuCategories, menuItems } from "../Services/MenuItems";
import { useToolHistory } from "../Hooks/useToolHistory";
import { FiStar, FiClock, FiArrowRight } from 'react-icons/fi';
import { useState, useMemo } from "react";

export default function Home() {
  const { getRecentTools, toggleFavorite, isFavorite } = useToolHistory();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // useMemo ensures favorites and recents are recalculated when refreshTrigger changes
  const { favorites, recents } = useMemo(() => {
    const favList = menuItems.filter(t => isFavorite(`/${t.route}`));
    const recentList = getRecentTools()
      .map(path => menuItems.find(t => `/${t.route}` === path))
      .filter(Boolean)
      .slice(0, 4);
    return { favorites: favList, recents: recentList };
  }, [refreshTrigger, menuItems]);

  const ToolCard = ({ tool }: { tool: typeof menuItems[number] }) => {
    const path = `/${tool.route}`;
    const favorite = isFavorite(path);

    return (
      <Link
        to={path}
        className="group relative p-5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
      >
        <div className="flex items-start justify-between mb-3">
          <tool.Icon className="w-8 h-8 text-indigo-600 group-hover:scale-110 transition-transform" />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(path);
              setRefreshTrigger(prev => prev + 1);
            }}
            className={`p-1.5 rounded-lg transition-all ${
              favorite
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
            }`}
          >
            <FiStar className="w-4 h-4" fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <h3 className="font-semibold text-slate-900 mb-1">{tool.label}</h3>
        <p className="text-sm text-slate-600 mb-4">{tool.secondary}</p>
        <div className="flex items-center text-indigo-600 text-sm font-medium group-hover:gap-2 transition-all">
          Open <FiArrowRight className="w-4 h-4 ml-1" />
        </div>
      </Link>
    );
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Access Section */}
        <div className="mb-12">
          {favorites.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FiStar className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                <h2 className="text-xl font-bold text-slate-900">Favorite Tools</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {favorites.map(tool => (
                  <ToolCard key={tool.route} tool={tool} />
                ))}
              </div>
            </div>
          )}

          {recents.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FiClock className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">Recently Used</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recents.map(tool => tool && (
                  <ToolCard key={tool.route} tool={tool} />
                ))}
              </div>
            </div>
          )}

          {favorites.length === 0 && recents.length === 0 && (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-200 text-center mb-8">
              <p className="text-slate-700">Start by selecting a tool from the sidebar to get started!</p>
            </div>
          )}
        </div>

        {/* Categories Overview */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">All Tools by Category</h2>
          <div className="space-y-8">
            {menuCategories.map(category => (
              <div key={category.category}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-indigo-100">
                    <category.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{category.category}</h3>
                    <p className="text-sm text-slate-600">{category.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.tools.map(tool => (
                    <ToolCard key={tool.route} tool={tool} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Hint */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-center text-sm text-slate-600">
            💡 Click the star icon to add tools to your favorites for quick access
          </p>
        </div>
      </div>
    </>
  );
}