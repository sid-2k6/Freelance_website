import { supabase, isSupabaseConfigured } from './supabaseClient';
import { generateProjectId } from '../utils/helpers';
import {
  demoProjects,
  demoMessages,
  demoUpdates,
  demoNotifications,
} from '../data/demoData';

/**
 * Data access layer. Every function gracefully falls back to in-memory demo
 * data when Supabase credentials are not configured, so the app is fully
 * functional in preview mode and switches to the real database automatically
 * once environment variables are present.
 */

// ----------------------------- Service Requests / Projects -----------------

export async function createServiceRequest(payload) {
  const projectId = generateProjectId();
  const record = {
    ...payload,
    project_id: projectId,
    status: 'Pending',
    progress: 0,
    priority: payload.priority || 'Medium',
    invoice_status: 'Unpaid',
  };

  if (!isSupabaseConfigured) {
    // Persist to localStorage so the visitor can track it in demo mode.
    const existing = JSON.parse(localStorage.getItem('technova-demo-requests') || '[]');
    const demoRecord = { ...record, id: `local-${Date.now()}`, created_at: new Date().toISOString() };
    localStorage.setItem('technova-demo-requests', JSON.stringify([demoRecord, ...existing]));
    return { data: demoRecord, error: null, projectId };
  }

  const { data, error } = await supabase.from('projects').insert(record).select().single();
  return { data, error, projectId: data?.project_id || projectId };
}

export async function getProjects() {
  if (!isSupabaseConfigured) {
    const local = JSON.parse(localStorage.getItem('technova-demo-requests') || '[]');
    return { data: [...local, ...demoProjects], error: null };
  }
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data || [], error };
}

export async function trackProject(email, projectId) {
  const normalizedId = String(projectId).trim().toUpperCase();
  const normalizedEmail = String(email).trim().toLowerCase();

  if (!isSupabaseConfigured) {
    const local = JSON.parse(localStorage.getItem('technova-demo-requests') || '[]');
    const all = [...local, ...demoProjects];
    const found = all.find(
      (p) =>
        p.project_id?.toUpperCase() === normalizedId &&
        p.email?.toLowerCase() === normalizedEmail
    );
    if (!found) return { data: null, error: { message: 'No matching project found.' } };
    return { data: { ...found, updates: demoUpdates[found.project_id] || [] }, error: null };
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*, project_updates(note, created_at)')
    .eq('project_id', normalizedId)
    .eq('email', normalizedEmail)
    .maybeSingle();

  if (error) return { data: null, error };
  if (!data) return { data: null, error: { message: 'No matching project found.' } };
  return { data: { ...data, updates: data.project_updates || [] }, error: null };
}

export async function updateProject(id, patch) {
  if (!isSupabaseConfigured) {
    return { data: { id, ...patch }, error: null };
  }
  const { data, error } = await supabase
    .from('projects')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

export async function deleteProject(id) {
  if (!isSupabaseConfigured) return { error: null };
  const { error } = await supabase.from('projects').delete().eq('id', id);
  return { error };
}

export async function createProject(record) {
  const withDefaults = {
    project_id: generateProjectId(),
    status: 'Pending',
    progress: 0,
    invoice_status: 'Unpaid',
    ...record,
  };
  if (!isSupabaseConfigured) {
    return { data: { id: `local-${Date.now()}`, created_at: new Date().toISOString(), ...withDefaults }, error: null };
  }
  const { data, error } = await supabase.from('projects').insert(withDefaults).select().single();
  return { data, error };
}

// ----------------------------- Contact Messages ----------------------------

export async function createMessage(payload) {
  const record = { ...payload, status: 'New' };
  if (!isSupabaseConfigured) {
    return { data: { id: `local-${Date.now()}`, created_at: new Date().toISOString(), ...record }, error: null };
  }
  const { data, error } = await supabase.from('messages').insert(record).select().single();
  return { data, error };
}

export async function getMessages() {
  if (!isSupabaseConfigured) return { data: demoMessages, error: null };
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data || [], error };
}

export async function updateMessage(id, patch) {
  if (!isSupabaseConfigured) return { data: { id, ...patch }, error: null };
  const { data, error } = await supabase
    .from('messages')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

// ----------------------------- Newsletter ----------------------------------

export async function subscribeNewsletter(email) {
  if (!isSupabaseConfigured) {
    return { data: { email }, error: null };
  }
  const { data, error } = await supabase
    .from('newsletter')
    .insert({ email })
    .select()
    .maybeSingle();
  return { data, error };
}

// ----------------------------- Notifications -------------------------------

export async function getNotifications() {
  if (!isSupabaseConfigured) return { data: demoNotifications, error: null };
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data || [], error };
}

// ----------------------------- File Upload ---------------------------------

export async function uploadRequestFile(file, projectId) {
  if (!isSupabaseConfigured || !file) {
    return { path: file ? `demo/${file.name}` : null, error: null };
  }
  const path = `${projectId}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from('project-files').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  return { path, error };
}
