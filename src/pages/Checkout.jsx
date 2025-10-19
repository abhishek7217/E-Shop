import { useState } from 'react'

export default function Checkout() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    email: '', phone: '', firstName: '', lastName: '', country: '', state: '', address: '', city: '', postal: ''
  })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div className="container py-5">
      <h2 className="mb-4 beatrice-heading" style={{ fontSize: 20, fontWeight: 400 }}>Checkout</h2>

      <div className="mb-4">
        <div className="btn-group" role="group">
          <button className={`btn ${step === 1 ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setStep(1)}>Information</button>
          <button className={`btn ${step === 2 ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setStep(2)}>Shipping</button>
          <button className={`btn ${step === 3 ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setStep(3)}>Payment</button>
        </div>
      </div>

      {step === 1 && (
        <div className="card card-body">
          <h5>Contact info</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input className="form-control" name="email" value={form.email} onChange={onChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input className="form-control" name="phone" value={form.phone} onChange={onChange} />
            </div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-dark" onClick={() => setStep(2)}>Shipping</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card card-body">
          <h5>Shipping address</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input className="form-control" name="firstName" value={form.firstName} onChange={onChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input className="form-control" name="lastName" value={form.lastName} onChange={onChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Country</label>
              <input className="form-control" name="country" value={form.country} onChange={onChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">State / Region</label>
              <input className="form-control" name="state" value={form.state} onChange={onChange} />
            </div>

            <div className="col-md-12">
              <label className="form-label">Address</label>
              <input className="form-control" name="address" value={form.address} onChange={onChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">City</label>
              <input className="form-control" name="city" value={form.city} onChange={onChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Postal Code</label>
              <input className="form-control" name="postal" value={form.postal} onChange={onChange} />
            </div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-outline-secondary" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-dark" onClick={() => setStep(3)}>Payment</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card card-body">
          <h5>Payment</h5>
          <p className="text-muted">(This is a demo page — no real payments.)</p>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-outline-secondary" onClick={() => setStep(2)}>Back</button>
            <button className="btn btn-dark">Pay now</button>
          </div>
        </div>
      )}
    </div>
  )
}
