export function formatDate(dateString: string): string {
  if (!dateString) return "Unknown date";
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    return dateString;
  }
}

export * from '@/lib/utils/cn';
