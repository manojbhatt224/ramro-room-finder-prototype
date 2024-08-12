import {
    format,parseISO,
    formatDistanceToNow,
    differenceInDays,
    differenceInMonths,
    differenceInYears
  
  } from 'date-fns';
  
export function getTimeAgo(date) {
   try { const now = new Date();
    const then = parseISO(date);
  
    const days = differenceInDays(now, then);
    const months = differenceInMonths(now, then);
    const years = differenceInYears(now, then);
  
    if (days < 1) {
      return formatDistanceToNow(then, { addSuffix: true }); // Less than a day
    } else if (days < 7) {
      return `${days}d ago`; // Less than a week
    } else if (days < 30) {
      return `${Math.floor(days / 7)}w ago`; // Less than a month
    } else if (months < 12) {
      return format(then, 'MMM d'); // Within the current year
    } else {
      return format(then, 'MMM d, yyyy'); // More than a year ago
    }}
    catch(error){
        console.log("Error is this:", error);
        return 'Invalid Date';
    }
  }