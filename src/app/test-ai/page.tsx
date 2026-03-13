'use client';

import { useState } from 'react';
import { chat } from '@/app/actions/chat';

export default function TestAIPage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        try {
            const res = await chat("Say 'Connection Successful'", []);
            setResult(res);
        } catch (err: any) {
            setResult({ success: false, error: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 bg-slate-900 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-4">AI Connection Diagnostic</h1>
            <button 
                onClick={testConnection}
                className="bg-blue-600 px-4 py-2 rounded mb-4"
                disabled={loading}
            >
                {loading ? 'Testing...' : 'Test AI Connection'}
            </button>
            {result && (
                <div className="bg-slate-800 p-4 rounded border border-slate-700">
                    <p className="font-bold mb-2">Result:</p>
                    <pre className="whitespace-pre-wrap text-sm">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
