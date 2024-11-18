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
      child: {
        Row: {
          birth: string
          created_at: string
          id: string
          name: string
          notes: string
          profile: string
          updated_at: string
          user_id: string
        }
        Insert: {
          birth?: string
          created_at?: string
          id?: string
          name?: string
          notes?: string
          profile?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          birth?: string
          created_at?: string
          id?: string
          name?: string
          notes?: string
          profile?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      like: {
        Row: {
          created_at: string
          expnYmd: number
          id: string
          orgAddr: string
          orgcd: number
          orgnm: string
          orgTlno: string
          user_id: string
          vcnInfo: string
        }
        Insert: {
          created_at?: string
          expnYmd?: number
          id?: string
          orgAddr?: string
          orgcd?: number
          orgnm?: string
          orgTlno?: string
          user_id?: string
          vcnInfo?: string
        }
        Update: {
          created_at?: string
          expnYmd?: number
          id?: string
          orgAddr?: string
          orgcd?: number
          orgnm?: string
          orgTlno?: string
          user_id?: string
          vcnInfo?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      vaccine: {
        Row: {
          additional: boolean
          description: string
          disease_name: string
          duration: string
          id: string
          vaccinate_date: number
          vaccine_name: string
          vaccine_turn: number
        }
        Insert: {
          additional?: boolean
          description?: string
          disease_name?: string
          duration?: string
          id?: string
          vaccinate_date?: number
          vaccine_name?: string
          vaccine_turn?: number
        }
        Update: {
          additional?: boolean
          description?: string
          disease_name?: string
          duration?: string
          id?: string
          vaccinate_date?: number
          vaccine_name?: string
          vaccine_turn?: number
        }
        Relationships: []
      }
      vaccine_duplicate: {
        Row: {
          additional: boolean
          description: string
          disease_name: string
          id: string
          process: string
          target: string
          vaccinate_date: string
          vaccine_name: string
          vaccine_turn: string
        }
        Insert: {
          additional?: boolean
          description?: string
          disease_name?: string
          id?: string
          process?: string
          target?: string
          vaccinate_date?: string
          vaccine_name?: string
          vaccine_turn?: string
        }
        Update: {
          additional?: boolean
          description?: string
          disease_name?: string
          id?: string
          process?: string
          target?: string
          vaccinate_date?: string
          vaccine_name?: string
          vaccine_turn?: string
        }
        Relationships: []
      }
      vaccine_record: {
        Row: {
          child_id: string
          created_at: string
          id: string
          vaccine_id: string
        }
        Insert: {
          child_id?: string
          created_at?: string
          id?: string
          vaccine_id?: string
        }
        Update: {
          child_id?: string
          created_at?: string
          id?: string
          vaccine_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vaccine_record_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "child"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vaccine_record_vaccine_id_fkey"
            columns: ["vaccine_id"]
            isOneToOne: false
            referencedRelation: "vaccine"
            referencedColumns: ["id"]
          },
        ]
      }
      vaccineinfo: {
        Row: {
          description: string
          disease_name: string
          vaccinate_date: string
        }
        Insert: {
          description?: string
          disease_name?: string
          vaccinate_date?: string
        }
        Update: {
          description?: string
          disease_name?: string
          vaccinate_date?: string
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
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
