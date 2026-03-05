import { apiFetch } from "./api";

export function getDashboardStats() {
  return apiFetch("/dashboard/stats");
}

export function getFinancialFlow() {
  return apiFetch("/dashboard/fluxo");
}

export function getRecentCharges() {
  return apiFetch("/dashboard/recentes");
}