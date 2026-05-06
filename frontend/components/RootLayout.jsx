// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import Sidebar from './Sidebar';
// import { useAuth } from '../store/authStore';

// const RootLayout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { isAuthenticated } = useAuth();

//   const hideSidebarPaths = ['/', '/login', '/register'];
//   const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

//   // 🔐 Global Auth Control
//   useEffect(() => {
//     const publicPaths = ['/', '/login', '/register'];

//     // Agar user logged in hai aur auth page pe hai → dashboard bhej
//     if (isAuthenticated && publicPaths.includes(location.pathname)) {
//       navigate('/dashboard');
//     }

//     // Agar user logged out hai aur protected route pe hai → login bhej
//     if (!isAuthenticated && !publicPaths.includes(location.pathname)) {
//       navigate('/login');
//     }

//   }, [isAuthenticated, location.pathname, navigate]);

//   return (
//     <div className="flex h-screen w-full bg-[#000000] overflow-hidden font-mono">
//       {/* Conditional Rendering: Agar auth page nahi hai, tabhi sidebar dikhao */}
//       {!shouldHideSidebar && <Sidebar />}

//       {/* Dynamic Content Area */}
//       <div className="flex-1 relative overflow-y-auto">
//         {/* Subtle Nothing Dot Background */}
//         <div 
//           className="absolute inset-0 opacity-[0.03] pointer-events-none" 
//           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
//         ></div>

//         {/* Main content: centering for auth pages, padding for dashboard */}
//         <main className={`relative z-10 ${shouldHideSidebar ? 'flex items-center justify-center min-h-screen' : 'p-10'}`}>
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default RootLayout;






import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../store/authStore';

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const hideSidebarPaths = ['/', '/login', '/register'];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  useEffect(() => {
    const publicPaths = ['/', '/login', '/register'];
    if (isAuthenticated && publicPaths.includes(location.pathname)) {
      navigate('/dashboard');
    }
    if (!isAuthenticated && !publicPaths.includes(location.pathname)) {
      navigate('/login');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <div className="flex h-screen w-full bg-[#fafafa] text-slate-900 selection:bg-slate-200">
      
      {/* Sidebar - Clean Ivory/White look */}
      {!shouldHideSidebar && (
        <aside className="bg-white border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0,02)] z-20">
          <Sidebar />
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        
        {/* Subtle Textured Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none"></div>

        <main
          className={`relative z-10 flex-1 overflow-y-auto scroll-smooth ${
            shouldHideSidebar
              ? 'flex items-center justify-center'
              : 'p-6 md:p-10 lg:p-14'
          }`}
        >
          <div className={`${shouldHideSidebar ? 'w-full max-w-md' : 'w-full max-w-[1400px] mx-auto'}`}>
            
            {/* The "Floating Canvas" container */}
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