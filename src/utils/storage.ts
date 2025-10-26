export const SESSION_KEY = "ticketapp_session";
export const TICKETS_KEY = "ticketapp_tickets";

export function loadSession(): unknown | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
export interface Session {
  // Define the properties of your session object here
  userId: string;
  token: string;
  expiresAt: number;
}

export function saveSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}
export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export interface Ticket {
  // Define the properties of your ticket object here
  id: string;
  title: string;
  description: string;
  status: string;
}

export function loadTickets(): Ticket[] {
  try {
    const raw = localStorage.getItem(TICKETS_KEY);
    return raw ? JSON.parse(raw) as Ticket[] : [];
  } catch (e) {
    return [];
  }
}
export function saveTickets(tickets: Ticket[]): void {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export function simulateSave(key: string, value: unknown, failRate: number = 0): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate)
        return reject(new Error("Simulated failure"));
      localStorage.setItem(key, JSON.stringify(value));
      resolve(true);
    }, 250);
  });
}
export function simulateLoad(key: string, failRate: number = 0): Promise<never> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate)
        return reject(new Error("Simulated failure"));
      const raw = localStorage.getItem(key);
      resolve(raw ? JSON.parse(raw) : null);
    }, 250);
  });
}