export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (response.status === 401 && token) {
    localStorage.removeItem("token");
    alert("Sessione scaduta. Effettua nuovamente il login.");
    window.location.href = "/login";

    throw new Error("Sessione scaduta");
  }

  if (!response.ok) {
    throw new Error(data.message || "Errore nella richiesta");
  }

  return data;
};
