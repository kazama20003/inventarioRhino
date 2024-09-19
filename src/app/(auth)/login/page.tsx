'use client';

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Asegúrate de importar desde 'next/navigation'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/Icons";
import { Alert, AlertDescription } from "@/components/ui/alert";

const useForm = (router: ReturnType<typeof useRouter>, initialState = { email: "", password: "" }) => {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación de llamada a la API
            if (formData.email === "admin@example.com" && formData.password === "123") {
                router.push('/dashboard');
            } else {
                setError("Credenciales inválidas. Por favor, inténtelo de nuevo.");
            }
        } catch {
            setError("Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    }, [formData, router]);

    return { formData, error, isLoading, handleChange, handleSubmit };
};

const AuthenticationPage = () => {
    const router = useRouter();
    const { formData, error, isLoading, handleChange, handleSubmit } = useForm(router);

    return (
        <div className="flex min-h-screen">
            <div className="hidden w-1/2 relative lg:block rounded-md overflow-hidden">
                <Image
                    src="/Login/1.jpg" 
                    fill
                    alt="Sistema de Inventario"
                    className="rounded-md"
                    style={{ objectFit: 'cover' }}
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-6 rounded-b-md">
                    <blockquote className="text-lg italic">
                        &ldquo;Este sistema de inventario ha revolucionado la forma en que gestionamos nuestros productos. Es eficiente, fácil de usar y ha mejorado significativamente nuestra productividad.&rdquo;
                    </blockquote>
                    <p className="mt-2 text-right text-sm font-semibold">Kazamita - Gerente de Operaciones</p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 rounded-md flex items-center justify-center p-8 bg-white">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Acceder a la cuenta
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Ingrese su correo electrónico y contraseña para acceder al sistema
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <Label htmlFor="email" className="sr-only">
                                    Correo electrónico
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="rounded-t-md"
                                    placeholder="Correo electrónico"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="password" className="sr-only">
                                    Contraseña
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="rounded-b-md"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">O continuar con</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button variant="outline" className="w-full" onClick={() => alert("Función no implementada")}>
                                <Icons.google className="w-5 h-5 mr-2" />
                                Google
                            </Button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-xs text-gray-500">
                        Al hacer clic en continuar, aceptas nuestros{" "}
                        <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                            Términos de servicio
                        </Link>{" "}
                        y{" "}
                        <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                            Política de privacidad
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationPage;
