
/**
 * Common ERPNext interface types
 */

export interface ERPNextResponse<T> {
  message: T;
}

export interface ERPNextListResponse<T> {
  message: {
    data: T[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

// Common Document interface
export interface ERPNextDocument {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
}

// Item interface
export interface ERPNextItem extends ERPNextDocument {
  item_code: string;
  item_name: string;
  item_group: string;
  description?: string;
  stock_uom: string;
  disabled: number;
  is_stock_item: number;
  image?: string;
  standard_rate?: number;
  valuation_rate?: number;
}

// Customer interface
export interface ERPNextCustomer extends ERPNextDocument {
  customer_name: string;
  customer_type: string;
  customer_group: string;
  territory: string;
  tax_id?: string;
  disabled: number;
  email?: string;
  phone?: string;
  mobile_no?: string;
}

// Sales Order interface
export interface ERPNextSalesOrder extends ERPNextDocument {
  customer: string;
  customer_name: string;
  transaction_date: string;
  delivery_date?: string;
  status: string;
  total: number;
  grand_total: number;
  currency: string;
  items: ERPNextSalesOrderItem[];
}

// Sales Order Item interface
export interface ERPNextSalesOrderItem extends ERPNextDocument {
  item_code: string;
  item_name: string;
  qty: number;
  rate: number;
  amount: number;
}

// Invoice interface
export interface ERPNextInvoice extends ERPNextDocument {
  customer: string;
  customer_name: string;
  posting_date: string;
  due_date: string;
  status: string;
  total: number;
  grand_total: number;
  outstanding_amount: number;
  currency: string;
}
