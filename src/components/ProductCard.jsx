import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import { toggleLike } from '../redux/slices/likesSlice'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const liked = useSelector(s => !!s.likes.likedIds[product.id])

  return (
    <>
      <div className="product-card card">
        <div className="card-actions">
          <button className="btn btn-sm btn-light" onClick={() => dispatch(toggleLike(product.id))}>
            <i className={`bi ${liked ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
          </button>
          <button className="btn btn-sm btn-primary" onClick={() => dispatch(addToCart(product))}>
            Add
          </button>
        </div>

        <Link to={`/products/${product.id}`} className="d-flex align-items-center justify-content-center p-3">
          <img src={product.image} className="card-img-top" alt={product.title} />
        </Link>
      </div>

      {/* Title / price / desc under the card */}
      <div className="mt-2">
        <div className="beatrice-heading" style={{ fontSize: 16, textTransform: 'uppercase', fontWeight: 400 }}>{product.title}</div>
        <div className="text-muted" style={{ fontSize: 14 }}>{product.category}</div>
        <div className="d-flex justify-content-between align-items-center mt-1">
          <div className="fw-bold">${product.price}</div>
          <div className="text-muted small">{product.rating?.rate ? `${product.rating.rate} ★` : ''}</div>
        </div>
        <div className="text-muted small mt-1" style={{ maxHeight: 40, overflow: 'hidden' }}>{product.description}</div>
      </div>
    </>
  )
}
