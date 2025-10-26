
import { Link } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

export default function Landing() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <div className="container-xl">
          {/* Hero Section */}
          <section className="position-relative">
            {/* Wave background */}
            <div className="position-absolute top-0 start-0 w-100 overflow-hidden">
              <svg className="wave-svg" viewBox="0 0 1200 300" preserveAspectRatio="none">
                <path d="M0,280 L0,300 L1200,300 L1200,280 C1000,200 800,350 600,280 C400,210 200,300 0,280 Z" fill="#f8fafc"/>
              </svg>
            </div>
            
            {/* Decorative circles */}
            <div className="position-absolute circle circle-1 rounded-circle bg-success opacity-25" style={{width: '160px', height: '160px', right: '6%', top: '4%'}}></div>
            <div className="position-absolute circle circle-2 rounded-circle bg-warning opacity-25" style={{width: '90px', height: '90px', left: '8%', top: '50%'}}></div>
            
            {/* Hero content */}
            <div className="container-xl position-relative py-5 my-5">
              <div className="row justify-content-center text-center">
                <div className="col-lg-8 pt-5">
                  <h1 className="display-4 fw-bold mb-3">TicketApp — Manage tickets simply</h1>
                  <p className="lead text-muted mb-4">Track, update and resolve support tickets with a lightweight interface.</p>
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Link to="/auth/login" className="btn btn-primary btn-lg px-4 py-2">Login</Link>
                    <Link to="/auth/signup" className="btn btn-outline-primary btn-lg px-4 py-2">Get Started</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Cards */}
          <section className="py-5">
            <div className="container-xl">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm rounded-3 p-4 border-0">
                    <div className="card-body text-center">
                      <h3 className="card-title h5">Fast</h3>
                      <p className="card-text text-muted">Quickly create and manage tickets.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm rounded-3 p-4 border-0">
                    <div className="card-body text-center">
                      <h3 className="card-title h5">Accessible</h3>
                      <p className="card-text text-muted">Semantic HTML and keyboard navigable UI.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm rounded-3 p-4 border-0">
                    <div className="card-body text-center">
                      <h3 className="card-title h5">Client-first</h3>
                      <p className="card-text text-muted">Simulated auth using localStorage.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
