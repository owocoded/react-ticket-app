type TicketData = {
  title: string;
  status: string;
  description?: string;
};

export function validateTicket(data: TicketData) {
  const errors: { [key: string]: string } = {};
  if (!data.title || data.title.trim().length < 3)
    errors.title = "Title is required (3-100 chars).";
  else if (data.title.trim().length > 100)
    errors.title = "Title must be at most 100 chars.";
  const allowed = ["open", "in_progress", "closed"];
  if (!allowed.includes(data.status))
    errors.status = "Status must be open, in_progress, or closed.";
  if (data.description && data.description.length > 2000)
    errors.description = "Description is too long.";
  return errors;
}
export function isValidTicket(data: TicketData) {
  const errors = validateTicket(data);
  return Object.keys(errors).length === 0;
}
// --- IGNORE ---
