function CardWrapper(props) {
  return (
    <div className="card">
      {props.title && <h3>{props.title}</h3>}
      {props.children}
    </div>
  )
}

export default CardWrapper
