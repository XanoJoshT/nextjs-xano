/**
 * Xano API client for handling authentication and API requests
 */

export interface XanoAuthResponse {
  authToken: string;
  user: {
    id: number;
    email: string;
    name?: string;
    created_at: string;
    [key: string]: unknown;
  };
}

export interface XanoLoginCredentials {
  email: string;
  password: string;
}

export interface XanoSignupCredentials extends XanoLoginCredentials {
  name?: string;
}

export interface XanoError {
  message: string;
  code?: number;
}

class XanoClient {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Set the authentication token for subsequent requests
   */
  setAuthToken(token: string | null) {
    this.authToken = token;
    
    // Store token in localStorage when in browser environment
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('xano_auth_token', token);
      } else {
        localStorage.removeItem('xano_auth_token');
      }
    }
  }

  /**
   * Get the current authentication token
   */
  getAuthToken(): string | null {
    // Try to get from instance first
    if (this.authToken) return this.authToken;
    
    // Try to get from localStorage if in browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('xano_auth_token');
      if (token) {
        this.authToken = token;
        return token;
      }
    }
    
    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  /**
   * Make an API request to Xano
   */
  async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      // Use type assertion to handle HeadersInit index signature
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      // Don't use credentials: 'include' to avoid CORS issues with Xano's wildcard origin
    });

    // Handle non-JSON responses
    let data: unknown;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const error = {
        message: typeof data === 'object' && data && 'message' in data ? 
          String((data as Record<string, unknown>).message) : 'An error occurred',
        code: response.status,
        ...(typeof data === 'object' && data ? data as Record<string, unknown> : {})
      };
      throw error;
    }

    return data as T;
  }

  /**
   * Login with email and password
   */
  async login(credentials: XanoLoginCredentials): Promise<XanoAuthResponse> {
    try {
      const response = await this.request<XanoAuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      this.setAuthToken(response.authToken);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Sign up a new user
   */
  async signup(credentials: XanoSignupCredentials): Promise<XanoAuthResponse> {
    try {
      const response = await this.request<XanoAuthResponse>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      this.setAuthToken(response.authToken);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint if your Xano API has one
      // await this.request('/auth/logout', { method: 'POST' });
      
      // Clear auth token
      this.setAuthToken(null);
    } catch (error) {
      // Still clear token even if API call fails
      this.setAuthToken(null);
      throw error;
    }
  }

  /**
   * Get the current user profile
   */
  async getCurrentUser<T = unknown>(): Promise<T> {
    try {
      return await this.request<T>('/auth/me');
    } catch (error) {
      throw error;
    }
  }
}

// Create and export a singleton instance
const XANO_BASE_URL = process.env.NEXT_PUBLIC_XANO_API_URL || 'https://your-xano-api-url.com';
export const xanoClient = new XanoClient(XANO_BASE_URL);

// Helper to initialize auth from localStorage on client side
export function initXanoAuth() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('xano_auth_token');
    if (token) {
      xanoClient.setAuthToken(token);
    }
  }
}
