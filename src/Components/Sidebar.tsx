import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { menuCategories, menuItems } from '../Services/MenuItems';
import { FiHome, FiChevronDown, FiSettings } from 'react-icons/fi';

export default function Sidebar() {
    const [expandedCategories, setExpandedCategories] = useState<string | null>(null);
    const { pathname } = useLocation();

    // Auto-open category for current tool
    useEffect(() => {
        if (pathname === '/') return; // Don't auto-expand for home

        // Find which category contains the current tool
        const currentTool = menuItems.find(t => `/${t.route}` === pathname);
        if (currentTool) {
            setExpandedCategories(currentTool.category);
        }
    }, [pathname]);

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev =>
            prev === category ? null : category
        );
    };

    const renderToolItem = (tool: typeof menuItems[number]) => {
        const to = `/${tool.route}`
        const active = pathname === to

        return (
            <Link
                key={tool.route}
                to={to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
                }`}
            >
                <tool.Icon className="w-4 h-4 shrink-0" />
                <span className="truncate flex-1">{tool.label}</span>
            </Link>
        )
    }

    return (
        <nav className="w-full h-full flex flex-col bg-slate-800 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
            {/* Home Link */}
            <div className="px-3 py-3 border-b border-slate-700">
                <Link
                    to="/"
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        pathname === '/'
                            ? 'bg-indigo-600 text-white shadow'
                            : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
                    }`}
                >
                    <span className="text-xl"><FiHome /></span>
                    <span className="truncate">Home</span>
                </Link>
            </div>

            {/* Recently Used Section */}

            {/* Categories */}
            <div className="px-3 py-4">
                {menuCategories.map(category => (
                    <div key={category.category} className="mb-2">
                        <button
                            onClick={() => toggleCategory(category.category)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:bg-slate-700/40 hover:text-white transition-all group"
                        >
                            <span className="flex items-center gap-2">
                                <category.icon className="w-4 h-4" />
                                {category.category}
                            </span>
                            <FiChevronDown className={`w-4 h-4 transition-transform ${expandedCategories === category.category ? '' : '-rotate-90'}`} />
                        </button>

                        {expandedCategories === category.category && (
                            <div className="space-y-1 mt-1 pl-2">
                                {category.tools.map(renderToolItem)}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Settings */}
            <div className="border-t border-slate-700 px-3 py-4">
                <Link
                    to="/settings"
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        pathname === '/settings'
                            ? 'bg-indigo-600 text-white shadow'
                            : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
                    }`}
                >
                    <FiSettings className="w-4 h-4 shrink-0" />
                    <span className="truncate flex-1">Settings</span>
                </Link>
            </div>
        </nav>
    )
}
