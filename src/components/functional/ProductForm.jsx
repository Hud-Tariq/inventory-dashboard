import { useState, useRef, useEffect } from 'react'

function ProductForm(props) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(props.categories[0])
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current.focus()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (title.trim() === '') return

    props.onAdd({
      title: title.trim(),
      category: category,
      price: Number(price) || 0,
      stock: Number(stock) || 0,
    })

    setTitle('')
    setPrice('')
    setStock('')
    titleRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        ref={titleRef}
        type="text"
        placeholder="Product title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {props.categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="number"
        min="0"
        step="0.01"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        min="0"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button type="submit">Add Product</button>
    </form>
  )
}

export default ProductForm
