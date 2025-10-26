import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { tickets } = useTickets();
  const [openTickets, setOpenTickets] = useState(0);
  const [inProgressTickets, setInProgressTickets] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);

  useEffect(() => {
    const open = tickets.filter(ticket => ticket.status === 'open').length;
    const inProgress = tickets.filter(ticket => ticket.status === 'in_progress').length;
    const closed = tickets.filter(ticket => ticket.status === 'closed').length;
    
    setOpenTickets(open);
    setInProgressTickets(inProgress);
    setClosedTickets(closed);
  }, [tickets]);

  // const handleLogout = () => {
  //   logout();
  //   navigate('/');
  // };

  return (
    <>
      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container-xl py-4" style={{maxWidth: '1440px', margin: '0 auto'}}>
          <div className="row mb-4">
            <div className="col-12">
              <h1 className="h2">Dashboard</h1>
              <p className="text-muted">Welcome back! Here's your ticket overview.</p>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card text-center shadow-sm border-0 p-4">
                <div className="display-6 text-success fw-bold mb-2">{openTickets}</div>
                <h5 className="card-title">Open Tickets</h5>
                <Link to="/tickets" className="btn btn-outline-success mt-2">Manage</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center shadow-sm border-0 p-4">
                <div className="display-6 text-warning fw-bold mb-2">{inProgressTickets}</div>
                <h5 className="card-title">In Progress</h5>
                <Link to="/tickets" className="btn btn-outline-warning mt-2">Manage</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center shadow-sm border-0 p-4">
                <div className="display-6 text-secondary fw-bold mb-2">{closedTickets}</div>
                <h5 className="card-title">Closed Tickets</h5>
                <Link to="/tickets" className="btn btn-outline-secondary mt-2">Manage</Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="row">
            <div className="col-12">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white">
                  <h5 className="card-title mb-0">Recent Activity</h5>
                </div>
                <div className="card-body">
                  <p className="text-muted">No recent activity yet. Start by creating a ticket!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;