import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header({ title = "Dashboard", children }: { title?: string, children?: React.ReactNode }) {
    return (
        <header className="flex h-14 items-center justify-between border-b border-border-light bg-bg-content px-6 md:px-8">
            <div className="flex items-center gap-4">
                {/* Breadcrumb could go here */}
                <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
            </div>

            <div className="flex items-center gap-3">
                {children}
                <div className="h-6 w-px bg-border-light mx-1"></div>
                <button className="text-text-tertiary hover:text-text-primary">
                    <Bell className="h-4 w-4" />
                </button>
            </div>
        </header>
    );
}
