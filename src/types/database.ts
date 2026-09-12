export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string
          username: string
          password_hash: string
          role: 'ADMIN' | 'SECRETARY' | 'LUPON_CHAIRMAN' | 'OFFICER'
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          username: string
          password_hash: string
          role?: 'ADMIN' | 'SECRETARY' | 'LUPON_CHAIRMAN' | 'OFFICER'
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          username?: string
          password_hash?: string
          role?: 'ADMIN' | 'SECRETARY' | 'LUPON_CHAIRMAN' | 'OFFICER'
          created_at?: string
        }
      }
      kp_cases: {
        Row: {
          id: string
          case_number: string
          incident_date: string
          date_filed: string
          complaint_title: string
          complaint_details: string
          complaint_category: string | null
          status: 'PENDING' | 'MEDIATION' | 'CONCILIATION' | 'ARBITRATION' | 'SETTLED' | 'DISMISSED' | 'CERTIFIED_TO_FILE_ACTION'
          complainants: Json
          respondents: Json
          witnesses: Json
          assigned_lupon_member: string | null
          recorded_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          case_number: string
          incident_date: string
          date_filed?: string
          complaint_title: string
          complaint_details: string
          complaint_category?: string | null
          status?: 'PENDING' | 'MEDIATION' | 'CONCILIATION' | 'ARBITRATION' | 'SETTLED' | 'DISMISSED' | 'CERTIFIED_TO_FILE_ACTION'
          complainants: Json
          respondents: Json
          witnesses?: Json
          assigned_lupon_member?: string | null
          recorded_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          case_number?: string
          incident_date?: string
          date_filed?: string
          complaint_title?: string
          complaint_details?: string
          complaint_category?: string | null
          status?: 'PENDING' | 'MEDIATION' | 'CONCILIATION' | 'ARBITRATION' | 'SETTLED' | 'DISMISSED' | 'CERTIFIED_TO_FILE_ACTION'
          complainants?: Json
          respondents?: Json
          witnesses?: Json
          assigned_lupon_member?: string | null
          recorded_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      hearing_schedules: {
        Row: {
          id: string
          case_id: string
          hearing_type: string
          scheduled_date: string
          remarks: string | null
          status: string
        }
        Insert: {
          id?: string
          case_id: string
          hearing_type: string
          scheduled_date: string
          remarks?: string | null
          status?: string
        }
        Update: {
          id?: string
          case_id?: string
          hearing_type?: string
          scheduled_date?: string
          remarks?: string | null
          status?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      case_status: 'PENDING' | 'MEDIATION' | 'CONCILIATION' | 'ARBITRATION' | 'SETTLED' | 'DISMISSED' | 'CERTIFIED_TO_FILE_ACTION'
      user_role: 'ADMIN' | 'SECRETARY' | 'LUPON_CHAIRMAN' | 'OFFICER'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
