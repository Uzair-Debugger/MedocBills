'use client';

import { useEffect, useState } from 'react';
import { RefreshCcwIcon } from 'lucide-react';

type EmailRecord = { id: number; recipient: string; subject: string; template: string; status: 'SENT' | 'FAILED' | 'SKIPPED'; error_message: string | null; created_at: string };

export default function EmailHistoryPage() {
    const [emails, setEmails] = useState<EmailRecord[]>([]);
    const [error, setError] = useState('');

    async function loadEmails() {
        setError('');
        try {
            const response = await fetch('/api/admin/email-history');
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Unable to load email history.');
            setEmails(data.emails ?? []);
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : 'Unable to load email history.');
        }
    }

    useEffect(() => {
        async function loadInitialEmails() {
            await loadEmails();
        }

        void loadInitialEmails();
    }, []);

    return <main className="min-h-screen bg-gray-50"><div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl bg-primary px-6 py-8 text-white shadow-lg sm:px-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Operations</p><h1 className="mt-2 text-3xl font-bold">Email history</h1><p className="mt-2 text-sm text-white/80">Review outbound application notifications and delivery results.</p></section>
        <div className="mt-8 flex items-center justify-between"><h2 className="text-xl font-bold text-gray-900">Recent messages</h2><button type="button" onClick={() => void loadEmails()} aria-label="Refresh email history" className="text-secondary"><RefreshCcwIcon size={20} /></button></div>
        {error ? <div role="alert" className="mt-5 rounded-xl border border-red-100 bg-red-50 p-6 text-sm text-red-700">{error}</div> : <div className="mt-5 overflow-x-auto rounded-xl bg-white shadow-sm"><table className="w-full min-w-180 text-left text-sm"><thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-5 py-4">Recipient</th><th className="px-5 py-4">Subject</th><th className="px-5 py-4">Template</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Created</th></tr></thead><tbody className="divide-y divide-gray-100">{emails.map(email => <tr key={email.id}><td className="px-5 py-4">{email.recipient}</td><td className="px-5 py-4 font-medium text-gray-900">{email.subject}</td><td className="px-5 py-4 text-gray-500">{email.template}</td><td className={`px-5 py-4 font-semibold ${email.status === 'SENT' ? 'text-green-700' : email.status === 'FAILED' ? 'text-red-700' : 'text-amber-700'}`}>{email.status}</td><td className="px-5 py-4 text-gray-500">{new Date(email.created_at).toLocaleString()}</td></tr>)}</tbody></table></div>}
    </div></main>;
}