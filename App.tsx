
import React, { useState, useEffect, Suspense, ReactNode, Component, ErrorInfo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Team from './components/Team';
import ProjectGallery from './components/ProjectGallery';
import Services from './components/Services';
import AIConsultant from './components/AIConsultant';
import LegacyTracker from './components/LegacyTracker';
import Footer from './components/Footer';
import LiveArchitect from './components/LiveArchitect';
import AdminPanel from './components/Admin/AdminPanel';
import { AppProvider, useApp } from './AppContext';
import { 
  ArrowUp, 
  AlertTriangle, 
  ShieldCheck, 
  Loader2, 
  X, 
  ArrowRight, 
  Menu, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter 
} from 'lucide-react';

// --- Error Boundary Fallback ---
const ErrorFallback = ({ error }: { error?: Error }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-8">
      <AlertTriangle size={40} className="text-orange-500" />
    </div>
    <h2 className="text-3xl font-bold text-slate-900 mb-4">Hệ thống đang bảo trì</h2>
    <p className="text-slate-500 mb-8 max-w-md">Chúng tôi đang tinh chỉnh hiệu năng để mang lại trải nghiệm tốt nhất cho Anh/Chị.</p>
    {error && <p className="text-[10px] text-slate-300 font-mono mb-6 max-w-xs truncate">{error.message}</p>}
    <button 
      onClick={() => window.location.reload()}
      className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl hover:bg-orange-600 transition-all"
    >
      Khởi động lại
    </button>
  </div>
);

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Using Component explicitly and property initialization to ensure state and props are correctly inherited and visible to the compiler.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Fix: Property initialization for state avoids potential issues with constructor masking inherited properties.
  public state: ErrorBoundaryState = { 
    hasError: false 
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Critical System Failure:", error, errorInfo);
  }

  render() {
    // Correctly accessing inherited state and props.
    if (this.state.hasError) {
      return <ErrorBoundaryFallbackWrapper error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Wrapper to ensure functional component inside class render is safe
const ErrorBoundaryFallbackWrapper: React.FC<{error?: Error}> = ({error}) => {
    return <ErrorFallback error={error} />;
}

const GlobalLoader = () => (
  <div className="fixed inset-0 z-[1000] bg-slate-950 flex flex-col items-center justify-center">
    <div className="relative mb-12">
      <div className="w-24 h-24 border-2 border-orange-600/10 border-t-orange-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-orange-600/5 rounded-full animate-ping"></div>
      </div>
    </div>
    <h1 className="text-white text-xl font-black tracking-[0.5em] uppercase">Aura Sài Gòn</h1>
    <p className="text-orange-600/60 text-[10px] font-bold tracking-[0.2em] mt-4 animate-pulse uppercase">Khởi tạo hệ thống di sản...</p>
  </div>
);

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', toggleVisible, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);
  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  if (!visible) return null;
  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 left-8 z-[90] p-4 bg-white text-slate-900 rounded-full shadow-2xl border border-slate-100 transition-all transform hover:bg-orange-600 hover:text-white hover:scale-110"
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  );
};

const AppContent: React.FC = () => {
  const { data, circadianMode, isReady } = useApp();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passcode, setPasscode] = useState('');

  useEffect(() => {
    if (!isReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Đảm bảo element tồn tại trước khi quan sát
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, [isAdmin, isReady]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPass = data?.studioInfo?.adminPasscode || '1234';
    if (passcode === correctPass) { 
      setIsAdmin(true);
      setShowLogin(false);
      setPasscode('');
    } else {
      alert('Sai mật mã quản trị!');
    }
  };

  if (!isReady) return <GlobalLoader />;
  if (isAdmin) return <AdminPanel onExit={() => setIsAdmin(false)} />;

  return (
    <div className={`min-h-screen relative transition-all duration-[2000ms] circadian-${circadianMode}`}>
      <Navbar />
      <Hero />
      <main>
        <Philosophy />
        <Team />
        <ProjectGallery />
        <Services />
        <LegacyTracker />
        <AIConsultant />
      </main>
      <Footer />
      <LiveArchitect />
      <ScrollToTop />

      <div className="fixed bottom-4 right-4 z-[50]">
        <button 
          onClick={() => setShowLogin(true)}
          className="p-3 bg-white/10 backdrop-blur-md border border-slate-200 text-slate-300 hover:text-orange-600 hover:bg-white rounded-full transition-all opacity-10 hover:opacity-100"
          aria-label="Admin Access"
        >
          <ShieldCheck size={18} />
        </button>
      </div>

      {showLogin && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md">
          <div className="relative bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-sm text-center">
            <button onClick={() => setShowLogin(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900"><X size={20}/></button>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Xác thực quyền quản trị</h4>
            <input 
              type="password" autoFocus value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-8 py-5 bg-slate-100 rounded-2xl outline-none mb-8 text-center text-3xl font-bold tracking-widest"
              placeholder="••••"
            />
            <button onClick={handleLogin} className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all">Truy cập</button>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <ErrorBoundary>
    <AppProvider>
      <AppContent />
    </AppProvider>
  </ErrorBoundary>
);

export default App;
