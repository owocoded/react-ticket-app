import { useState } from "react";
import { useTickets } from "../context/TicketContext";
import { useToast } from "../context/ToastContext";
import type { Ticket } from "../context/TicketContext";

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  const { deleteTicket, updateTicket } = useTickets();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(ticket.title);
  const [editDescription, setEditDescription] = useState(ticket.description);

  function onDelete() {
    if (confirm("Delete this ticket?")) {
      deleteTicket(ticket.id);
      addToast("Ticket deleted successfully!", "error");
    }
  }

  function handleEdit() {
    if (isEditing) {
      // Save the changes
      updateTicket(ticket.id, {
        title: editTitle,
        description: editDescription
      });
      addToast("Ticket updated successfully!", "info");
      setIsEditing(false);
    } else {
      // Start editing
      setIsEditing(true);
    }
  }

  function handleCancel() {
    // Reset to original values
    setEditTitle(ticket.title);
    setEditDescription(ticket.description);
    setIsEditing(false);
  }

  return (
    <article className="ticket-card" aria-labelledby={"t-" + ticket.id}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="input"
            style={{ width: "70%" }}
          />
        ) : (
          <h3 id={"t-" + ticket.id}>{ticket.title}</h3>
        )}
        <span className={`status ${ticket.status}`}>
          {ticket.status.replace("_", " ")}
        </span>
      </div>
      {isEditing ? (
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="input"
          rows={4}
          style={{ width: "100%", marginTop: "8px" }}
        />
      ) : (
        <p style={{ color: "#475569" }}>{ticket.description?.slice(0, 180)}</p>
      )}
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button className="btn outline" onClick={handleEdit}>
          {isEditing ? "Save" : "Edit"}
        </button>
        {isEditing && (
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
        {!isEditing && (
          <button className="btn" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
