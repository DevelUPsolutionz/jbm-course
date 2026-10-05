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
      courses: {
        Row: {
          id: string
          slug: string
          title: string
          short_description: string
          description: string
          fee: number
          currency: string
          duration: string
          level: string
          intro_video_url: string | null
          thumbnail_url: string | null
          is_active: boolean
          syllabus: Json
          learning_outcomes: Json
          prerequisites: Json
          target_audience: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          short_description: string
          description: string
          fee: number
          currency?: string
          duration: string
          level?: string
          intro_video_url?: string | null
          thumbnail_url?: string | null
          is_active?: boolean
          syllabus?: Json
          learning_outcomes?: Json
          prerequisites?: Json
          target_audience?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          short_description?: string
          description?: string
          fee?: number
          currency?: string
          duration?: string
          level?: string
          intro_video_url?: string | null
          thumbnail_url?: string | null
          is_active?: boolean
          syllabus?: Json
          learning_outcomes?: Json
          prerequisites?: Json
          target_audience?: Json
          created_at?: string
          updated_at?: string
        }
      }
      registrations: {
        Row: {
          id: string
          registration_reference: string
          full_name: string
          email: string
          phone: string
          course_id: string
          course_slug: string
          course_title: string
          amount: number
          currency: string
          message: string | null
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          terms_accepted: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          registration_reference: string
          full_name: string
          email: string
          phone: string
          course_id: string
          course_slug: string
          course_title: string
          amount: number
          currency?: string
          message?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          terms_accepted?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          registration_reference?: string
          full_name?: string
          email?: string
          phone?: string
          course_id?: string
          course_slug?: string
          course_title?: string
          amount?: number
          currency?: string
          message?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          terms_accepted?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          registration_id: string
          provider: string
          provider_order_id: string
          provider_payment_id: string | null
          provider_signature: string | null
          amount: number
          currency: string
          status: 'created' | 'captured' | 'failed' | 'refunded'
          raw_payload: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          registration_id: string
          provider?: string
          provider_order_id: string
          provider_payment_id?: string | null
          provider_signature?: string | null
          amount: number
          currency?: string
          status?: 'created' | 'captured' | 'failed' | 'refunded'
          raw_payload?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          registration_id?: string
          provider?: string
          provider_order_id?: string
          provider_payment_id?: string | null
          provider_signature?: string | null
          amount?: number
          currency?: string
          status?: 'created' | 'captured' | 'failed' | 'refunded'
          raw_payload?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      webhook_logs: {
        Row: {
          id: string
          event_id: string
          event_type: string
          payload: Json
          processed_at: string
          status: string
        }
        Insert: {
          id?: string
          event_id: string
          event_type: string
          payload: Json
          processed_at?: string
          status?: string
        }
        Update: {
          id?: string
          event_id?: string
          event_type?: string
          payload?: Json
          processed_at?: string
          status?: string
        }
      }
    }
  }
}
