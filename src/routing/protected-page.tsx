"use client";

import Auth from "@/core/middleware/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export interface ProtectedPageProps {
    children: React.ReactNode
}

const auth: Auth = new Auth();

const ProtectedPage: React.FC<ProtectedPageProps> = props => {
    const { children } = props;
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (auth.isAuthenticated() === false) {
            router.push('login');
        }
    }, [pathname]);

    return children
}

export default ProtectedPage;