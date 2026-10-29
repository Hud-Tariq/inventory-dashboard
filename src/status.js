export function getStatus(stock) {
  if (stock === 0) return 'Out of Stock'
  if (stock <= 5) return 'Low Stock'
  return 'In Stock'
}
