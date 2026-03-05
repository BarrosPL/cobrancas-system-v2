const API_URL = "http://localhost:8000/api";

export async function login(email: string, password: string) {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Erro ao fazer login");
  }

  // salva token
  localStorage.setItem("token", data.access_token);

  return data;
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}