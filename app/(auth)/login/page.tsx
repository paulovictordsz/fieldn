"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-app p-4">
            <Card className="w-full max-w-md bg-bg-content border-border-light shadow-sm">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-8 w-8 rounded bg-accent"></div>
                    </div>
                    <CardTitle className="text-xl font-semibold">Entrar no Lumio</CardTitle>
                    <p className="text-sm text-text-secondary">
                        Digite seu email e senha para acessar
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="p-3 text-xs text-red-600 bg-red-50 rounded-md border border-red-100">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-text-secondary" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-9 rounded-md border border-border-light px-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                                placeholder="nome@exemplo.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-text-secondary" htmlFor="password">Senha</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-9 rounded-md border border-border-light px-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Entrando...' : 'Entrar'}
                        </Button>

                        <div className="text-center text-xs text-text-secondary pt-2">
                            Não tem uma conta?{' '}
                            <Link href="/signup" className="text-accent hover:underline">
                                Criar conta
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
