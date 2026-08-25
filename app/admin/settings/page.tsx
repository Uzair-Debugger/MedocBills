'use client';

import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CustomButton } from '@/src/components/layout';

const inputClassName = 'mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch('/api/admin/settings');
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to load settings.');
        setName(data.admin.name);
        setEmail(data.admin.email);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load settings.');
      } finally { setIsLoading(false); }
    }
    void loadSettings();
  }, []);

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to save settings.');
      setName(data.admin.name); setEmail(data.admin.email); toast.success('Settings updated successfully.');
    } catch (saveError) { toast.error(saveError instanceof Error ? saveError.message : 'Unable to save settings.'); }
    finally { setIsSaving(false); }
  }

  return <main className="min-h-screen bg-gray-50"><div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8"><section className="rounded-2xl bg-primary px-6 py-8 text-white shadow-lg sm:px-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Account</p><h1 className="mt-2 text-3xl font-bold">Admin settings</h1><p className="mt-2 text-sm text-white/80">Keep your administrator contact details current.</p></section>
    {isLoading ? <div className="mt-8 h-64 animate-pulse rounded-xl bg-white shadow-sm" /> : error ? <div role="alert" className="mt-8 rounded-xl border border-red-100 bg-red-50 p-6 text-sm text-red-700">{error}</div> : <form onSubmit={saveSettings} className="mt-8 rounded-xl bg-white p-6 shadow-sm sm:p-8"><div className="space-y-5"><label className="block text-sm font-semibold text-gray-700">Display name<input value={name} onChange={event => setName(event.target.value)} required maxLength={120} className={inputClassName} /></label><label className="block text-sm font-semibold text-gray-700">Admin email<input value={email} onChange={event => setEmail(event.target.value)} required type="email" className={inputClassName} /></label></div><div className="mt-6 flex justify-end border-t border-gray-100 pt-5"><CustomButton type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save settings'}</CustomButton></div></form>}
  </div></main>;
}