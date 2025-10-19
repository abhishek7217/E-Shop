import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

export default function App() {
  const location = useLocation()
  const hideFooterOnHome = location.pathname === '/'

  return (
    <div className="app-container">
      <Navbar />
      <SearchBar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<div className="container py-5">Page not found</div>} />
        </Routes>
      </main>

      {/* Approach block */}
      {!hideFooterOnHome && (
        <div className="container">
          <div className="approach-title beatrice-heading">Our Approach to fashion design</div>
          <div className="approach-desc beatrice-sub">
            at elegant vogue , we blend creativity with craftsmanship to create fashion that transcends trends and stands the test of time each design is meticulously crafted, ensuring the highest quelity exqulsite finish
          </div>
        </div>
      )}

      {/* footer hidden on home */}
      {!hideFooterOnHome && <Footer />}
    </div>
  )
}
