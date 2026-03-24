export function setRole(role: string) {
  sessionStorage.setItem("role", role);
}

export function getRole() {
  return sessionStorage.getItem("role");
}

export function clearRole() {
  return sessionStorage.removeItem("role");
}

export const BACKEND_URL = "http://localhost:3000";
