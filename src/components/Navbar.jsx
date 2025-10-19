import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const cartTotal = useSelector(s => s.cart.totalQuantity)
  const likedCount = useSelector(s => Object.keys(s.likes.likedIds).length)

  return (
    <header className="py-3">
      <div className="container header-grid align-items-center">
        {/* LEFT: desktop nav links + mobile hamburger */}
        <div className="d-flex align-items-center gap-2 left-area">
          {/* Desktop links (visible md+) */}
          <ul className="navbar-nav d-none d-md-flex flex-row gap-3 mb-0">
            <li className="nav-item"><NavLink className="nav-link px-0" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link px-0" to="/products">Collections</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link px-0" to="/collections">New</NavLink></li>
          </ul>

          {/* Mobile hamburger (visible only on small screens) */}
          <button
            className="btn d-md-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobileNav"
            aria-controls="mobileNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list" style={{ fontSize: 22 }}></i>
          </button>
        </div>

        {/* CENTER: logo (always centered by grid) */}
        <div className="logo-center text-center">
          <Link to="/" className="d-inline-block">
            <img src="/images/logo.png" alt="logo" style={{ height: 42 }} />
          </Link>
        </div>

        {/* RIGHT: icons (always visible) */}
        <div className="d-flex align-items-center gap-3 right-area">
          <Link to="/liked" className="text-decoration-none position-relative" title="Liked products">
            <i className="bi bi-heart" style={{ fontSize: 20 }}></i>
            <span className="liked-badge ms-1">{likedCount}</span>
          </Link>

          <Link to="/cart" className="btn btn-dark d-flex align-items-center gap-2">
            <i className="bi bi-bag" style={{ fontSize: 18, color: '#fff' }}></i>
            <span className="d-none d-md-inline">Cart ({cartTotal})</span>
            <span className="d-inline d-md-none ms-1 liked-badge">{cartTotal}</span>
          </Link>

          <Link to="/profile" className="text-decoration-none" title="Profile">
            <i className="bi bi-person-circle" style={{ fontSize: 24 }}></i>
          </Link>
        </div>
      </div>

      {/* Mobile-only collapsed nav (vertical) */}
      <div className="container">
        <div className="collapse d-md-none" id="mobileNav">
          <ul className="navbar-nav flex-column py-2">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/products">Products</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/collections">Collections</NavLink></li>
          </ul>
        </div>
      </div>
    </header>
  )
}
