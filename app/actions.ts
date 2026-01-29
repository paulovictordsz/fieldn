'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const description = formData.get('description') as string

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Not authenticated')
    }

    // Get workspace (simplification: get first owned workspace)
    const { data: workspaces } = await supabase
        .from('workspaces')
        .select('id')
        .eq('owner_id', user.id)
        .limit(1)

    if (!workspaces || workspaces.length === 0) {
        // Create a workspace if none exists (fallback)
        const { data: newWs, error: wsError } = await supabase.from('workspaces').insert({
            name: 'Meu Workspace',
            owner_id: user.id
        }).select().single();

        if (wsError) throw new Error('Failed to create workspace');

        const { error } = await supabase.from('projects').insert({
            name,
            description,
            workspace_id: newWs.id,
            status: 'planning'
        })
        if (error) throw new Error('Failed to create project')

    } else {
        const workspaceId = workspaces[0].id
        const { error } = await supabase.from('projects').insert({
            name,
            description,
            workspace_id: workspaceId,
            status: 'planning'
        })

        if (error) {
            console.error(error)
            throw new Error('Failed to create project')
        }
    }

    revalidatePath('/')
    revalidatePath('/projects')
    return { success: true }
}
