export function setAccessToken(token: string) {
  sessionStorage.setItem("accessToken", token);
}

export function getAccessToken() {
  return sessionStorage.getItem("accessToken");
}

export function clearAccessToken() {
  return sessionStorage.removeItem("accessToken");
}
