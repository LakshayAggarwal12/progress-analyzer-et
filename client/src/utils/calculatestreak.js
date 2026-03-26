export const calculateStreak = (logs) => {
  if (!logs || logs.length === 0) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let streak = 0;
  let checkDate = new Date(today);
  for (let i = 0; i < 365; i++) {
    const hasLog = logs.some(log => {
      const d = new Date(log.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === checkDate.getTime();
    });
    if (hasLog) { streak++; checkDate.setDate(checkDate.getDate() - 1); }
    else break;
  }
  return streak;
};
