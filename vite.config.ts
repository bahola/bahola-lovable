import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'production' && prerender({
      // Output directory
      staticDir: path.join(__dirname, 'dist'),
      // Routes to pre-render
      routes: [
        '/',
        '/shop',
        '/homeopathy',
        '/about',
        '/contact',
        '/diseases-conditions',
        '/diseases-conditions/eye-care',
        '/diseases-conditions/gut-health',
        '/diseases-conditions/ent-care',
        '/diseases-conditions/heart-health',
        '/diseases-conditions/allergy-care',
        '/diseases-conditions/immune-boosters',
        '/diseases-conditions/skin-care',
        '/diseases-conditions/hair-care',
        '/diseases-conditions/womens-health',
        '/diseases-conditions/mental-health',
        '/diseases-conditions/digestive-issues',
        '/diseases-conditions/respiratory-care',
        '/diseases-conditions/pain-care',
        '/diseases-conditions/infection-care',
        '/help-center',
        '/help-center/getting-started',
        '/help-center/potency-guide',
        '/faq',
        '/sitemap',
      ],
      // Renderer options
      renderer: 'react',
      postProcess(renderedRoute: any) {
        // Clean up the HTML
        renderedRoute.html = renderedRoute.html
          .replace(/<script (.*?)>/gi, '<script $1 defer>')
          .replace('id="root"', 'id="root" data-prerendered="true"');
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
}));
