"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, SkipBack, SkipForward, Settings, Download, Highlighter, Tag, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock transcript data
const transcript = [
    { id: 1, speaker: "Entrevistador", time: "00:15", text: "Você poderia descrever como foi a sua experiência com a nova barra lateral?" },
    { id: 2, speaker: "Usuário", time: "00:23", text: "Ah, claro. Honestamente? Eu achei muito mais limpo do que a versão anterior. Antes tinha muita coisa poluindo a tela.", highlight: "positive" },
    { id: 3, speaker: "Entrevistador", time: "00:45", text: "Entendi. E teve algo que você sentiu falta?" },
    { id: 4, speaker: "Usuário", time: "00:52", text: "Sim, demorei um pouco para achar onde ficavam as configurações. Eu estava procurando no topo direito, mas agora está embaixo na sidebar.", highlight: "friction" },
    { id: 5, speaker: "Entrevistador", time: "01:10", text: "Interessante. Você costuma acessar muito as configurações?" },
    { id: 6, speaker: "Usuário", time: "01:15", text: "Não muito, mas quando preciso, quero achar rápido. Mas no geral, a organização das pastas ficou excelente." },
];

export default function FilePage({ params }: { params: { id: string, fileId: string } }) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header title="Entrevista com Usuário 1">
                <Badge variant="outline" className="mr-2">Video</Badge>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </Header>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

                {/* Left: Player Area */}
                <div className="flex-1 lg:flex-[1.2] bg-black flex flex-col relative group">
                    {/* Main Video Area (Placeholder) */}
                    <div className="flex-1 flex items-center justify-center bg-zinc-900">
                        <div className="text-zinc-500 flex flex-col items-center gap-4">
                            <div className="h-16 w-16 rounded-full border-2 border-zinc-700 flex items-center justify-center">
                                <Play className="h-6 w-6 ml-1 text-zinc-300" />
                            </div>
                            <span className="text-sm font-medium">Video Player Placeholder</span>
                        </div>
                    </div>

                    {/* Player Controls (Overlay on Hover or Always visible for now) */}
                    <div className="bg-zinc-900 border-t border-zinc-800 p-4">
                        <div className="w-full h-1 bg-zinc-700 rounded-full mb-4 cursor-pointer relative overflow-hidden group/timeline">
                            <div className="absolute top-0 left-0 h-full w-[30%] bg-accent"></div>
                            {/* Markers */}
                            <div className="absolute top-0 left-[23%] h-full w-1 bg-yellow-400"></div>
                            <div className="absolute top-0 left-[52%] h-full w-1 bg-red-400"></div>
                        </div>

                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                                <span>00:52</span>
                                <span className="text-zinc-600">/</span>
                                <span>32:15</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="hover:text-accent transition-colors"><SkipBack className="h-5 w-5" /></button>
                                <button className="h-10 w-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                                    <Play className="h-5 w-5 ml-1" />
                                </button>
                                <button className="hover:text-accent transition-colors"><SkipForward className="h-5 w-5" /></button>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="text-zinc-400 hover:text-white font-medium text-xs">1x</button>
                                <button className="text-zinc-400 hover:text-white"><Settings className="h-4 w-4" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Transcript */}
                <div className="flex-1 lg:flex-[0.8] bg-bg-app border-l border-border-light flex flex-col min-w-[320px]">
                    {/* Toolbar */}
                    <div className="h-12 border-b border-border-light flex items-center justify-between px-4 bg-bg-content">
                        <div className="relative">
                            <Search className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-tertiary" />
                            <input
                                placeholder="Buscar no texto..."
                                className="pl-8 h-8 text-xs bg-transparent focus:outline-none w-48 text-text-primary placeholder:text-text-tertiary"
                            />
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-secondary">
                                <Highlighter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-secondary">
                                <Tag className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                        {transcript.map((block) => (
                            <div key={block.id} className="group relative pl-4 border-l-2 border-transparent hover:border-border-medium transition-colors">
                                <div className="flex items-baseline justify-between mb-1">
                                    <span className="text-[11px] font-bold text-text-primary uppercase tracking-wide">{block.speaker}</span>
                                    <span className="text-[10px] font-mono text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-accent hover:underline">{block.time}</span>
                                </div>
                                <p className={cn(
                                    "text-[14px] leading-relaxed text-text-secondary group-hover:text-text-primary transition-colors",
                                    block.highlight === 'positive' && "bg-green-100 text-green-900 px-1 -mx-1 rounded",
                                    block.highlight === 'friction' && "bg-red-100 text-red-900 px-1 -mx-1 rounded"
                                )}>
                                    {block.text}
                                </p>

                                {/* Highlight Actions Tooltip (simulated) */}
                                {/* Would appear on selection */}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
