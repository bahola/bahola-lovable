export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
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
          clinic: string | null
          course: string | null
          created_at: string
          customer_id: string
          customer_lifetime_value: number | null
          customer_type: Database["public"]["Enums"]["customer_type"]
          days_between_orders: number | null
          email: string
          expected_graduation: string | null
          first_order_date: string | null
          gst_number: string | null
          id: string
          institution_name: string | null
          last_order_date: string | null
          ltv_segment: string | null
          marketing_priority: number | null
          medical_license: string | null
          name: string
          notes: string | null
          pharmacy_license: string | null
          pharmacy_name: string | null
          phone: string
          pincode: string | null
          predicted_next_purchase_date: string | null
          purchase_frequency: number | null
          source: string | null
          specialization: string | null
          state: string | null
          status: string | null
          student_id: string | null
          total_orders: number | null
          total_spent: number | null
          updated_at: string
          verification_status: string | null
          years_of_practice: number | null
        }
        Insert: {
          address?: string | null
          average_order_value?: number | null
          city?: string | null
          clinic?: string | null
          course?: string | null
          created_at?: string
          customer_id: string
          customer_lifetime_value?: number | null
          customer_type?: Database["public"]["Enums"]["customer_type"]
          days_between_orders?: number | null
          email: string
          expected_graduation?: string | null
          first_order_date?: string | null
          gst_number?: string | null
          id?: string
          institution_name?: string | null
          last_order_date?: string | null
          ltv_segment?: string | null
          marketing_priority?: number | null
          medical_license?: string | null
          name: string
          notes?: string | null
          pharmacy_license?: string | null
          pharmacy_name?: string | null
          phone: string
          pincode?: string | null
          predicted_next_purchase_date?: string | null
          purchase_frequency?: number | null
          source?: string | null
          specialization?: string | null
          state?: string | null
          status?: string | null
          student_id?: string | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string
          verification_status?: string | null
          years_of_practice?: number | null
        }
        Update: {
          address?: string | null
          average_order_value?: number | null
          city?: string | null
          clinic?: string | null
          course?: string | null
          created_at?: string
          customer_id?: string
          customer_lifetime_value?: number | null
          customer_type?: Database["public"]["Enums"]["customer_type"]
          days_between_orders?: number | null
          email?: string
          expected_graduation?: string | null
          first_order_date?: string | null
          gst_number?: string | null
          id?: string
          institution_name?: string | null
          last_order_date?: string | null
          ltv_segment?: string | null
          marketing_priority?: number | null
          medical_license?: string | null
          name?: string
          notes?: string | null
          pharmacy_license?: string | null
          pharmacy_name?: string | null
          phone?: string
          pincode?: string | null
          predicted_next_purchase_date?: string | null
          purchase_frequency?: number | null
          source?: string | null
          specialization?: string | null
          state?: string | null
          status?: string | null
          student_id?: string | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string
          verification_status?: string | null
          years_of_practice?: number | null
        }
        Relationships: []
      }
      doctor_schedules: {
        Row: {
          break_end_time: string | null
          break_start_time: string | null
          created_at: string
          date: string
          doctor_id: string
          end_time: string
          id: string
          is_available: boolean
          start_time: string
          updated_at: string
        }
        Insert: {
          break_end_time?: string | null
          break_start_time?: string | null
          created_at?: string
          date: string
          doctor_id: string
          end_time: string
          id?: string
          is_available?: boolean
          start_time: string
          updated_at?: string
        }
        Update: {
          break_end_time?: string | null
          break_start_time?: string | null
          created_at?: string
          date?: string
          doctor_id?: string
          end_time?: string
          id?: string
          is_available?: boolean
          start_time?: string
          updated_at?: string
        }
        Relationships: []
      }
      erpnext_items: {
        Row: {
          brand: string | null
          created_at: string | null
          creation_date: string | null
          customs_tariff_number: string | null
          description: string | null
          disabled: boolean | null
          display_order: number | null
          erpnext_sync_status: string | null
          has_variants: boolean | null
          id: number
          image: string | null
          is_active_on_website: boolean | null
          is_featured: boolean | null
          is_purchase_item: boolean | null
          is_sales_item: boolean | null
          is_stock_item: boolean | null
          is_variant: boolean | null
          item_code: string
          item_group: string | null
          item_group_hierarchy: string[] | null
          item_name: string
          last_synced_at: string | null
          meta_description: string | null
          modified_date: string | null
          opening_stock: number | null
          seo_slug: string | null
          shelf_life_in_days: number | null
          standard_rate: number | null
          stock_uom: string | null
          sync_error_message: string | null
          thumbnail: string | null
          updated_at: string | null
          valuation_rate: number | null
          variant_attributes: Json | null
          variant_of: string | null
          website_category: string | null
          website_subcategory: string | null
          weight_per_unit: number | null
          weight_uom: string | null
        }
        Insert: {
          brand?: string | null
          created_at?: string | null
          creation_date?: string | null
          customs_tariff_number?: string | null
          description?: string | null
          disabled?: boolean | null
          display_order?: number | null
          erpnext_sync_status?: string | null
          has_variants?: boolean | null
          id?: number
          image?: string | null
          is_active_on_website?: boolean | null
          is_featured?: boolean | null
          is_purchase_item?: boolean | null
          is_sales_item?: boolean | null
          is_stock_item?: boolean | null
          is_variant?: boolean | null
          item_code: string
          item_group?: string | null
          item_group_hierarchy?: string[] | null
          item_name: string
          last_synced_at?: string | null
          meta_description?: string | null
          modified_date?: string | null
          opening_stock?: number | null
          seo_slug?: string | null
          shelf_life_in_days?: number | null
          standard_rate?: number | null
          stock_uom?: string | null
          sync_error_message?: string | null
          thumbnail?: string | null
          updated_at?: string | null
          valuation_rate?: number | null
          variant_attributes?: Json | null
          variant_of?: string | null
          website_category?: string | null
          website_subcategory?: string | null
          weight_per_unit?: number | null
          weight_uom?: string | null
        }
        Update: {
          brand?: string | null
          created_at?: string | null
          creation_date?: string | null
          customs_tariff_number?: string | null
          description?: string | null
          disabled?: boolean | null
          display_order?: number | null
          erpnext_sync_status?: string | null
          has_variants?: boolean | null
          id?: number
          image?: string | null
          is_active_on_website?: boolean | null
          is_featured?: boolean | null
          is_purchase_item?: boolean | null
          is_sales_item?: boolean | null
          is_stock_item?: boolean | null
          is_variant?: boolean | null
          item_code?: string
          item_group?: string | null
          item_group_hierarchy?: string[] | null
          item_name?: string
          last_synced_at?: string | null
          meta_description?: string | null
          modified_date?: string | null
          opening_stock?: number | null
          seo_slug?: string | null
          shelf_life_in_days?: number | null
          standard_rate?: number | null
          stock_uom?: string | null
          sync_error_message?: string | null
          thumbnail?: string | null
          updated_at?: string | null
          valuation_rate?: number | null
          variant_attributes?: Json | null
          variant_of?: string | null
          website_category?: string | null
          website_subcategory?: string | null
          weight_per_unit?: number | null
          weight_uom?: string | null
        }
        Relationships: []
      }
      help_center_content: {
        Row: {
          content: string
          created_at: string
          id: string
          is_published: boolean
          meta_description: string | null
          page_type: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_published?: boolean
          meta_description?: string | null
          page_type: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_published?: boolean
          meta_description?: string | null
          page_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          coupon_code: string | null
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          discount_amount: number | null
          gstin: string | null
          id: string
          items: Json
          notes: string | null
          order_number: string
          order_status: string
          payment_id: string | null
          payment_method: string
          payment_status: string
          shipping_address: Json
          shipping_cost: number | null
          subtotal: number
          swell_order_id: string | null
          total: number
          updated_at: string
        }
        Insert: {
          coupon_code?: string | null
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          discount_amount?: number | null
          gstin?: string | null
          id?: string
          items: Json
          notes?: string | null
          order_number: string
          order_status?: string
          payment_id?: string | null
          payment_method?: string
          payment_status?: string
          shipping_address: Json
          shipping_cost?: number | null
          subtotal?: number
          swell_order_id?: string | null
          total?: number
          updated_at?: string
        }
        Update: {
          coupon_code?: string | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          discount_amount?: number | null
          gstin?: string | null
          id?: string
          items?: Json
          notes?: string | null
          order_number?: string
          order_status?: string
          payment_id?: string | null
          payment_method?: string
          payment_status?: string
          shipping_address?: Json
          shipping_cost?: number | null
          subtotal?: number
          swell_order_id?: string | null
          total?: number
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
      swell_wishlist: {
        Row: {
          added_at: string | null
          id: string
          product_id: string
          product_image: string | null
          product_name: string | null
          product_price: number | null
          user_id: string
        }
        Insert: {
          added_at?: string | null
          id?: string
          product_id: string
          product_image?: string | null
          product_name?: string | null
          product_price?: number | null
          user_id: string
        }
        Update: {
          added_at?: string | null
          id?: string
          product_id?: string
          product_image?: string | null
          product_name?: string | null
          product_price?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      website_pages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_published: boolean
          meta_description: string | null
          page_slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_published?: boolean
          meta_description?: string | null
          page_slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_published?: boolean
          meta_description?: string | null
          page_slug?: string
          title?: string
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      customer_type: "customer" | "doctor" | "pharmacy" | "student"
      help_page_type:
        | "getting_started"
        | "potency_guide"
        | "using_pellets"
        | "first_aid_kit"
        | "liquid_remedies_troubleshooting"
        | "no_results_troubleshooting"
        | "children_safety"
        | "remedy_interactions"
        | "bach_flower_selector"
        | "seasonal_remedies"
        | "shipping_issues"
        | "certifications"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      customer_type: ["customer", "doctor", "pharmacy", "student"],
      help_page_type: [
        "getting_started",
        "potency_guide",
        "using_pellets",
        "first_aid_kit",
        "liquid_remedies_troubleshooting",
        "no_results_troubleshooting",
        "children_safety",
        "remedy_interactions",
        "bach_flower_selector",
        "seasonal_remedies",
        "shipping_issues",
        "certifications",
      ],
    },
  },
} as const
