export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function isCSR() {
  return typeof window !== 'undefined';
}