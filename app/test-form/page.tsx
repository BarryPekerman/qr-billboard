'use client';

import { useState } from 'react';

export default function TestFormPage() {
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  function addLog(message: string) {
    console.log(message);
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  }

  async function testFetch() {
    setLog([]);
    setResult(null);
    addLog('Starting fetch test...');

    const testData = {
      name: 'Debug Test',
      phone: '1234567890',
      email: 'debug@test.com',
      message: 'Testing from Firefox',
      productId: '1',
    };

    try {
      addLog('Preparing fetch request...');
      addLog(`URL: ${window.location.origin}/api/leads`);
      addLog(`Data: ${JSON.stringify(testData)}`);

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      addLog(`Response status: ${response.status} ${response.statusText}`);
      addLog(`Response ok: ${response.ok}`);
      addLog(`Response headers: ${JSON.stringify([...response.headers])}`);

      const contentType = response.headers.get('content-type');
      addLog(`Content-Type: ${contentType}`);

      const responseText = await response.text();
      addLog(`Raw response: ${responseText}`);

      let parsed;
      try {
        parsed = JSON.parse(responseText);
        addLog(`Parsed JSON: ${JSON.stringify(parsed)}`);
        setResult(parsed);
      } catch (e) {
        addLog(`JSON parse error: ${e}`);
        setResult({ error: 'Failed to parse JSON', raw: responseText });
      }

      if (response.ok) {
        addLog('✅ SUCCESS!');
      } else {
        addLog(`❌ ERROR: ${response.status}`);
      }
    } catch (error) {
      addLog(`❌ EXCEPTION: ${error}`);
      if (error instanceof Error) {
        addLog(`Error name: ${error.name}`);
        addLog(`Error message: ${error.message}`);
        addLog(`Error stack: ${error.stack}`);
      }
      setResult({ exception: String(error) });
    }
  }

  async function testXHR() {
    setLog([]);
    setResult(null);
    addLog('Starting XHR test...');

    const testData = {
      name: 'XHR Debug Test',
      phone: '9876543210',
      email: 'xhr@test.com',
      message: 'Testing with XHR',
      productId: '1',
    };

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.onreadystatechange = function() {
        addLog(`ReadyState: ${xhr.readyState}`);
        if (xhr.readyState === 4) {
          addLog(`Status: ${xhr.status}`);
          addLog(`Response: ${xhr.responseText}`);
          if (xhr.status === 201) {
            addLog('✅ XHR SUCCESS!');
            try {
              const parsed = JSON.parse(xhr.responseText);
              setResult(parsed);
            } catch (e) {
              addLog(`JSON parse error: ${e}`);
            }
          } else {
            addLog(`❌ XHR ERROR: ${xhr.status}`);
          }
          resolve(xhr.responseText);
        }
      };

      xhr.onerror = function() {
        addLog('❌ XHR onerror triggered');
        reject(new Error('XHR error'));
      };

      xhr.open('POST', '/api/leads', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      addLog('Sending XHR request...');
      xhr.send(JSON.stringify(testData));
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Debug Test Page
        </h1>
        <p className="text-gray-600 mb-8">
          Testing form submission in Firefox - Check console (F12) for detailed logs
        </p>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Tests</h2>
          <div className="flex gap-4">
            <button
              onClick={testFetch}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Test with Fetch API
            </button>
            <button
              onClick={testXHR}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Test with XMLHttpRequest
            </button>
          </div>
        </div>

        {log.length > 0 && (
          <div className="bg-gray-900 text-green-400 rounded-lg p-4 mb-6 font-mono text-sm overflow-auto max-h-96">
            {log.map((entry, i) => (
              <div key={i} className="mb-1">{entry}</div>
            ))}
          </div>
        )}

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Result</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 text-center">
          <a href="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Catalogue
          </a>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Firefox-Specific Checks:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Enhanced Tracking Protection: <code>{typeof navigator !== 'undefined' && 'globalPrivacyControl' in navigator ? 'Enabled' : 'Disabled'}</code></li>
            <li>• User Agent: <code className="text-xs">{typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</code></li>
            <li>• Cookies Enabled: <code>{typeof navigator !== 'undefined' ? String(navigator.cookieEnabled) : 'N/A'}</code></li>
            <li>• Do Not Track: <code>{typeof navigator !== 'undefined' ? String(navigator.doNotTrack) : 'N/A'}</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

