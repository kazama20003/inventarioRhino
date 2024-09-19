'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    LayoutDashboard,
    Package,
    ClipboardList,
    Users,
    TrendingUp,
    Settings,
    Menu,
    X,
    Building2,
    ChevronLeft,
    ChevronRight,
    ChevronDown, // Ícono para indicar subopciones
} from 'lucide-react'

const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Almacén', icon: Package, subItems: [
        { name: 'Productos', href: '/dashboard/almacen/productos' },
        { name: 'Entradas', href: '/dashboard/almacen/entradas' },
        { name: 'Salidas', href: '/dashboard/almacen/salidas' },
        { name: 'Stock', href: '/dashboard/almacen/stock' },
    ]},
    { name: 'Órdenes', href: '/orders', icon: ClipboardList },
    { name: 'Clientes', href: '/customers', icon: Users },
    { name: 'Reportes', href: '/reports', icon: TrendingUp },
    { name: 'Configuración', href: '/settings', icon: Settings },
]

interface SidebarProps {
    onExpand: (expanded: boolean) => void;
}

export default function Sidebar({ onExpand }: SidebarProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
    const [openSubItems, setOpenSubItems] = useState<string | null>(null)
    const pathname = usePathname()
    const sidebarRef = useRef<HTMLDivElement>(null)

    // Sincroniza el estado de expansión con el layout.
    useEffect(() => {
        onExpand(isSidebarExpanded)
    }, [isSidebarExpanded, onExpand])

    // Manejo del clic fuera del sidebar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsSidebarOpen(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <Button
                variant="outline"
                size="icon"
                className={cn(
                    "fixed top-4 left-4 z-50 lg:hidden transition-opacity",
                    isSidebarOpen && "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsSidebarOpen(true)}
            >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open Sidebar</span>
            </Button>

            <aside
                ref={sidebarRef}
                className={cn(
                    "fixed inset-y-0 left-0 z-40 bg-background shadow-lg transform transition-all duration-200 ease-in-out lg:translate-x-0",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                    isSidebarExpanded ? "w-64" : "w-20"
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-20 px-4 border-b">
                        <div className="flex items-center">
                            <Building2 className="h-8 w-8 text-primary mr-2" />
                            {isSidebarExpanded && (
                                <span className="text-2xl font-bold text-primary">InvenTrack</span>
                            )}
                        </div>
                        <div className="hidden lg:flex items-center">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                                className="ml-2"
                            >
                                {isSidebarExpanded ? (
                                    <ChevronLeft className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                    {isSidebarExpanded ? "Minimize Sidebar" : "Maximize Sidebar"}
                                </span>
                            </Button>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close Sidebar</span>
                        </Button>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-4 px-3">
                        <TooltipProvider>
                            {sidebarItems.map((item) => (
                                <div key={item.name}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={item.href || "#"}
                                                className={cn(
                                                    "flex items-center justify-between w-full px-4 py-3 my-1 text-sm font-medium transition-all rounded-lg",
                                                    "hover:bg-primary/10 hover:text-primary hover:shadow-md",
                                                    pathname === item.href
                                                        ? "bg-primary/20 text-primary shadow-sm"
                                                        : "text-muted-foreground"
                                                )}
                                                onClick={() => item.subItems ? setOpenSubItems(openSubItems === item.name ? null : item.name) : undefined}
                                            >
                                                <div className="flex items-center">
                                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                                    {isSidebarExpanded && (
                                                        <span className="ml-3 transition-opacity duration-200">{item.name}</span>
                                                    )}
                                                </div>
                                                {item.subItems && (
                                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSubItems === item.name ? 'transform rotate-180' : ''}`} />
                                                )}
                                            </Link>
                                        </TooltipTrigger>
                                        {!isSidebarExpanded && (
                                            <TooltipContent side="right" sideOffset={10}>
                                                {item.name}
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                    {item.subItems && openSubItems === item.name && (
                                        <div className="ml-4">
                                            {item.subItems.map((subItem) => (
                                                <Link key={subItem.name} href={subItem.href} className={cn(
                                                    "flex items-center px-4 py-2 my-1 text-sm font-medium transition-all rounded-lg",
                                                    "hover:bg-primary/10 hover:text-primary hover:shadow-md",
                                                    pathname === subItem.href
                                                        ? "bg-primary/20 text-primary shadow-sm"
                                                        : "text-muted-foreground"
                                                )}>
                                                    {isSidebarExpanded && (
                                                        <span className="ml-3">{subItem.name}</span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </TooltipProvider>
                    </nav>
                </div>
            </aside>
        </>
    )
}
