// Serbia Lead API service for student portal
import { makeAuthenticatedRequest } from './tokenService.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface SerbiaLeadRequest {
  preferred_intake: string;
  preferred_degree: string;
  interested_universities: string[];
  interested_courses: string[];
  additional_notes?: string;
}

export interface SerbiaLeadResponse {
  id: string;
  student_id: number;
  student_name: string;
  student_email: string;
  preferred_intake: string;
  preferred_degree: string;
  interested_universities: string[];
  interested_courses: string[];
  additional_notes?: string;
  status: string;
  submitted_at: string;
  created_at: string;
  updated_at: string;
  updated_by?: string;
}

const apiRequest = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const config: RequestInit = {
    method: 'GET',
    ...options,
  };

  if (!(options.body instanceof FormData)) {
    config.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
  } else {
    config.headers = { ...options.headers };
  }

  const data = await makeAuthenticatedRequest(endpoint, config);

  if (data && data.success && data.data !== undefined) {
    return data.data;
  }

  return data;
};

export const serbiaLeadAPI = {
  /**
   * Submit a new Serbia interest lead.
   */
  submitLead: async (lead: SerbiaLeadRequest): Promise<SerbiaLeadResponse> => {
    return await apiRequest(`/api/v1/serbia/leads`, {
      method: 'POST',
      body: JSON.stringify(lead),
    });
  },

  /**
   * Get all Serbia leads for the current student.
   */
  getMyLeads: async (): Promise<SerbiaLeadResponse[]> => {
    return await apiRequest(`/api/v1/serbia/leads/my`);
  },

  /**
   * Get a specific lead by ID.
   */
  getLeadById: async (id: string): Promise<SerbiaLeadResponse> => {
    return await apiRequest(`/api/v1/serbia/leads/${id}`);
  },
};
