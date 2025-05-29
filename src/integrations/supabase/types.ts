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
      appointments: {
        Row: {
          amount: number
          appointment_date: string
          appointment_time: string
          consultation_type: string
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          id: string
          notes: string | null
          payment_id: string | null
          payment_status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          appointment_date: string
          appointment_time: string
          consultation_type: string
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          id?: string
          notes?: string | null
          payment_id?: string | null
          payment_status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          appointment_date?: string
          appointment_time?: string
          consultation_type?: string
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          notes?: string | null
          payment_id?: string | null
          payment_status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          average_order_value: number | null
          city: string | null
          created_at: string
          customer_id: string
          customer_lifetime_value: number | null
          customer_type: Database["public"]["Enums"]["customer_type"]
          days_between_orders: number | null
          email: string
          first_order_date: string | null
          id: string
          last_order_date: string | null
          ltv_segment: string | null
          marketing_priority: number | null
          name: string
          notes: string | null
          phone: string
          pincode: string | null
          predicted_next_purchase_date: string | null
          purchase_frequency: number | null
          source: string | null
          state: string | null
          status: string | null
          total_orders: number | null
          total_spent: number | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          average_order_value?: number | null
          city?: string | null
          created_at?: string
          customer_id: string
          customer_lifetime_value?: number | null
          customer_type?: Database["public"]["Enums"]["customer_type"]
          days_between_orders?: number | null
          email: string
          first_order_date?: string | null
          id?: string
          last_order_date?: string | null
          ltv_segment?: string | null
          marketing_priority?: number | null
          name: string
          notes?: string | null
          phone: string
          pincode?: string | null
          predicted_next_purchase_date?: string | null
          purchase_frequency?: number | null
          source?: string | null
          state?: string | null
          status?: string | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          average_order_value?: number | null
          city?: string | null
          created_at?: string
          customer_id?: string
          customer_lifetime_value?: number | null
          customer_type?: Database["public"]["Enums"]["customer_type"]
          days_between_orders?: number | null
          email?: string
          first_order_date?: string | null
          id?: string
          last_order_date?: string | null
          ltv_segment?: string | null
          marketing_priority?: number | null
          name?: string
          notes?: string | null
          phone?: string
          pincode?: string | null
          predicted_next_purchase_date?: string | null
          purchase_frequency?: number | null
          source?: string | null
          state?: string | null
          status?: string | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          type?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          comment: string
          created_at: string
          id: string
          product_id: string
          rating: number
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          product_id: string
          rating: number
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          product_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_subcategories: {
        Row: {
          category_id: string
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variations: {
        Row: {
          created_at: string
          id: string
          pack_size: string
          potency: string
          price: number
          product_id: string
          stock: number
          updated_at: string
          weight: number
        }
        Insert: {
          created_at?: string
          id?: string
          pack_size: string
          potency: string
          price?: number
          product_id: string
          stock?: number
          updated_at?: string
          weight?: number
        }
        Update: {
          created_at?: string
          id?: string
          pack_size?: string
          potency?: string
          price?: number
          product_id?: string
          stock?: number
          updated_at?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          benefits: string[] | null
          category_id: string | null
          created_at: string
          description: string | null
          dimensions: string | null
          hsn_code: string
          id: string
          image: string | null
          ingredients: string | null
          name: string
          pack_sizes: string[] | null
          potencies: string[] | null
          price: number
          short_description: string | null
          stock: number | null
          subcategory_id: string | null
          tax_class: string | null
          tax_status: string | null
          type: string
          updated_at: string
          usage_instructions: string | null
          weight: number
        }
        Insert: {
          benefits?: string[] | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          dimensions?: string | null
          hsn_code: string
          id?: string
          image?: string | null
          ingredients?: string | null
          name: string
          pack_sizes?: string[] | null
          potencies?: string[] | null
          price?: number
          short_description?: string | null
          stock?: number | null
          subcategory_id?: string | null
          tax_class?: string | null
          tax_status?: string | null
          type: string
          updated_at?: string
          usage_instructions?: string | null
          weight?: number
        }
        Update: {
          benefits?: string[] | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          dimensions?: string | null
          hsn_code?: string
          id?: string
          image?: string | null
          ingredients?: string | null
          name?: string
          pack_sizes?: string[] | null
          potencies?: string[] | null
          price?: number
          short_description?: string | null
          stock?: number | null
          subcategory_id?: string | null
          tax_class?: string | null
          tax_status?: string | null
          type?: string
          updated_at?: string
          usage_instructions?: string | null
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_product_category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_product_subcategory"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "product_subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_areas: {
        Row: {
          area_name: string
          city: string | null
          created_at: string
          id: string
          pincode: string | null
          state: string | null
          zone_id: string
        }
        Insert: {
          area_name: string
          city?: string | null
          created_at?: string
          id?: string
          pincode?: string | null
          state?: string | null
          zone_id: string
        }
        Update: {
          area_name?: string
          city?: string | null
          created_at?: string
          id?: string
          pincode?: string | null
          state?: string | null
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipping_areas_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "shipping_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_rates: {
        Row: {
          base_price: number
          base_weight_grams: number
          created_at: string
          id: string
          incremental_rate: number
          incremental_weight_grams: number
          max_weight_grams: number | null
          min_weight_grams: number | null
          updated_at: string
          zone_id: string
        }
        Insert: {
          base_price: number
          base_weight_grams?: number
          created_at?: string
          id?: string
          incremental_rate: number
          incremental_weight_grams: number
          max_weight_grams?: number | null
          min_weight_grams?: number | null
          updated_at?: string
          zone_id: string
        }
        Update: {
          base_price?: number
          base_weight_grams?: number
          created_at?: string
          id?: string
          incremental_rate?: number
          incremental_weight_grams?: number
          max_weight_grams?: number | null
          min_weight_grams?: number | null
          updated_at?: string
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipping_rates_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "shipping_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_zones: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          added_at: string | null
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          added_at?: string | null
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          added_at?: string | null
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_customer_ltv: {
        Args: { customer_uuid: string }
        Returns: undefined
      }
      generate_customer_id: {
        Args: { customer_type: Database["public"]["Enums"]["customer_type"] }
        Returns: string
      }
    }
    Enums: {
      customer_type: "customer" | "doctor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      customer_type: ["customer", "doctor"],
    },
  },
} as const
