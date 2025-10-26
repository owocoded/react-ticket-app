import React, { 
  createContext, 
  useContext, 
  useState, 
  ReactNode, 
  useEffect 
} from "react";
import { useToast } from "./ToastContext";

// Define the Ticket type
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

// Define the context type
interface TicketContextType {
  tickets: Ticket[];
  createTicket: (ticketData: Omit<Ticket, "id" | "createdAt">) => void;
  updateTicket: (id: string, updated: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
}

// Create the context
const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("tickets");
    if (saved) {
      try {
        const parsedTickets = JSON.parse(saved);
        setTickets(parsedTickets);
      } catch (error) {
        console.error("Error parsing tickets from localStorage:", error);
        setTickets([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  const createTicket = (ticketData: Omit<Ticket, "id" | "createdAt">) => {
    const newTicket: Ticket = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5), // Fallback ID generator
      createdAt: new Date().toISOString(),
      ...ticketData,
    };
    setTickets((prev) => [...prev, newTicket]);
    addToast("Ticket created successfully!", "success");
  };

  const updateTicket = (id: string, updated: Partial<Ticket>) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
    addToast("Ticket updated successfully!", "info");
  };

  const deleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
    addToast("Ticket deleted successfully!", "error");
  };

  return (
    <TicketContext.Provider
      value={{ tickets, createTicket, updateTicket, deleteTicket }}
    >
      {children}
    </TicketContext.Provider>
  );
};

// Custom hook to use the ticket context
export const useTickets = (): TicketContextType => {
  const context = useContext(TicketContext);
  if (!context) throw new Error("useTickets must be used within TicketProvider");
  return context;
};
