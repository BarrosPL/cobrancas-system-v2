import { ChargeStatus } from "@/components/ChargeStatusBadge";

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalCharges: number;
  pendingAmount: number;
}

export interface Charge {
  id: string;
  clientName: string;
  clientPhone: string;
  amount: number;
  dueDate: string;
  status: ChargeStatus;
  remindersSent: number;
  lastResponse?: string;
  hasReceipt: boolean;
}

export const clients: Client[] = [
  { id: "1", name: "Maria Silva", phone: "(11) 99876-5432", email: "maria@email.com", totalCharges: 12, pendingAmount: 1500 },
  { id: "2", name: "João Pereira", phone: "(11) 98765-4321", email: "joao@email.com", totalCharges: 8, pendingAmount: 0 },
  { id: "3", name: "Ana Costa", phone: "(21) 99654-3210", email: "ana@email.com", totalCharges: 15, pendingAmount: 3200 },
  { id: "4", name: "Carlos Mendes", phone: "(31) 98543-2109", email: "carlos@email.com", totalCharges: 6, pendingAmount: 800 },
  { id: "5", name: "Fernanda Lima", phone: "(41) 97432-1098", email: "fernanda@email.com", totalCharges: 20, pendingAmount: 4500 },
  { id: "6", name: "Ricardo Santos", phone: "(51) 96321-0987", email: "ricardo@email.com", totalCharges: 3, pendingAmount: 250 },
  { id: "7", name: "Patrícia Oliveira", phone: "(61) 95210-9876", email: "patricia@email.com", totalCharges: 10, pendingAmount: 0 },
  { id: "8", name: "Bruno Almeida", phone: "(71) 94109-8765", email: "bruno@email.com", totalCharges: 5, pendingAmount: 1200 },
];

export const charges: Charge[] = [
  { id: "C001", clientName: "Maria Silva", clientPhone: "(11) 99876-5432", amount: 750, dueDate: "2026-03-01", status: "overdue", remindersSent: 3, lastResponse: undefined, hasReceipt: false },
  { id: "C002", clientName: "Maria Silva", clientPhone: "(11) 99876-5432", amount: 750, dueDate: "2026-03-15", status: "pending", remindersSent: 1, lastResponse: undefined, hasReceipt: false },
  { id: "C003", clientName: "João Pereira", clientPhone: "(11) 98765-4321", amount: 1200, dueDate: "2026-02-28", status: "paid", remindersSent: 2, lastResponse: "PAGUEI", hasReceipt: true },
  { id: "C004", clientName: "Ana Costa", clientPhone: "(21) 99654-3210", amount: 1600, dueDate: "2026-03-05", status: "sent", remindersSent: 1, lastResponse: undefined, hasReceipt: false },
  { id: "C005", clientName: "Ana Costa", clientPhone: "(21) 99654-3210", amount: 1600, dueDate: "2026-03-20", status: "pending", remindersSent: 0, lastResponse: undefined, hasReceipt: false },
  { id: "C006", clientName: "Carlos Mendes", clientPhone: "(31) 98543-2109", amount: 800, dueDate: "2026-03-02", status: "overdue", remindersSent: 4, lastResponse: "Vou pagar amanhã", hasReceipt: false },
  { id: "C007", clientName: "Fernanda Lima", clientPhone: "(41) 97432-1098", amount: 2250, dueDate: "2026-03-10", status: "confirmed", remindersSent: 2, lastResponse: "PAGUEI", hasReceipt: true },
  { id: "C008", clientName: "Fernanda Lima", clientPhone: "(41) 97432-1098", amount: 2250, dueDate: "2026-04-10", status: "pending", remindersSent: 0, lastResponse: undefined, hasReceipt: false },
  { id: "C009", clientName: "Ricardo Santos", clientPhone: "(51) 96321-0987", amount: 250, dueDate: "2026-03-08", status: "sent", remindersSent: 1, lastResponse: undefined, hasReceipt: false },
  { id: "C010", clientName: "Bruno Almeida", clientPhone: "(71) 94109-8765", amount: 1200, dueDate: "2026-02-25", status: "overdue", remindersSent: 5, lastResponse: "Preciso de mais prazo", hasReceipt: false },
];

export const monthlyData = [
  { month: "Out", recebido: 18500, pendente: 4200, vencido: 1800 },
  { month: "Nov", recebido: 22300, pendente: 3100, vencido: 900 },
  { month: "Dez", recebido: 19800, pendente: 5600, vencido: 2200 },
  { month: "Jan", recebido: 25100, pendente: 2800, vencido: 1100 },
  { month: "Fev", recebido: 21700, pendente: 4900, vencido: 1500 },
  { month: "Mar", recebido: 16400, pendente: 8200, vencido: 3800 },
];
