import api from './api';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  token: string;
  refreshToken?: string;
}

export const authService = {
  // TODO: Implement all authentication methods
  
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/v1/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/v1/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  logout: async () => {
    await api.post('/v1/auth/logout');
    localStorage.removeItem('authToken');
  },

  forgotPassword: async (email: string) => {
    return api.post('/v1/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, newPassword: string) => {
    return api.post('/v1/auth/reset-password', { token, newPassword });
  },
};

export default authService;
