const API_URL = "https://sante-backend-l81v.onrender.com";

export async function fetchWithAuth(endpoint, options = {}) {

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  if (response.status === 403) {

    const refreshResponse = await fetch(`${API_URL}/api/users/refresh-token`, {
      method: "POST",
      credentials: 'include'
    });

    if (!refreshResponse.ok) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }

    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    });
  }

  return response;
}
