import { createClient } from "@/lib/supabase-server";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Upload, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewProjectModal } from "@/components/features/NewProjectModal";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch workspaces (assuming user has one for now or taking the first)
  const { data: workspaces } = await supabase
    .from('workspaces')
    .select('*')
    .eq('owner_id', user.id)
    .limit(1);

  const workspaceId = workspaces?.[0]?.id;

  // Fetch projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('workspace_id', workspaceId) // only if workspace exists
    .order('updated_at', { ascending: false })
    .limit(10);

  const primaryName = user.user_metadata?.full_name?.split(' ')[0] || 'Usuário';

  return (
    <>
      <Header title={`Bom dia, ${primaryName}`}>
        <Button variant="secondary" size="sm" className="hidden sm:flex">
          <Upload className="mr-2 h-4 w-4" />
          Upload rápido
        </Button>
        <NewProjectModal>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </NewProjectModal>
      </Header>

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">

        {/* Recent Projects Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-text-primary">Projetos Recentes</h2>
            <Link href="/projects" className="text-xs font-medium text-accent hover:underline">
              Ver todos
            </Link>
          </div>

          {!projects || projects.length === 0 ? (
            <div className="p-8 border border-border-light border-dashed rounded-lg text-center bg-bg-secondary/50">
              <p className="text-sm text-text-secondary mb-3">Você ainda não tem projetos.</p>
              <NewProjectModal>
                <Button size="sm">Criar primeiro projeto</Button>
              </NewProjectModal>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {projects.map((project: any) => (
                <Link href={`/projects/${project.id}`} key={project.id} className="block group">
                  <Card className="h-full hover:border-accent/50 transition-colors cursor-pointer group-hover:shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="h-8 w-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs mb-3 uppercase">
                          {project.name.substring(0, 2)}
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-text-tertiary hover:text-text-primary">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                      <CardTitle className="group-hover:text-accent transition-colors line-clamp-1">{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-text-tertiary">
                        <span>
                          {new Date(project.updated_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                        </span>
                        <Badge variant={project.status === 'completed' ? 'success' : 'secondary'}>
                          {project.status === 'planning' ? 'Planejamento' :
                            project.status === 'in_progress' ? 'Em andamento' : project.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
