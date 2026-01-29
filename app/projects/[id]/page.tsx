"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, MoreHorizontal, FileText, Video, Mic, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Tabs
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ProjectPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <>
            <Header title="Pesquisa de Usabilidade 2024">
                <div className="flex items-center gap-2">
                    <Badge variant="success" className="h-6">Em andamento</Badge>
                    <div className="h-6 w-px bg-border-light mx-2"></div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </Header>

            <div className="border-b border-border-light bg-bg-content px-6 md:px-8">
                <div className="flex gap-6">
                    {['overview', 'data', 'tags', 'insights'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "py-3 text-[13px] font-medium border-b-2 transition-colors capitalize",
                                activeTab === tab
                                    ? "border-accent text-accent"
                                    : "border-transparent text-text-secondary hover:text-text-primary"
                            )}
                        >
                            {tab === 'data' ? 'Arquivos' : tab}
                        </button>
                    ))}
                </div>
            </div>

            <main className="flex-1 p-6 md:p-8 bg-bg-app overflow-y-auto">

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="max-w-4xl space-y-8">
                        <section className="bg-bg-content p-6 rounded-lg border border-border-light">
                            <h3 className="text-sm font-semibold text-text-primary mb-2">Sobre este projeto</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                Este projeto visa entender os padrões de navegação dos usuários em telas largas (desktop), focado na nova sidebar.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                                <div>
                                    <span className="text-xs text-text-tertiary block mb-1">Metodologia</span>
                                    <span className="text-sm font-medium text-text-primary">Entrevistas Quali</span>
                                </div>
                                <div>
                                    <span className="text-xs text-text-tertiary block mb-1">Período</span>
                                    <span className="text-sm font-medium text-text-primary">Jan 2024 - Fev 2024</span>
                                </div>
                                <div>
                                    <span className="text-xs text-text-tertiary block mb-1">Responsável</span>
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-700">PA</div>
                                        <span className="text-sm font-medium text-text-primary">Paulo</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-sm font-semibold text-text-primary mb-4">Estatísticas</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-bg-content p-4 rounded-lg border border-border-light">
                                    <span className="text-2xl font-semibold text-text-primary block">12</span>
                                    <span className="text-xs text-text-tertiary">Arquivos</span>
                                </div>
                                <div className="bg-bg-content p-4 rounded-lg border border-border-light">
                                    <span className="text-2xl font-semibold text-text-primary block">48</span>
                                    <span className="text-xs text-text-tertiary">Highlights</span>
                                </div>
                                <div className="bg-bg-content p-4 rounded-lg border border-border-light">
                                    <span className="text-2xl font-semibold text-text-primary block">5</span>
                                    <span className="text-xs text-text-tertiary">Insights</span>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* Data Tab */}
                {activeTab === 'data' && (
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                            <div className="relative w-64">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
                                <input type="text" placeholder="Buscar arquivos..." className="w-full h-8 pl-8 pr-3 text-xs border border-border-light rounded-md focus:outline-none focus:ring-1 focus:ring-accent" />
                            </div>
                            <Button size="sm">
                                <Plus className="mr-2 h-3.5 w-3.5" />
                                Upload
                            </Button>
                        </div>

                        <div className="bg-bg-content border border-border-light rounded-lg overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-border-light bg-bg-app/50">
                                        <th className="px-4 py-3 font-medium text-xs text-text-tertiary uppercase">Nome</th>
                                        <th className="px-4 py-3 font-medium text-xs text-text-tertiary uppercase w-32">Data</th>
                                        <th className="px-4 py-3 font-medium text-xs text-text-tertiary uppercase w-24">Duração</th>
                                        <th className="px-4 py-3 font-medium text-xs text-text-tertiary uppercase w-24">Status</th>
                                        <th className="px-4 py-3 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light">
                                    {[1, 2, 3, 4].map(i => (
                                        <tr key={i} className="hover:bg-bg-hover transition-colors cursor-pointer group">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                                        {i % 2 === 0 ? <Video className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-text-primary text-[13px]">Entrevista com Usuário {i}</p>
                                                        <p className="text-[11px] text-text-tertiary">video_recording_{i}.mp4</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-[13px] text-text-secondary">28 Jan, 2024</td>
                                            <td className="px-4 py-3 text-[13px] text-text-secondary">32:15</td>
                                            <td className="px-4 py-3">
                                                <Badge variant="success" className="font-normal">Processado</Badge>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
