export const formatDate = (dateString, options) => {
  const settings = options || { year: 'numeric', month: 'long', day: '2-digit' }
  return new Date(dateString).toLocaleString('ru', settings)
}
