
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  function onLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">TicketApp</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard" onClick={() => window.innerWidth <= 670 && document.getElementById('navbarNav')?.classList.remove('show')}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tickets" onClick={() => window.innerWidth <= 670 && document.getElementById('navbarNav')?.classList.remove('show')}>Tickets</Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-outline-primary ms-2" 
                    onClick={() => {
                      // Close the mobile menu before logging out
                      if (window.innerWidth <= 768) {
                        const navbarCollapse = document.getElementById('navbarNav');
                        if (navbarCollapse) {
                          navbarCollapse.classList.remove('show');
                        }
                      }
                      onLogout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/auth/login" onClick={() => window.innerWidth <= 670 && document.getElementById('navbarNav')?.classList.remove('show')}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-primary ms-2" to="/auth/signup" onClick={() => window.innerWidth <= 670 && document.getElementById('navbarNav')?.classList.remove('show')}>
                    Get Started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}