import { useSelector, useDispatch } from 'react-redux'
import { changeQuantity, removeFromCart, clearCart } from '../redux/slices/cartSlice'

export default function Cart() {
  const { items, totalPrice, totalQuantity } = useSelector(s => s.cart)
  const dispatch = useDispatch()

  if (items.length === 0) return (
    <div className="container py-5">
      <h2>Your cart is empty</h2>
      <p className="text-muted">Add some products from the shop.</p>
    </div>
  )

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping bag</h2>
      <div className="row">
        <div className="col-lg-8">
          <div className="list-group">
            {items.map(i => (
              <div key={i.id} className="list-group-item d-flex gap-3 align-items-center">
                <img src={i.image} alt={i.title} style={{ height: 80, width: 80, objectFit: 'contain' }} />
                <div className="flex-grow-1">
                  <div className="fw-semibold">{i.title}</div>
                  <div className="text-muted">${i.price} x {i.quantity}</div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <input type="number" min="0" value={i.quantity} onChange={(e) => dispatch(changeQuantity({ id: i.id, quantity: Number(e.target.value) }))} className="form-control" style={{ width: 80 }} />
                  <button className="btn btn-outline-danger" onClick={() => dispatch(removeFromCart(i.id))}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order summary</h5>
              <p className="mb-1">Items: {totalQuantity}</p>
              <h4 className="fw-bold">${totalPrice}</h4>
              <div className="d-grid gap-2 mt-3">
                <a href="/checkout" className="btn btn-dark">Checkout</a>
                <button className="btn btn-outline-secondary" onClick={() => dispatch(clearCart())}>Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
