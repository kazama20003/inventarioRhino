'use client'

import { useState } from 'react'
import Sidebar from '@/components/dashboard/sidebar/Sidebar'
import { cn } from '@/lib/utils'
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar onExpand={setIsSidebarExpanded} />
            <div 
                className={cn(
                    "flex-1 flex flex-col overflow-hidden transition-all duration-200 ease-in-out",
                    isSidebarExpanded ? "lg:ml-64" : "lg:ml-20"
                )}
            >
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}