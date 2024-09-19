// app/login/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
    };

    export default function LoginLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-gray-100 antialiased">
            {children}
        </body>
        </html>
    );
}