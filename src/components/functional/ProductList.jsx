import ProductCard from './ProductCard.jsx'

function ProductList(props) {
  return (
    <div>
      {props.products.length === 0 ? (
        <p className="empty">No products found.</p>
      ) : (
        <div className="grid">
          {props.products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onChangeStock={props.onChangeStock}
              onDelete={props.onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
