import { Sidebar } from "@/components/layout/Sidebar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 pl-[var(--sidebar-width)] flex flex-col min-h-screen transition-all duration-300 ease-in-out">
                {children}
            </div>
        </div>
    );
}
