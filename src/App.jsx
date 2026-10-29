import { useState, useEffect, useMemo, useCallback, useContext } from 'react'
import { ThemeContext } from './context/ThemeContext.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'
import { getStatus } from './status.js'
import Header from './components/functional/Header.jsx'
import InventoryMetrics from './components/functional/InventoryMetrics.jsx'
import CardWrapper from './components/functional/CardWrapper.jsx'
import ProductForm from './components/functional/ProductForm.jsx'
import ProductList from './components/functional/ProductList.jsx'
import AuditLogger from './components/class/AuditLogger.jsx'

const categories = ['Electronics', 'Clothing', 'Home', 'Stationery']

const startProducts = [
  { id: 1, title: 'Wireless Mouse', category: 'Electronics', price: 25.99, stock: 40 },
  { id: 2, title: 'Mechanical Keyboard', category: 'Electronics', price: 79.5, stock: 4 },
  { id: 3, title: 'Running Shoes', category: 'Clothing', price: 59, stock: 0 },
  { id: 4, title: 'Coffee Mug', category: 'Home', price: 8.5, stock: 120 },
  { id: 5, title: 'Notebook Pack', category: 'Stationery', price: 12, stock: 3 },
  { id: 6, title: 'Desk Lamp', category: 'Home', price: 24, stock: 15 },
]

function App() {
  const { theme } = useContext(ThemeContext)
  const [products, setProducts] = useLocalStorage('products', startProducts)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [lastAction, setLastAction] = useState(null)

  useEffect(() => {
    const active = products.filter((p) => p.stock > 0).length
    document.title = 'Inventory (' + active + ' active)'
  }, [products])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const categoryOk = categoryFilter === 'All' || p.category === categoryFilter
      const statusOk = statusFilter === 'All' || getStatus(p.stock) === statusFilter
      return categoryOk && statusOk
    })
  }, [products, categoryFilter, statusFilter])

  const totals = useMemo(() => {
    let totalStock = 0
    let totalValue = 0
    let lowCount = 0
    products.forEach((p) => {
      totalStock += p.stock
      totalValue += p.stock * p.price
      if (p.stock <= 5) lowCount++
    })
    return { totalStock, totalValue, lowCount }
  }, [products])

  const addProduct = useCallback((data) => {
    const newProduct = { ...data, id: Date.now() }
    setProducts((old) => [newProduct, ...old])
    setLastAction({ id: Date.now(), text: 'Product added: ' + data.title })
  }, [setProducts])

  const changeStock = useCallback((product, amount) => {
    setProducts((old) =>
      old.map((p) =>
        p.id === product.id ? { ...p, stock: Math.max(0, p.stock + amount) } : p
      )
    )
    setLastAction({ id: Date.now(), text: 'Stock updated: ' + product.title })
  }, [setProducts])

  const deleteProduct = useCallback((product) => {
    setProducts((old) => old.filter((p) => p.id !== product.id))
    setLastAction({ id: Date.now(), text: 'Item deleted: ' + product.title })
  }, [setProducts])

  return (
    <div className={'app ' + theme}>
      <div className="container">
        <Header title="Inventory Dashboard" />

        <InventoryMetrics
          totalProducts={products.length}
          totalStock={totals.totalStock}
          totalValue={totals.totalValue}
          lowCount={totals.lowCount}
        />

        <CardWrapper title="Add Product">
          <ProductForm categories={categories} onAdd={addProduct} />
        </CardWrapper>

        <div className="filters">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <ProductList
          products={filtered}
          onChangeStock={changeStock}
          onDelete={deleteProduct}
        />

        <AuditLogger action={lastAction} />
      </div>
    </div>
  )
}

export default App
