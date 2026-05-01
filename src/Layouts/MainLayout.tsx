import AppHeader from '../Components/AppHeader';
import Sidebar from '../Components/Sidebar';
import SearchModal from '../Components/SearchModal';
import { APP_CONFIG } from '../constant';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useAppDate } from "../Hooks/useAppDate";
import { FiHome, FiSettings } from 'react-icons/fi';
import { menuItems } from '../Services/MenuItems';
import SectionHeader from '../Components/SectionHeader';
import { PageData } from '../types';

export default function MainLayout() {
    const { appname, appversion } = useAppDate();
    const { pathname } = useLocation();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const homeDefault: PageData = useMemo(() => ({
        label: `${appname} v${appversion}`,
        Icon: FiHome,
        secondary: 'All your developer tools in one place'
    }), [appname, appversion]);

    const settingDefault: PageData = useMemo(() => ({
        label: `Settings`,
        Icon: FiSettings,
        secondary: 'Manage app behavior and system preferences'
    }), []);

    const [pageData, setPageData] = useState<PageData>(homeDefault);
    
    useEffect(() => {

        if (pathname === '/') {
            setPageData(homeDefault);
        } else if (pathname === '/settings') {
            setPageData(settingDefault);
        } else {
            const tool = menuItems.find(t => `/${t.route}` === pathname);
            if (tool) {
                setPageData(tool);
            }
        }
    }, [pathname, homeDefault, settingDefault, menuItems]);

    // Check if current page is a tool (not home or settings)
    const isToolPage = pathname !== '/' && pathname !== '/settings';
    const currentToolPath = isToolPage ? pathname : null;

    // Global search shortcut: Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchModalOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
            {/* Header - Fixed at top */}
            <div className="fixed top-0 left-0 right-0 z-50 h-12 bg-slate-900 border-b border-slate-700 shadow-md">
                <AppHeader onSearchOpen={() => setIsSearchModalOpen(true)} />
            </div>

            {/* Layout - Header offset */}
            <div className="flex flex-1 pt-12 overflow-hidden">
                {/* Sidebar - Full height left */}
                <div className="w-72 bg-slate-800 border-r border-slate-700 overflow-y-auto z-40">
                    <Sidebar />
                </div>

                {/* Main Content - Scrollable only */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50">
                    <div className="flex flex-col h-full">
                        <div className="flex-1">
                            <SectionHeader
                                title={pageData.label}
                                icon={<pageData.Icon />}
                                description={pageData.secondary}
                                actions={currentToolPath}
                            />
                            <Outlet />
                        </div>
                        <footer className="p-4 text-xs text-slate-400 text-center w-full border-t border-slate-200 bg-white flex-shrink-0">
                            <p>&copy; {new Date().getFullYear()} {APP_CONFIG.name} by <a href={APP_CONFIG.authorUrl} target="_blank" className='text-blue-600 hover:text-blue-700'>{APP_CONFIG.author}</a></p>
                        </footer>
                    </div>
                </main>
            </div>

            {/* Global Search Modal */}
            <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
            />
        </div>
    )
}
