import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous login error
    setErrors(prev => {
      const newErrors = {...prev};
      delete newErrors.login;
      return newErrors;
    });
    
    if (validateForm()) {
      const result = login(email, password, stayLoggedIn);
      if (result.success) {
        navigate('/dashboard');
      } else {
        // Set login-specific error
        setErrors(prev => ({
          ...prev,
          login: result.message || 'Invalid credentials. Please try again.'
        }));
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow rounded-3 p-4">
          <div className="card-body">
            <h2 className="text-center mb-4">Welcome Back</h2>
            
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // Clear error when user starts typing again
                    if (errors.email) {
                      setErrors(prev => ({...prev, email: ''}));
                    }
                    // Also clear the login error when user makes changes
                    if (errors.login) {
                      setErrors(prev => {
                        const newErrors = {...prev};
                        delete newErrors.login;
                        return newErrors;
                      });
                    }
                  }}
                />
                {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
              </div>
              
              <div className="mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    // Clear error when user starts typing again
                    if (errors.password) {
                      setErrors(prev => ({...prev, password: ''}));
                    }
                    // Also clear the login error when user makes changes
                    if (errors.login) {
                      setErrors(prev => {
                        const newErrors = {...prev};
                        delete newErrors.login;
                        return newErrors;
                      });
                    }
                  }}
                />
                {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
              </div>
              
              {errors.login && (
                <div className="alert alert-danger mb-3">{errors.login}</div>
              )}
              
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="stayLoggedIn"
                  checked={stayLoggedIn}
                  onChange={(e) => setStayLoggedIn(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="stayLoggedIn">
                  Stay logged in
                </label>
              </div>
              
              <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                Login
              </button>
              <p className="text-center text-muted">
                Don't have an account? <a href="/auth/signup">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;