function InventoryMetrics(props) {
  return (
    <div className="metrics">
      <div className="card">
        <p>Products</p>
        <h2>{props.totalProducts}</h2>
      </div>
      <div className="card">
        <p>Total Stock</p>
        <h2>{props.totalStock}</h2>
      </div>
      <div className="card">
        <p>Total Value</p>
        <h2>${props.totalValue.toFixed(2)}</h2>
      </div>
      <div className="card">
        <p>Low / Out</p>
        <h2>{props.lowCount}</h2>
      </div>
    </div>
  )
}

export default InventoryMetrics
