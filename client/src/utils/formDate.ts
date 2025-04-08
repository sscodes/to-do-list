export function formatDate(date: string | number | Date) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
}
