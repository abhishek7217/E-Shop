import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts } from '../redux/slices/productsSlice'
import { setCategory, setSort, setRating, clearFilters } from '../redux/slices/filtersSlice'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

export default function Products() {
  const dispatch = useDispatch()
  const { list, status, error } = useSelector(s => s.products)
  const filters = useSelector(s => s.filters)

  useEffect(() => { if (status === 'idle') dispatch(loadProducts()) }, [dispatch, status])

  const categories = useMemo(() => {
    const set = new Set()
    list.forEach(p => set.add(p.category))
    return Array.from(set)
  }, [list])

  const filtered = useMemo(() => {
    let arr = [...list]
    const q = (filters.search || '').toLowerCase()
    if (q) {
      arr = arr.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }
    if (filters.category && filters.category !== 'all') {
      arr = arr.filter(p => p.category === filters.category)
    }
    if (filters.rating && filters.rating > 0) {
      arr = arr.filter(p => (p.rating?.rate || 0) >= filters.rating)
    }
    if (filters.sort === 'price-asc') {
      arr.sort((a, b) => a.price - b.price)
    } else if (filters.sort === 'price-desc') {
      arr.sort((a, b) => b.price - a.price)
    }
    return arr
  }, [list, filters])

  const grouped = useMemo(() => {
    const map = {}
    filtered.forEach(p => {
      if (!map[p.category]) map[p.category] = []
      map[p.category].push(p)
    })
    return map
  }, [filtered])

  if (status === 'loading') return <Loader />
  if (status === 'failed') return <div className="container py-5">Error: {error}</div>

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <small className="text-muted">Home / Products</small>
          <h2 className="beatrice-heading-sm mt-1">Products</h2>
        </div>

        <div className="d-flex gap-2 align-items-center">
          <div>
            <button className="btn filter-button" data-bs-toggle="collapse" data-bs-target="#filterPanel">Filters</button>
          </div>
          <div>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => dispatch(clearFilters())}>Reset</button>
          </div>
        </div>
      </div>

      <div className="collapse filter-panel mb-3" id="filterPanel">
        <div className="card card-body">
          <div className="mb-2">
            <small className="text-muted">Sort by price</small>
            <div className="mt-1">
              <button className={`btn btn-filter-item ${filters.sort === 'price-asc' ? 'active' : ''}`} onClick={() => dispatch(setSort('price-asc'))}>Less to more</button>
              <button className={`btn btn-filter-item ${filters.sort === 'price-desc' ? 'active' : ''}`} onClick={() => dispatch(setSort('price-desc'))}>More to less</button>
            </div>
          </div>

          <div className="mb-2">
            <small className="text-muted">Rating</small>
            <div className="mt-1">
              <button className={`btn btn-filter-item ${filters.rating === 4.5 ? 'active' : ''}`} onClick={() => dispatch(setRating(4.5))}>4.5★ & up</button>
              <button className={`btn btn-filter-item ${filters.rating === 4.0 ? 'active' : ''}`} onClick={() => dispatch(setRating(4.0))}>4.0★ & up</button>
            </div>
          </div>

          <div className="mb-2">
            <small className="text-muted">Categories</small>
            <div className="mt-2">
              <div className="d-flex flex-wrap">
                <button className={`btn btn-filter-item ${filters.category === 'all' ? 'active' : ''}`} onClick={() => dispatch(setCategory('all'))}>All</button>
                {categories.map(c => (
                  <button key={c} className={`btn btn-filter-item ${filters.category === c ? 'active' : ''}`} onClick={() => dispatch(setCategory(c))}>{c}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {Object.keys(grouped).length === 0 && (
        <div className="text-muted">No products match your filters</div>
      )}

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-4">
          <div className="category-heading">{category}</div>
          <div className="row g-4">
            {items.map(p => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
