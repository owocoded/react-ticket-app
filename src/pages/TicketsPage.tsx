import React, { useState, useEffect } from 'react';
import { useTickets } from '../context/TicketContext';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

const TicketsPage: React.FC = () => {
  const { tickets, createTicket, updateTicket, deleteTicket } = useTickets();
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(tickets);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open' as 'open' | 'in_progress' | 'closed',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});



  useEffect(() => {
    let result = tickets;

    if (statusFilter) {
      result = result.filter(ticket => ticket.status === statusFilter);
    }

    if (priorityFilter) {
      result = result.filter(ticket => ticket.priority === priorityFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(ticket => 
        ticket.title.toLowerCase().includes(query) || 
        ticket.description.toLowerCase().includes(query)
      );
    }

    setFilteredTickets(result);
  }, [tickets, statusFilter, priorityFilter, searchQuery]);

  const handleCreateTicket = () => {
    setFormData({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    });
    setCurrentTicket(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setFormData({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority
    });
    setCurrentTicket(ticket);
    setErrors({});
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (currentTicket) {
        // Update existing ticket
        updateTicket(currentTicket.id, {
          ...currentTicket,
          ...formData
        });
      } else {
        // Create new ticket
        createTicket({
          ...formData
        });
      }
      
      setIsModalOpen(false);
    }
  };

  const handleDeleteTicket = (id: string) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      deleteTicket(id);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'open': return 'bg-success text-white';
      case 'in_progress': return 'bg-warning text-dark';
      case 'closed': return 'bg-secondary text-white';
      default: return 'bg-secondary text-white';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-danger text-white';
      case 'medium': return 'bg-primary text-white';
      case 'low': return 'bg-light text-dark';
      default: return 'bg-light text-dark';
    }
  };

  return (
    <>
      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container-xl py-4" style={{maxWidth: '1440px', margin: '0 auto'}}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2">Manage Tickets</h1>
            <button 
              className="btn btn-primary" 
              onClick={handleCreateTicket}
            >
              Create Ticket
            </button>
          </div>

          {/* Filter Bar */}
          <div className="row mb-4">
            <div className="col-md-3">
              <select 
                className="form-select" 
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select" 
                id="priorityFilter"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="col-md-6">
              <input 
                type="text" 
                className="form-control" 
                id="searchTickets"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Ticket List */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="ticketGrid">
            {filteredTickets.length > 0 ? (
              filteredTickets.map(ticket => (
                <div className="col" key={ticket.id} data-ticket-id={ticket.id}>
                  <div className="card shadow-sm border-0 rounded-3 h-100">
                    <div className="card-body p-3">
                      <h5 className="card-title fw-bold mb-2">{ticket.title}</h5>
                      <p className="card-text text-muted small mb-2">
                        {ticket.description.length > 100 
                          ? ticket.description.substring(0, 100) + '...' 
                          : ticket.description}
                      </p>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                          {ticket.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`badge ${getPriorityBadgeClass(ticket.priority)}`}>
                          {ticket.priority.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">
                          Created: {new Date(ticket.createdAt).toLocaleDateString()}
                        </small>
                        <div className="btn-group" role="group">
                          <button 
                            className="btn btn-sm btn-outline-primary" 
                            onClick={() => handleEditTicket(ticket)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            onClick={() => handleDeleteTicket(ticket.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="text-center py-5">
                  <h4 className="text-muted">No tickets found</h4>
                  <p className="text-muted">Create your first ticket to get started</p>
                  <button 
                    className="btn btn-primary" 
                    onClick={handleCreateTicket}
                  >
                    Create Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create/Edit Ticket Modal */}
        {isModalOpen && (
          <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ticketModalLabel">
                    {currentTicket ? 'Edit Ticket' : 'Create Ticket'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setIsModalOpen(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <input type="hidden" id="ticketId" value={currentTicket?.id || ''} />
                    
                    <div className="mb-3">
                      <label htmlFor="ticketTitle" className="form-label">Title</label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        id="ticketTitle" 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                      {errors.title && <div className="text-danger small mt-1">{errors.title}</div>}
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="ticketDescription" className="form-label">Description</label>
                      <textarea 
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        id="ticketDescription" 
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                      ></textarea>
                      {errors.description && <div className="text-danger small mt-1">{errors.description}</div>}
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="ticketStatus" className="form-label">Status</label>
                        <select 
                          className="form-select" 
                          id="ticketStatus"
                          value={formData.status}
                          onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                        >
                          <option value="open">Open</option>
                          <option value="in_progress">In Progress</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="ticketPriority" className="form-label">Priority</label>
                        <select 
                          className="form-select" 
                          id="ticketPriority"
                          value={formData.priority}
                          onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {currentTicket ? 'Update Ticket' : 'Create Ticket'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default TicketsPage;