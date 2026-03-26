import React from 'react';
import { formatDate } from '../../utils/formatdate';

const RecentActivity = ({ logs, onDelete }) => (
  <div className="bg-white rounded-xl shadow-sm border p-5">
    <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
    {logs.length === 0 ? (
      <p className="text-gray-400 text-sm text-center py-4">No study sessions logged yet. Start learning! 🚀</p>
    ) : (
      <div className="space-y-2 max-h-72 overflow-y-auto">
        {logs.map(log => (
          <div key={log._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{log.topic}</p>
              <p className="text-xs text-gray-500">{formatDate(log.date)} · {log.hours}h</p>
              {log.notes && <p className="text-xs text-gray-400 truncate">{log.notes}</p>}
            </div>
            <button onClick={() => onDelete(log._id)} className="ml-2 text-red-400 hover:text-red-600 text-xs">✕</button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default RecentActivity;
