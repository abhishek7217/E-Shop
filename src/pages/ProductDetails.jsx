import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadProductById } from '../redux/slices/productsSlice'
import Loader from '../components/Loader'
import { addToCart } from '../redux/slices/cartSlice'
import { toggleLike } from '../redux/slices/likesSlice'

export default function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { activeProduct: p, status, error } = useSelector(s => s.products)
  const liked = useSelector(s => !!s.likes.likedIds[id])

  useEffect(() => { dispatch(loadProductById(id)) }, [dispatch, id])

  if (status === 'loading' || !p) return <Loader />
  if (status === 'failed') return <div className="container py-5">Error: {error}</div>

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card">
            <img src={p.image} className="card-img-top" alt={p.title} style={{ height: 480, objectFit: 'contain' }} />
          </div>
        </div>

        <div className="col-md-6">
          <h1 className="h4 beatrice-heading" style={{ fontSize: 20, fontWeight: 400 }}>{p.title}</h1>
          <p className="text-muted">{p.category}</p>
          <p className="mt-3">{p.description}</p>
          <div className="mt-4 d-flex align-items-center gap-3">
            <div className="h4 fw-bold mb-0">${p.price}</div>
            <button className="btn btn-dark" onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
            <button className="btn btn-outline-danger" onClick={() => dispatch(toggleLike(p.id))}>
              <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'}`}></i> {liked ? 'Liked' : 'Like'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
