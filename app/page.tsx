import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Upload, Clock, FileText, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <Header title="Bom dia, Paulo">
        <Button variant="secondary" size="sm" className="hidden sm:flex">
          <Upload className="mr-2 h-4 w-4" />
          Upload rápido
        </Button>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Novo Projeto
        </Button>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="group cursor-pointer hover:border-accent/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="h-8 w-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs mb-3">
                      P{i}
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-text-tertiary hover:text-text-primary">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                  <CardTitle className="group-hover:text-accent transition-colors">Pesquisa de Usabilidade 2024</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-text-tertiary">
                    <span>Atualizado há 2h</span>
                    <Badge variant="success">Em andamento</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Recent Insights */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-semibold text-text-primary">Insights Recentes</h2>
              <Link href="/insights" className="text-xs font-medium text-accent hover:underline">
                Ver todos
              </Link>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="hover:bg-bg-hover/50 transition-colors border-transparent shadow-none bg-transparent hover:border-border-light">
                  <div className="flex items-start gap-4 p-3 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-purple-50 flex-shrink-0 flex items-center justify-center text-purple-600">
                      <LightbulbIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-medium text-text-primary truncate">
                        Usuários preferem a navegação lateral em telas largas
                      </h4>
                      <p className="text-[12px] text-text-secondary mt-1 line-clamp-2">
                        Durante os testes A/B, 80% dos participantes mencionaram que a sidebar fixa facilita o acesso rápido às ferramentas principais...
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-[10px]">UX</Badge>
                        <Badge variant="secondary" className="text-[10px]">Desktop</Badge>
                        <span className="text-[10px] text-text-tertiary ml-auto">Ontem por Bia</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Activity Timeline */}
          <section>
            <h2 className="text-[15px] font-semibold text-text-primary mb-4">Atividade</h2>
            <div className="border-l border-border-light ml-2 space-y-6 pl-6 py-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-border-light"></div>
                  <p className="text-[13px] text-text-primary">
                    <span className="font-medium">Paulo</span> adicionou 3 arquivos ao projeto <span className="font-medium">App Mobile</span>
                  </p>
                  <p className="text-[11px] text-text-tertiary mt-0.5">há 15 min</p>
                </div>
              ))}
            </div>
          </section>

        </div>

      </main>
    </>
  );
}

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5 0-3-2.5-5.5-5.5-5.5S7 5 7 8c0 1.5.5 2.5 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}
