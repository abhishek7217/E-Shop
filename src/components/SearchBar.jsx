import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from '../redux/slices/filtersSlice'

export default function SearchBar() {
  const [q, setQ] = useState('')
  const dispatch = useDispatch()

  const onSearch = (e) => {
    e?.preventDefault()
    dispatch(setSearch(q.trim()))
  }

  return (
    <div className="search-wrap">
      <div className="container">
        <form className="d-flex justify-content-center" onSubmit={onSearch}>
          <div className="input-group input-group-sm search-input-group" style={{ width: 420, maxWidth: '100%' }}>
            <input
              type="search"
              className="form-control search-input"
              placeholder="Search products..."
              aria-label="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ border: 0 }}
            />
            <button className="btn search-btn" type="submit" aria-label="Search">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
