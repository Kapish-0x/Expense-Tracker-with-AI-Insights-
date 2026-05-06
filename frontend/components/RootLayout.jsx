import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const RootLayout = () => {
  const location = useLocation();

  // In paths par humein Sidebar NAHI dikhana hai
  const hideSidebarPaths = ['/', '/login', '/register'];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    <div className="flex h-screen w-full bg-[#000000] overflow-hidden font-mono">
      {/* Conditional Rendering: Agar auth page nahi hai, tabhi sidebar dikhao */}
      {!shouldHideSidebar && <Sidebar />}

      {/* Dynamic Content Area */}
      <div className="flex-1 relative overflow-y-auto">
        {/* Subtle Nothing Dot Background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        ></div>

        {/* Main content: centering for auth pages, padding for dashboard */}
        <main className={`relative z-10 ${shouldHideSidebar ? 'flex items-center justify-center min-h-screen' : 'p-10'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;