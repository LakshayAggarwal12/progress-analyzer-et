export const levelColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

export const levelBadge = (level) => levelColors[level] || 'bg-gray-100 text-gray-800';
