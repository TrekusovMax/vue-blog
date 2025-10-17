export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
}
