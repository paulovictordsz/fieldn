"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, X, File as FileIcon, Loader2 } from "lucide-react";

export function UploadModal({ projectId, children }: { projectId: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const router = useRouter();
    const supabase = createClient();

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleUpload = async () => {
        setUploading(true);
        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `${projectId}/${fileName}`;

                // 1. Upload to Storage
                const { error: uploadError } = await supabase.storage
                    .from('uploads')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                // 2. Insert record in DB
                const { error: dbError } = await supabase.from('files').insert({
                    project_id: projectId,
                    name: file.name,
                    storage_path: filePath,
                    media_type: file.type,
                    status: 'ready' // simplified for MVP, usually 'processing'
                });

                if (dbError) throw dbError;
            }

            setOpen(false);
            setFiles([]);
            router.refresh();
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Falha no upload. Tente novamente.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-bg-content text-text-primary">
                <DialogHeader>
                    <DialogTitle>Upload de Arquivos</DialogTitle>
                    <DialogDescription>
                        Selecione arquivos de áudio ou vídeo para transcrever.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {!files.length ? (
                        <div className="border-2 border-dashed border-border-light rounded-lg p-8 text-center hover:bg-bg-hover transition-colors">
                            <Upload className="h-8 w-8 mx-auto text-text-tertiary mb-3" />
                            <p className="text-sm text-text-secondary mb-2">
                                Arraste arquivos aqui ou clique para selecionar
                            </p>
                            <input
                                type="file"
                                multiple
                                accept="audio/*,video/*,application/pdf"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFileSelect}
                            />
                            <Button variant="secondary" size="sm" className="pointer-events-none">
                                Selecionar Arquivos
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {files.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 border border-border-light rounded bg-bg-secondary">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <FileIcon className="h-4 w-4 text-accent flex-shrink-0" />
                                        <span className="text-sm truncate">{file.name}</span>
                                    </div>
                                    <button onClick={() => setFiles(files.filter((_, i) => i !== idx))} className="text-text-tertiary hover:text-red-500">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            <div className="text-right">
                                <button onClick={() => setFiles([])} className="text-xs text-text-tertiary hover:underline">
                                    Limpar tudo
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button onClick={handleUpload} disabled={!files.length || uploading}>
                        {uploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            'Iniciar Upload'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
