import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts } from '../redux/slices/productsSlice'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

export default function Home() {
  const dispatch = useDispatch()
  const { list, status } = useSelector(s => s.products)

  useEffect(() => { if (status === 'idle') dispatch(loadProducts()) }, [dispatch, status])

  const images = list.slice(0, 2).map(p => p.image)

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="display-5 fw-bold">New Collection</h1>
          <p className="lead text-muted">SUMMER 2024</p>
          <Link to="/products" className="btn btn-dark">Go to Shop</Link>
        </div>

        <div className="col-md-6 d-flex gap-3 justify-content-center">
          {status === 'loading' && <Loader />}
          {images.length === 0 && status !== 'loading' && (
            <div className="bg-light rounded-3 d-flex align-items-center justify-content-center" style={{ height: 300, width: '100%' }}>
              <div>No hero images yet</div>
            </div>
          )}

          {images.map((src, i) => (
            <div key={i} style={{ width: '48%' }} className="card">
              <img src={src} alt={`hero-${i}`} style={{ height: 300, objectFit: 'cover' }} className="card-img-top" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
