import { apiFetch } from "./api";

export async function getClients() {
  return apiFetch("/clientes");
}

export async function createClient(data: {
  nome: string
  email: string
  telefone?: string
}) {
  return apiFetch("/clientes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}