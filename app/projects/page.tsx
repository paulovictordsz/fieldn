import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Folder, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
    return (
        <>
            <Header title="Projetos">
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Projeto
                </Button>
            </Header>

            <main className="flex-1 flex overflow-hidden">
                {/* Sidebar for folders could go here, omitting for MVP simplicity or strictly following visualguide which mentions tree view */}
                <aside className="w-56 border-r border-border-light bg-bg-app flex-shrink-0 hidden md:block p-4">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <span className="text-xs font-semibold text-text-tertiary uppercase">Pastas</span>
                        <Plus className="h-3 w-3 text-text-tertiary cursor-pointer hover:text-text-primary" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 px-2 py-1.5 bg-bg-active text-accent rounded-md text-[13px] font-medium">
                            <Folder className="h-4 w-4" />
                            Todos os projetos
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-text-secondary hover:bg-bg-hover rounded-md text-[13px] font-medium cursor-pointer">
                            <Folder className="h-4 w-4" />
                            Marketing
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-text-secondary hover:bg-bg-hover rounded-md text-[13px] font-medium cursor-pointer">
                            <Folder className="h-4 w-4" />
                            Produto
                        </div>
                    </div>
                </aside>

                <div className="flex-1 flex flex-col min-w-0 bg-bg-app">
                    {/* Toolbar */}
                    <div className="px-6 py-4 flex items-center gap-3 border-b border-border-light bg-bg-content">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                            <input
                                type="text"
                                placeholder="Buscar projetos..."
                                className="w-full h-8 pl-9 pr-4 rounded-md border border-border-light bg-bg-input text-sm focus:outline-none focus:border-border-medium focus:ring-1 focus:ring-accent"
                            />
                        </div>
                        <Button variant="secondary" size="sm" className="h-8">
                            <Filter className="mr-2 h-3.5 w-3.5" />
                            Filtros
                        </Button>
                    </div>

                    {/* Grid */}
                    <div className="p-6 overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Link href={`/projects/${i}`} key={i} className="block group">
                                    <Card className="h-full hover:border-accent/50 transition-colors">
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start">
                                                <div className="h-8 w-8 rounded bg-bg-tertiary text-text-secondary group-hover:bg-accent group-hover:text-white transition-colors flex items-center justify-center font-bold text-xs mb-3">
                                                    P{i}
                                                </div>
                                                <MoreHorizontal className="h-4 w-4 text-text-tertiary opacity-0 group-hover:opacity-100" />
                                            </div>
                                            <CardTitle className="group-hover:text-accent transition-colors">Projeto de Pesquisa {i}</CardTitle>
                                            <p className="text-[12px] text-text-secondary mt-1 line-clamp-2 leading-relaxed">
                                                Uma breve descrição sobre o projeto para dar contexto na lista.
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge variant="outline" className="text-[10px] text-text-tertiary font-normal">0 insights</Badge>
                                                <span className="text-[10px] text-text-tertiary ml-auto">2 dias atrás</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
