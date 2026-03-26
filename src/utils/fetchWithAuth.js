const API_URL = 'sante-backend-production-a693.up.railway.app';

export async function fetchWithAuth(endpoint, options = {}) {

  let accessToken = localStorage.getItem("access_token");

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${accessToken}`
    }
  });

  // Si el token expiró
  if (response.status === 403) {

    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      window.location.href = "/";
      return;
    }

    const refreshResponse = await fetch(`${API_URL}/api/users/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refresh_token: refreshToken
      })
    });

    if (!refreshResponse.ok) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }

    const data = await refreshResponse.json();

    localStorage.setItem("access_token", data.access_token);

    // Reintentar la petición original
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${data.access_token}`
      }
    });
  }

  return response;
}
