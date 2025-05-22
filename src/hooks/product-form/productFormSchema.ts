
import * as z from 'zod';
import { ProductVariation } from '@/types/product';

// Define the schema for product form validation
const productFormSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  type: z.enum(['simple', 'variable']),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  stock: z.number().int().min(0).optional(),
  hsnCode: z.string().min(1, { message: 'HSN Code is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  weight: z.number().min(0, { message: 'Weight must be a positive number' }),
  dimensions: z.object({
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
  }),
  taxStatus: z.enum(['taxable', 'none']),
  taxClass: z.string(),
  upsellProducts: z.array(z.string()).optional(),
  crossSellProducts: z.array(z.string()).optional(),
  potencies: z.array(z.string()).optional(),
  packSizes: z.array(z.string()).optional(),
  variations: z.array(
    z.object({
      potency: z.string(),
      packSize: z.string(),
      price: z.number().min(0),
      stock: z.number().int().min(0),
      weight: z.number().min(0),
    })
  ).optional(),
});

// Type definition inferred from the schema
export type ProductFormValues = z.infer<typeof productFormSchema>;

// Default form values
export const defaultValues: ProductFormValues = {
  name: '',
  type: 'simple',
  shortDescription: '',
  description: '',
  stock: 0,
  hsnCode: '',
  price: 0,
  category: '',
  subcategory: '',
  weight: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0
  },
  taxStatus: 'taxable',
  taxClass: '5',
  potencies: [],
  packSizes: [],
  variations: [],
  upsellProducts: [],
  crossSellProducts: [],
};

export { productFormSchema };
