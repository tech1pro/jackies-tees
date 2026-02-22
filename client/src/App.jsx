import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import OrderRequest from './pages/OrderRequest';
import QuoteRequest from './pages/QuoteRequest';
import ThankYou from './pages/ThankYou';
import AdminSubmissions from './pages/AdminSubmissions';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/request-order" element={<OrderRequest />} />
          <Route path="/request-quote" element={<QuoteRequest />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin/submissions" element={<AdminSubmissions />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
