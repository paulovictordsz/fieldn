import { createClient } from "@/lib/supabase-server";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, SkipBack, SkipForward, Settings, Download, Highlighter, Tag, Search, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { notFound } from "next/navigation";

export default async function FilePage({ params }: { params: { id: string, fileId: string } }) {
    const supabase = await createClient();
    const { id: projectId, fileId } = params;

    // 1. Fetch File Record
    const { data: file, error } = await supabase
        .from('files')
        .select('*')
        .eq('id', fileId)
        .single();

    if (error || !file) {
        notFound();
    }

    // 2. Get Signed URL for media
    const { data: signedUrlData } = await supabase
        .storage
        .from('uploads')
        .createSignedUrl(file.storage_path, 3600 * 2); // 2 hours expiry

    const mediaUrl = signedUrlData?.signedUrl;

    // 3. Mock Transcript (since we don't have real AI yet)
    // In a real app, this comes from file.transcript_json
    const transcript = file.transcript_json || [
        { id: 0, speaker: "System", time: "00:00", text: "Transcrição pendente. Em breve você verá o texto aqui.", highlight: null }
    ];

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-bg-app">
            <Header title={file.name}>
                <div className="flex items-center gap-2 mr-auto ml-2">
                    <Link href={`/projects/${projectId}?tab=data`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <Badge variant="outline" className="mr-2 uppercase">{file.media_type?.split('/')[0]}</Badge>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </Header>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

                {/* Left: Player Area */}
                <div className="flex-1 lg:flex-[1.2] bg-black flex flex-col relative group items-center justify-center">
                    {mediaUrl ? (
                        // Native Video Element for MVP
                        // In production we would use a library like React Player for better controls
                        <video
                            src={mediaUrl}
                            controls
                            className="max-h-full max-w-full w-full h-auto"
                            poster="" // Could generate a thumbnail later
                        >
                            Seu navegador não suporta a tag de vídeo.
                        </video>
                    ) : (
                        <div className="text-white flex flex-col items-center">
                            <Loader2 className="h-8 w-8 animate-spin mb-2" />
                            <p>Carregando mídia...</p>
                        </div>
                    )}
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
                        {transcript.map((block: any, idx: number) => (
                            <div key={idx} className="group relative pl-4 border-l-2 border-transparent hover:border-border-medium transition-colors">
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
