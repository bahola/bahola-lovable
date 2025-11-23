
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

import { SwellCartProvider } from './contexts/SwellCartContext';
import { ERPNextAuthProvider } from './contexts/ERPNextAuthContext';
import ScrollToTop from './components/ScrollToTop';
import { LazyHeader } from './components/LazyHeader';
import { Footer } from './components/Footer';
import AppRoutes from './components/routing/AppRoutes';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ERPNextAuthProvider>
          <SwellCartProvider>
            <BrowserRouter>
              <ScrollToTop />
              <div className="min-h-screen flex flex-col">
                <LazyHeader />
                <main className="flex-1">
                  <AppRoutes />
                </main>
                <Footer />
              </div>
              <Toaster />
            </BrowserRouter>
          </SwellCartProvider>
        </ERPNextAuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
