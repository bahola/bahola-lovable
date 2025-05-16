
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Homeopathy from "./pages/Homeopathy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CategoryOverview from "./pages/CategoryOverview";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentMethods from "./pages/PaymentMethods";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserAccount from "./pages/UserAccount";
import OrderHistory from "./pages/OrderHistory";
import ReturnPolicy from "./pages/ReturnPolicy";
import ShippingInfo from "./pages/ShippingInfo";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Reviews from "./pages/Reviews";
import StoreLocator from "./pages/StoreLocator";
import ThankYou from "./pages/ThankYou";
import ILoveHomeopathy from "./pages/ILoveHomeopathy";
import ProductImport from "./pages/ProductImport";
import FAQ from "./pages/FAQ";
import HelpCenter from "./pages/HelpCenter";

// Admin Dashboard Components
import AdminDashboard from "./pages/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import ProductsManagement from "./pages/admin/ProductsManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import CustomersManagement from "./pages/admin/CustomersManagement";
import DiscountsManagement from "./pages/admin/DiscountsManagement";
import SalesAnalytics from "./pages/admin/SalesAnalytics";

// Professional Resources Pages
import MateriaMedica from "./pages/professional/MateriaMedica";
import RemedyDeepDive from "./pages/professional/RemedyDeepDive";
import CaseStudies from "./pages/professional/CaseStudies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/homeopathy" element={<Homeopathy />} />
          <Route path="/i-love-homeopathy" element={<ILoveHomeopathy />} />
          
          {/* Core Pages */}
          <Route path="/categories" element={<CategoryOverview />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/category/:categoryId/:subcategoryId" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product-import" element={<ProductImport />} />
          
          {/* Health Concern Category Pages */}
          <Route path="/concern/:concernId" element={<CategoryPage />} />
          
          {/* Shopping and Checkout Pages */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          
          {/* Customer Account Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<UserAccount />} />
          <Route path="/orders" element={<OrderHistory />} />
          
          {/* Professional Resources Pages */}
          <Route path="/professional/materia-medica" element={<MateriaMedica />} />
          <Route path="/professional/remedy-deep-dive" element={<RemedyDeepDive />} />
          <Route path="/professional/case-studies" element={<CaseStudies />} />
          
          {/* Informational Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/shipping" element={<ShippingInfo />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help-center" element={<HelpCenter />} />
          
          {/* Additional Pages */}
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/stores" element={<StoreLocator />} />
          <Route path="/thank-you" element={<ThankYou />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="customers" element={<CustomersManagement />} />
            <Route path="discounts" element={<DiscountsManagement />} />
            <Route path="analytics" element={<SalesAnalytics />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
