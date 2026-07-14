const API_BASE_URL = import.meta.env.VITE_API_URL || "";

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export function getProducts() {
  return request("/api/products");
}

export function getHealth() {
  return request("/api/health");
}