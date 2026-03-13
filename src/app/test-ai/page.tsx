'use client';

import { useState } from 'react';
import { chat, listAIModels } from '@/app/actions/chat';

export default function TestAIPage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [models, setModels] = useState<any>(null);

    const testConnection = async () => {
        setLoading(true);
        setModels(null);
        try {
            const res = await chat("Say 'Connection Successful'", []);
            setResult(res);
        } catch (err: any) {
            setResult({ success: false, error: err.message });
        } finally {
            setLoading(false);
        }
    };

    const fetchModels = async () => {
        setLoading(true);
        setResult(null);
        try {
            const res = await listAIModels();
            setModels(res);
        } catch (err: any) {
            setModels({ success: false, error: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 bg-slate-900 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-4">AI Connection Diagnostic</h1>
            <div className="flex gap-4 mb-6">
                <button 
                    onClick={testConnection}
                    className="bg-blue-600 px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Testing...' : 'Test AI Connection'}
                </button>
                <button 
                    onClick={fetchModels}
                    className="bg-green-600 px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Listing Models...' : 'List Available Models'}
                </button>
            </div>

            {result && (
                <div className="bg-slate-800 p-4 rounded border border-slate-700 mb-6">
                    <p className="font-bold mb-2">Chat Result:</p>
                    <pre className="whitespace-pre-wrap text-sm text-green-400">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}

            {models && (
                <div className="bg-slate-800 p-4 rounded border border-slate-700">
                    <p className="font-bold mb-2">Available Models:</p>
                    <pre className="whitespace-pre-wrap text-sm text-blue-400 max-h-[400px] overflow-auto">
                        {JSON.stringify(models, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
