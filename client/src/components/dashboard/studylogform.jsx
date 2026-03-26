import React, { useState } from 'react';
import { logAPI } from '../../api/logAPI';

const StudyLogForm = ({ onLogAdded }) => {
  const [form, setForm] = useState({ topic: '', hours: '', notes: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.topic || !form.hours) return;
    setLoading(true);
    try {
      await logAPI.add({ ...form, hours: parseFloat(form.hours) });
      setForm({ topic: '', hours: '', notes: '' });
      onLogAdded && onLogAdded();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h3 className="font-semibold text-gray-900 mb-4">📚 Log Study Session</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text" placeholder="Topic studied" value={form.topic}
            onChange={e => setForm({ ...form, topic: e.target.value })}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="number" placeholder="Hours (e.g. 1.5)" value={form.hours} min="0.1" max="24" step="0.5"
            onChange={e => setForm({ ...form, hours: e.target.value })}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <input
          type="text" placeholder="Notes (optional)" value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button type="submit" disabled={loading}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          {loading ? 'Logging...' : 'Log Session'}
        </button>
      </form>
    </div>
  );
};

export default StudyLogForm;
