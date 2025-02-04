"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/login");
    };

    const handleRegister = () => {
        router.push("/register");
    };

    return (
        <div className="min-h-screen min-w-screen bg-slate-400 flex flex-col items-center">
            <div className="m-auto flex-col flex gap-2">
                <Button onClick={handleLogin}>Login</Button>
                <Button onClick={handleRegister}>Register</Button>
            </div>
        </div>
    );
}
