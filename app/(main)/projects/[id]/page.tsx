import { createClient } from "@/lib/supabase-server";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, MoreHorizontal, Search, Video, Mic, FileText, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { UploadModal } from "@/components/features/UploadModal";
import { notFound } from "next/navigation";

export default async function ProjectPage({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { tab?: string };
}) {
    const supabase = await createClient();
    const { id } = params;
    const activeTab = searchParams.tab || 'overview';

    // Fetch Project
    const { data: project, error } = await supabase
        .from('projects')
        .select('*, workspaces(name)')
        .eq('id', id)
        .single();

    if (error || !project) {
        notFound();
    }

    // Fetch Files
    const { data: files } = await supabase
        .from('files')
        .select('*')
        .eq('project_id', id)
        .order('created_at', { ascending: false });

    // Stats
    const fileCount = files?.length || 0;

    return (
        <>
            <Header title={project.name}>
                <div className="flex items-center gap-2">
                    <Badge variant={project.status === 'completed' ? 'success' : 'secondary'} className="h-6">
                        {project.status === 'planning' ? 'Planejamento' : 'Em andamento'}
                    </Badge>
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
                        <Link
                            key={tab}
                            href={`/projects/${id}?tab=${tab}`}
                            className={cn(
                                "py-3 text-[13px] font-medium border-b-2 transition-colors capitalize",
                                activeTab === tab
                                    ? "border-accent text-accent"
                                    : "border-transparent text-text-secondary hover:text-text-primary"
                            )}
                        >
                            {tab === 'data' ? 'Arquivos' : tab}
                        </Link>
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
                                {project.description || "Sem descrição."}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                                <div>
                                    <span className="text-xs text-text-tertiary block mb-1">Workspace</span>
                                    <span className="text-sm font-medium text-text-primary">{project.workspaces?.name}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-text-tertiary block mb-1">Criado em</span>
                                    <span className="text-sm font-medium text-text-primary">
                                        {new Date(project.created_at).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-sm font-semibold text-text-primary mb-4">Estatísticas</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-bg-content p-4 rounded-lg border border-border-light">
                                    <span className="text-2xl font-semibold text-text-primary block">{fileCount}</span>
                                    <span className="text-xs text-text-tertiary">Arquivos</span>
                                </div>
                                <div className="bg-bg-content p-4 rounded-lg border border-border-light">
                                    <span className="text-2xl font-semibold text-text-primary block">0</span>
                                    <span className="text-xs text-text-tertiary">Highlights</span>
                                </div>
                                <div className="bg-bg-content p-4 rounded-lg border border-border-light">
                                    <span className="text-2xl font-semibold text-text-primary block">0</span>
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

                            <UploadModal projectId={id}>
                                <Button size="sm">
                                    <Plus className="mr-2 h-3.5 w-3.5" />
                                    Upload
                                </Button>
                            </UploadModal>
                        </div>

                        <div className="bg-bg-content border border-border-light rounded-lg overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-border-light bg-bg-app/50">
                                        <th className="px-4 py-3 font-medium text-xs text-text-tertiary uppercase">Nome</th>
                                        <th className="px-4 py-3 font-medium text-xs text-text-tertiary uppercase w-32">Data</th>
                                        <th className="px-4 py-3 font-medium text-xs text-text-tertiary uppercase w-24">Tipo</th>
                                        <th className="px-4 py-3 font-medium text-xs text-text-tertiary uppercase w-24">Status</th>
                                        <th className="px-4 py-3 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light">
                                    {files && files.length > 0 ? files.map(file => (
                                        <Link key={file.id} href={`/projects/${id}/files/${file.id}`} legacyBehavior>
                                            <tr className="hover:bg-bg-hover transition-colors cursor-pointer group">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                                            {file.media_type?.includes('video') ? <Video className="h-4 w-4" /> :
                                                                file.media_type?.includes('audio') ? <Mic className="h-4 w-4" /> :
                                                                    <FileText className="h-4 w-4" />}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-text-primary text-[13px]">{file.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-[13px] text-text-secondary">
                                                    {new Date(file.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3 text-[13px] text-text-secondary w-24 truncate">
                                                    {file.media_type?.split('/')[1] || 'File'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="success" className="font-normal">{file.status}</Badge>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                                                        <MoreHorizontal className="h-3.5 w-3.5" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        </Link>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-text-tertiary text-sm">
                                                Nenhum arquivo encontrado. Faça upload para começar.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
