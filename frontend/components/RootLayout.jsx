import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../store/authStore';
import { Loader2 } from 'lucide-react'; // Ek clean loader use karle

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 'isCheckingAuth' zaroor fetch kar store se
  const { isAuthenticated, isCheckingAuth, checkAuth } = useAuth();

  const publicPaths = ['/', '/login', '/register'];
  const shouldHideSidebar = publicPaths.includes(location.pathname);

  // 1. Initial Auth Check (Cookie verification)
  useEffect(() => {
    if (checkAuth) {
      checkAuth();
    }
  }, [checkAuth]);

  // 2. Protected Routes Logic
  useEffect(() => {
    // Agar abhi check chal raha hai, toh kuch mat karo
    if (isCheckingAuth) return;

    if (isAuthenticated && publicPaths.includes(location.pathname)) {
      navigate('/dashboard');
    }
    
    if (!isAuthenticated && !publicPaths.includes(location.pathname)) {
      navigate('/login');
    }
  }, [isAuthenticated, isCheckingAuth, location.pathname, navigate]);

  // 3. Loading Screen (Essential for Cookies)
  // Jab tak cookie verify ho rahi hai, tab tak blank ya loader dikhao
  // Iske bina user login screen dekh kar dashboard par jump karega (Ghosting)
  if (isCheckingAuth) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#fafafa]">
        <Loader2 className="animate-spin text-slate-400 mb-4" size={32} />
        <p className="text-slate-400 text-xs font-bold uppercase tracking-[3px]">Syncing Node...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#fafafa] text-slate-900 selection:bg-slate-200">
      
      {!shouldHideSidebar && (
        <aside className="bg-white border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
          <Sidebar />
        </aside>
      )}

      <div className="flex-1 relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none"></div>

        <main
          className={`relative z-10 flex-1 overflow-y-auto scroll-smooth ${
            shouldHideSidebar
              ? 'flex items-center justify-center'
              : 'p-6 md:p-10 lg:p-14'
          }`}
        >
          <div className={`${shouldHideSidebar ? 'w-full max-w-md' : 'w-full max-w-[1400px] mx-auto'}`}>
            <div className={`
              ${shouldHideSidebar 
                ? 'bg-white border border-slate-200 shadow-2xl rounded-3xl p-8' 
                : 'bg-white/80 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 md:p-12'
              } transition-all duration-500 ease-in-out
            `}>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;