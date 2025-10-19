export default function Footer() {
  return (
    <footer className="footer-bg">
      <div className="container py-5 d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="footer-vertical text-start">
          <a href="#info" className="d-block mb-1">Info</a>
          <a href="#pricing" className="d-block mb-1">Pricing</a>
          <a href="#about" className="d-block mb-1">About</a>
          <a href="#contacts" className="d-block mb-1">Contacts</a>
        </div>

        <div className="footer-center-logo text-center my-3">
          <img src="/images/flogo.png" alt="footer logo" />
        </div>

        <div className="text-end">
          <div className="mb-2">Languages</div>
          <div><a href="#eng" className="me-2">Eng</a><a href="#esp" className="me-2">Esp</a><a href="#sve">Sve</a></div>
        </div>
      </div>

      <div className="text-center py-2 small text-muted">© 2024 — COPYRIGHT</div>
    </footer>
  )
}
