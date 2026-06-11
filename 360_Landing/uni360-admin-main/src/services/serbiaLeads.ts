// Serbia Lead API service for admin portal
import { api } from './api';

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

export interface SerbiaLeadStatusUpdate {
  status: string;
  notes?: string;
}

export const serbiaLeadsAPI = {
  /**
   * Get all Serbia leads (admin).
   */
  getAllLeads: async (): Promise<SerbiaLeadResponse[]> => {
    const response = await api.get('/api/v1/admin/serbia/leads');
    if (response.data?.success) {
      return response.data.data;
    }
    return response.data || [];
  },

  /**
   * Get a single lead by ID (admin).
   */
  getLeadById: async (id: string): Promise<SerbiaLeadResponse> => {
    const response = await api.get(`/api/v1/admin/serbia/leads/${id}`);
    if (response.data?.success) {
      return response.data.data;
    }
    return response.data;
  },

  /**
   * Update lead status (admin).
   */
  updateLeadStatus: async (id: string, update: SerbiaLeadStatusUpdate): Promise<SerbiaLeadResponse> => {
    const response = await api.put(`/api/v1/admin/serbia/leads/${id}/status`, update);
    if (response.data?.success) {
      return response.data.data;
    }
    return response.data;
  },
};
