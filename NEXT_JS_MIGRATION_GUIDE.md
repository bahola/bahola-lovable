
# Next.js Migration Guide for Bahola Labs

## Phase 1: Components Ready for Next.js Migration

### Completed Optimizations

1. **Data Fetching Layer** (`src/lib/dataFetchers.ts`)
   - Server-compatible data fetching functions
   - Ready for conversion to `getStaticProps`/`getServerSideProps`
   - Structured for static site generation

2. **Homepage Optimization** (`src/pages/IndexOptimized.tsx`)
   - Server-side rendering ready
   - Props-based data flow
   - SEO optimized with structured data

3. **Product Page Optimization** (`src/components/product/ProductPageOptimized.tsx`)
   - Dynamic routing ready
   - Static generation compatible
   - Rich structured data for SEO

4. **Client-Side Hooks** (`src/hooks/useClientSideData.tsx`)
   - Separated client-only logic
   - Ready for Next.js client components

### Next.js Conversion Instructions

#### 1. Homepage Migration
```typescript
// pages/index.tsx (Next.js)
import { GetStaticProps } from 'next';
import IndexOptimized from '../components/IndexOptimized';
import { getHomepageData } from '../lib/dataFetchers';

export default IndexOptimized;

export const getStaticProps: GetStaticProps = async () => {
  const data = await getHomepageData();
  
  return {
    props: data,
    revalidate: 3600, // Revalidate every hour
  };
};
```

#### 2. Product Pages Migration
```typescript
// pages/products/[id].tsx (Next.js)
import { GetStaticProps, GetStaticPaths } from 'next';
import ProductPageOptimized from '../../components/product/ProductPageOptimized';
import { getProductData, getAllProductIds } from '../../lib/dataFetchers';

export default ProductPageOptimized;

export const getStaticPaths: GetStaticPaths = async () => {
  const productIds = await getAllProductIds();
  
  return {
    paths: productIds.map(id => ({ params: { id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await getProductData(params?.id as string);
  
  if (!product) {
    return { notFound: true };
  }
  
  return {
    props: { product },
    revalidate: 3600,
  };
};
```

#### 3. Client Components
```typescript
// For interactive components, add 'use client' directive
'use client';

import { useClientSideData } from '../hooks/useClientSideData';
```

### Benefits of This Approach

1. **SEO Improvements**
   - Server-side rendering for better search indexing
   - Structured data for rich snippets
   - Faster initial page loads

2. **Performance**
   - Static generation for product pages
   - Incremental Static Regeneration (ISR)
   - Optimized bundle splitting

3. **Migration Safety**
   - Components tested in current React environment
   - Gradual migration path
   - Minimal breaking changes

### Next Steps

1. Set up Next.js project with App Router
2. Migrate optimized components
3. Configure routing and middleware
4. Set up deployment pipeline
5. Implement redirects from old URLs

### Directory Structure for Next.js
```
nextjs-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx
│   └── health-concerns/
│       └── [concern]/
│           └── page.tsx
├── components/
│   ├── ui/
│   ├── product/
│   └── health-concerns/
├── lib/
│   ├── dataFetchers.ts
│   └── utils.ts
└── hooks/
    └── useClientSideData.tsx
```

This structure provides a solid foundation for Next.js migration while maintaining all existing functionality.
