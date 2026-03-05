const API_URL = "http://localhost:8000/api";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // adiciona token se existir
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 🔒 TOKEN EXPIRADO OU NÃO AUTORIZADO
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  // outros erros da API
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erro na requisição");
  }

  return response.json();
}