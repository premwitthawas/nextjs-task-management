import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import CreateWorkspaceModal from '@/features/workspaces/components/create-workspace-modal'
import React, { PropsWithChildren } from 'react'

const DashBoardLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className='min-h-screen'>
            <CreateWorkspaceModal />
            <div className='flex w-full h-full'>
                {/* SIDEBAR */}
                <div className='fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-auto'>
                    <Sidebar />
                </div>
                {/* CONTENT-RIGHT */}
                <div className='lg:pl-[264px] w-full'>
                    <div className='mx-auto max-w-screen-2xl h-full'>
                        {/* TODO: NAVBAR */}
                        <Navbar />
                        <main className='h-full py-8 px-6 flex flex-col'>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardLayout