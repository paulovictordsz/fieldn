"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Folder,
    Lightbulb,
    Trash2,
    Settings,
    Search,
    LogOut,
    ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Folder, label: 'Projetos', href: '/projects' },
        { icon: Lightbulb, label: 'Insights', href: '/insights' },
        { icon: Trash2, label: 'Lixeira', href: '/trash' },
    ];

    return (
        <aside className="fixed inset-y-0 left-0 z-50 flex w-[var(--sidebar-width)] flex-col border-r border-border-light bg-bg-sidebar text-text-primary">
            {/* Logo */}
            <div className="flex h-14 items-center px-4 border-b border-border-light/50">
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-accent"></div>
                    <span className="text-sm font-semibold text-text-primary">Lumio</span>
                </div>
            </div>

            {/* Global Search Trigger */}
            <div className="px-3 py-3">
                <button className="flex w-full items-center gap-2 rounded-md border border-border-light bg-bg-app px-2 py-1.5 text-xs text-text-tertiary hover:border-border-medium">
                    <Search className="h-3.5 w-3.5" />
                    <span>Buscar...</span>
                    <span className="ml-auto text-[10px] opacity-70">Cmd+K</span>
                </button>
            </div>

            {/* Main Nav */}
            <nav className="flex-1 space-y-0.5 px-2 overflow-y-auto scrollbar-thin">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors",
                                isActive
                                    ? "bg-bg-active text-accent"
                                    : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", isActive ? "text-accent" : "text-text-secondary")} />
                            {item.label}
                        </Link>
                    );
                })}

                <div className="my-2 border-t border-border-light mx-2"></div>

                <Link
                    href="/settings"
                    className={cn(
                        "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors text-text-secondary hover:bg-bg-hover hover:text-text-primary"
                    )}
                >
                    <Settings className="h-4 w-4 text-text-secondary" />
                    Configurações
                </Link>
            </nav>

            {/* User Footer */}
            <div className="border-t border-border-light p-3">
                <div className="flex items-center gap-2.5 hover:bg-bg-hover p-1.5 rounded-md cursor-pointer transition-colors">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                        PA
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="truncate text-[13px] font-medium text-text-primary">Paulo</p>
                        <p className="truncate text-[11px] text-text-tertiary">paulo@fieldn.com</p>
                    </div>
                    <LogOut className="h-3.5 w-3.5 text-text-tertiary" />
                </div>
            </div>
        </aside>
    );
}
