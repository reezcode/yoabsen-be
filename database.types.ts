export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance_history: {
        Row: {
          address: string | null
          att_in: string | null
          att_out: string | null
          created_at: string
          date: string | null
          id: number
          lat: number | null
          long: number | null
          proof: string | null
          proof_verification: boolean | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          att_in?: string | null
          att_out?: string | null
          created_at?: string
          date?: string | null
          id?: number
          lat?: number | null
          long?: number | null
          proof?: string | null
          proof_verification?: boolean | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          att_in?: string | null
          att_out?: string | null
          created_at?: string
          date?: string | null
          id?: number
          lat?: number | null
          long?: number | null
          proof?: string | null
          proof_verification?: boolean | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      holiday_date: {
        Row: {
          created_at: string
          date: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      job_position: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          salary: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          salary: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          salary?: number
        }
        Relationships: []
      }
      location: {
        Row: {
          address: string | null
          created_at: string
          default: boolean | null
          id: number
          lat: number | null
          long: number | null
          tolerance: number | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          default?: boolean | null
          id?: number
          lat?: number | null
          long?: number | null
          tolerance?: number | null
        }
        Update: {
          address?: string | null
          created_at?: string
          default?: boolean | null
          id?: number
          lat?: number | null
          long?: number | null
          tolerance?: number | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          code: number
          created_at: string
          email: string | null
          extra_salary: number | null
          id: string
          id_position: number
          name: string
          phone_number: string
          photo_url: string | null
          qr_link: string
          rel_position: string
          role: Database["public"]["Enums"]["Roles"]
          salary: number | null
        }
        Insert: {
          code: number
          created_at?: string
          email?: string | null
          extra_salary?: number | null
          id?: string
          id_position: number
          name: string
          phone_number: string
          photo_url?: string | null
          qr_link: string
          rel_position: string
          role?: Database["public"]["Enums"]["Roles"]
          salary?: number | null
        }
        Update: {
          code?: number
          created_at?: string
          email?: string | null
          extra_salary?: number | null
          id?: string
          id_position?: number
          name?: string
          phone_number?: string
          photo_url?: string | null
          qr_link?: string
          rel_position?: string
          role?: Database["public"]["Enums"]["Roles"]
          salary?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_id_position_fkey"
            columns: ["id_position"]
            isOneToOne: false
            referencedRelation: "job_position"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_rel_position_fkey"
            columns: ["rel_position"]
            isOneToOne: false
            referencedRelation: "job_position"
            referencedColumns: ["name"]
          },
        ]
      }
      staff_permit: {
        Row: {
          created_at: string
          date: string
          description: string
          id: number
          name: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          description: string
          id?: number
          name: string
          status: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string
          id?: number
          name?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_permit_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      work_hour: {
        Row: {
          created_at: string
          day: number
          end_hour: string
          id: number
          rel_day: string
          start_hour: string
          tolerance: number | null
        }
        Insert: {
          created_at?: string
          day: number
          end_hour: string
          id?: number
          rel_day: string
          start_hour: string
          tolerance?: number | null
        }
        Update: {
          created_at?: string
          day?: number
          end_hour?: string
          id?: number
          rel_day?: string
          start_hour?: string
          tolerance?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Roles: "Admin" | "Staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
