import React, { useState } from "react";
import { useTickets } from "../context/TicketContext";
import { validateTicket } from "../utils/validators";
import { useToast } from "../context/ToastContext";

export default function TicketForm() {
  const { createTicket } = useTickets();
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open" as "open" | "in_progress" | "closed",
    priority: "medium" as "low" | "medium" | "high",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateTicket(form);
    if (Object.keys(v).length) {
      setErrors(v);
      addToast("Please fix validation errors", "error");
      return;
    }
    createTicket(form);
    addToast("Ticket created successfully!", "success");
    setForm({ title: "", description: "", status: "open", priority: "medium" });
    setOpen(false);
  }

  return (
    <div>
      <button className="btn primary" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Create Ticket"}
      </button>
      {open && (
        <form onSubmit={submit} style={{ marginTop: 8, maxWidth: 480 }}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter ticket title"
            />
            {errors.title && <div className="error">{errors.title}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={4}
              className="input"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Enter ticket description"
            />
            {errors.description && <div className="error">{errors.description}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              className="input"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as any })}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && <div className="error">{errors.status}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              className="input"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn primary" type="submit">
              Save
            </button>
            <button
              type="button"
              className="btn outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
