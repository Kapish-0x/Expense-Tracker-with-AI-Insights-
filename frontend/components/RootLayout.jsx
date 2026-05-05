import React from 'react'
import Sidebar from './Sidebar'

const RootLayout = ({children}) => {
    return (
        <div className='flex h-screen w-full bg-[#000000] overflow-hidden'>
            <Sidebar />
            <div className='flex-1 flex flex-col relative overflow-y-auto bg-[#000000]'>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>     
                </div>
                <main className='relative z-10 p-10 mid:p-15 '>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default RootLayout;