import { memo } from 'react'
import CardWrapper from './CardWrapper.jsx'
import { getStatus } from '../../status.js'

function ProductCard(props) {
  const { product, onChangeStock, onDelete } = props
  const status = getStatus(product.stock)

  return (
    <CardWrapper>
      <div className="row">
        <h3>{product.title}</h3>
        <span className={'badge ' + status.replaceAll(' ', '-').toLowerCase()}>
          {status}
        </span>
      </div>
      <p>{product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Stock: {product.stock}</p>
      <div className="buttons">
        <button onClick={() => onChangeStock(product, 1)}>+1</button>
        <button onClick={() => onChangeStock(product, -1)}>-1</button>
        <button onClick={() => onDelete(product)}>Delete</button>
      </div>
    </CardWrapper>
  )
}

export default memo(ProductCard)
