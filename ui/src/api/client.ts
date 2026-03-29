import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      
      if (refreshToken) {
        try {
          const resp = await axios.post(`${API_URL}/auth/refresh`, { refresh_token: refreshToken });
          const { access_token, refresh_token } = resp.data.data;
          
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// --- API Methods ---

export const authApi = {
  loginWithGoogle: (credential: string) => 
    api.post("/auth/google", { credential }).then(r => r.data.data),
  getMe: () => api.get("/auth/me").then(r => r.data.data),
  logout: () => api.post("/auth/logout").then(r => r.data.data),
};

export const extractApi = {
  extractText: (question: string, sessionId?: string) => {
    const formData = new FormData();
    formData.append("question", question);
    if (sessionId) formData.append("session_id", sessionId);
    return api.post("/extract/text", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(r => r.data.data);
  },
  extractFile: (file: File, sessionId?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (sessionId) formData.append("session_id", sessionId);
    return api.post("/extract/file", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(r => r.data.data);
  },
};

export const explainApi = {
  explainResult: (inputs: any, result: any) => 
    api.post("/explain/result", { inputs, result }).then(r => r.data.data),
  explainReference: (refId: string, refType: string) => 
    api.post("/explain/reference", { ref_id: refId, ref_type: refType }).then(r => r.data.data),
};

export const sessionApi = {
  list: () => api.get("/sessions").then(r => r.data.data),
  get: (id: string) => api.get(`/sessions/${id}`).then(r => r.data.data),
  create: (title: string) => api.post("/sessions", { title }).then(r => r.data.data),
  update: (id: string, title: string) => api.patch(`/sessions/${id}`, { title }).then(r => r.data.data),
  delete: (id: string) => api.delete(`/sessions/${id}`).then(r => r.data.data),
};

export default api;
