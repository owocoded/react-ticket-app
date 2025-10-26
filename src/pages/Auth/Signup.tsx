import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { signup } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.signupEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.signupEmail = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.signupPassword = 'Password is required';
    } else if (password.length < 6) {
      newErrors.signupPassword = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const result = signup(email, password);
      if (result.success) {
        navigate('/auth/login');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow rounded-3 p-4">
          <div className="card-body">
            <h2 className="text-center mb-4">Create Account</h2>
            
            <form id="signupForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="signupEmail">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.signupEmail ? 'is-invalid' : ''}`}
                  id="signupEmail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // Clear error when user starts typing again
                    if (errors.signupEmail) {
                      setErrors(prev => ({...prev, signupEmail: ''}));
                    }
                  }}
                />
                {errors.signupEmail && <div className="text-danger small mt-1">{errors.signupEmail}</div>}
              </div>
              
              <div className="mb-3">
                <label className="form-label" htmlFor="signupPassword">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.signupPassword ? 'is-invalid' : ''}`}
                  id="signupPassword"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    // Clear error when user starts typing again
                    if (errors.signupPassword) {
                      setErrors(prev => ({...prev, signupPassword: ''}));
                    }
                  }}
                />
                {errors.signupPassword && <div className="text-danger small mt-1">{errors.signupPassword}</div>}
              </div>
              
              <div className="mb-3">
                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    // Clear error when user starts typing again
                    if (errors.confirmPassword) {
                      setErrors(prev => ({...prev, confirmPassword: ''}));
                    }
                  }}
                />
                {errors.confirmPassword && <div className="text-danger small mt-1">{errors.confirmPassword}</div>}
              </div>
              
              <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                Sign Up
              </button>
              <p className="text-center text-muted">
                Already have an account? <a href="/auth/login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;