"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { createProject } from "@/app/actions"
import { Plus } from "lucide-react"

// Create a simple Dialog component wrapper since we might not have the full shadcn stack installed perfectly yet
// But wait, user said "do what is needed". I will assume I need to manually implement the Dialog pieces if we don't have them.
// Actually, earlier I didn't install @radix-ui/react-dialog. I should do that.

export function NewProjectModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function onSubmit(formData: FormData) {
        setLoading(true)
        try {
            await createProject(formData)
            setOpen(false)
        } catch (error) {
            console.error(error)
            alert("Erro ao criar projeto")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-text-primary">
                <DialogHeader>
                    <DialogTitle>Novo Projeto</DialogTitle>
                    <DialogDescription>
                        Crie um espaço para organizar suas entrevistas e insights.
                    </DialogDescription>
                </DialogHeader>
                <form action={onSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Nome do projeto
                        </label>
                        <input
                            id="name"
                            name="name"
                            required
                            className="flex h-9 w-full rounded-md border border-border-light px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                            placeholder="Ex: Pesquisa de Usabilidade"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="description" className="text-sm font-medium">
                            Descrição
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="flex min-h-[80px] w-full rounded-md border border-border-light px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                            placeholder="Qual o objetivo desta pesquisa?"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Criando..." : "Criar Projeto"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
