
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import CategoryOverview from './pages/CategoryOverview';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import ProductsManagement from './pages/admin/ProductsManagement';
import OrdersManagement from './pages/admin/OrdersManagement';
import CustomersManagement from './pages/admin/CustomersManagement';
import DiscountsManagement from './pages/admin/DiscountsManagement';
import SalesAnalytics from './pages/admin/SalesAnalytics';
import SettingsManagement from './pages/admin/SettingsManagement';
import ILoveHomeopathy from './pages/ILoveHomeopathy';
import Homeopathy from './pages/Homeopathy';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import HelpCenter from './pages/HelpCenter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ReturnPolicy from './pages/ReturnPolicy';
import ShippingInfo from './pages/ShippingInfo';
import UserAccount from './pages/UserAccount';
import OrderHistory from './pages/OrderHistory';
import StoreLocator from './pages/StoreLocator';
import PaymentMethods from './pages/PaymentMethods';
import Reviews from './pages/Reviews';
import ERPNextIntegration from './pages/ERPNextIntegration';
import ProductImport from './pages/ProductImport';
import ThankYou from './pages/ThankYou';
import EditProduct from './pages/admin/EditProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/categories" element={<CategoryOverview />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/category/:categoryId/:subcategoryId" element={<CategoryPage />} />
        <Route path="/concern/:concernId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/i-love-homeopathy" element={<ILoveHomeopathy />} />
        <Route path="/homeopathy" element={<Homeopathy />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/shipping-info" element={<ShippingInfo />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/stores" element={<StoreLocator />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/erp-integration" element={<ERPNextIntegration />} />
        <Route path="/product-import" element={<ProductImport />} />
        <Route path="/thank-you" element={<ThankYou />} />
        
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="products/edit/:productId" element={<EditProduct />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="customers" element={<CustomersManagement />} />
          <Route path="discounts" element={<DiscountsManagement />} />
          <Route path="analytics" element={<SalesAnalytics />} />
          <Route path="settings" element={<SettingsManagement />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
