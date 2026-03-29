const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
export const USE_MOCK = false;

// Convert snake_case to camelCase
function toCamel(o: any): any {
  if (Array.isArray(o)) {
    return o.map(toCamel);
  } else if (o !== null && typeof o === "object") {
    return Object.keys(o).reduce((result, key) => {
      const camelKey = key.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace("-", "").replace("_", "");
      });
      result[camelKey] = toCamel(o[key]);
      return result;
    }, {} as any);
  }
  return o;
}

// Convert camelCase to snake_case
function toSnake(o: any): any {
  if (Array.isArray(o)) {
    return o.map(toSnake);
  } else if (o !== null && typeof o === "object") {
    return Object.keys(o).reduce((result, key) => {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`,
      );
      result[snakeKey] = toSnake(o[key]);
      return result;
    }, {} as any);
  }
  return o;
}

export async function authFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("cc_access");
  const headers = { ...options.headers } as any;

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Set default content type to JSON if body is a string (and not FormData)
  if (
    options.body &&
    typeof options.body === "string" &&
    !headers["Content-Type"]
  ) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || `Request failed with status ${response.status}`);
  }

  return response;
}

// --- Auth Endpoints ---

export async function signUp(data: any) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toSnake(data)),
  });
  if (!res.ok) throw new Error(await res.text());
  return toCamel(await res.json());
}

export async function logIn(data: any) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toSnake(data)),
  });
  if (!res.ok) throw new Error(await res.text());
  return toCamel(await res.json());
}

export async function refreshAuth(refreshToken: string) {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!res.ok) throw new Error(await res.text());
  return toCamel(await res.json());
}

export async function getMe() {
  const res = await authFetch("/auth/me");
  return toCamel(await res.json());
}

// --- Calculate & Parse Endpoints ---

export async function parseText(question: string) {
  const res = await authFetch("/parse/text", {
    method: "POST",
    body: JSON.stringify({ question }),
  });
  return toCamel(await res.json());
}

export async function parseImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await authFetch("/parse/image", {
    method: "POST",
    body: formData,
  });
  return toCamel(await res.json());
}

export async function calculate(inputs: any, sessionId?: string) {
  const url = sessionId ? `/calculate?session_id=${sessionId}` : "/calculate";
  const res = await authFetch(url, {
    method: "POST",
    body: JSON.stringify(toSnake(inputs)),
  });
  return toCamel(await res.json());
}

// --- Sessions & History ---

export async function getSessions() {
  const res = await authFetch("/sessions");
  return toCamel(await res.json());
}

export async function createSession(title: string) {
  const res = await authFetch("/sessions", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  return toCamel(await res.json());
}

export async function getCalculations(sessionId: string) {
  const res = await authFetch(`/sessions/${sessionId}/calculations`);
  return toCamel(await res.json());
}

export async function saveCalculation(sessionId: string, data: any) {
  const res = await authFetch(`/sessions/${sessionId}/calculations`, {
    method: "POST",
    body: JSON.stringify(toSnake(data)),
  });
  return toCamel(await res.json());
}

// --- Clauses ---

export async function getClause(clauseId: string) {
  const res = await fetch(`${BASE_URL}/clauses/${clauseId}`);
  if (!res.ok) throw new Error(await res.text());
  return toCamel(await res.json());
}
