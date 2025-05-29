"use client";

import Auth from "@/core/middleware/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export interface PrivatePageProps {
    children: React.ReactNode
}

const auth: Auth = new Auth();

const PrivatePage: React.FC<PrivatePageProps> = props => {
    const { children } = props;
    const pathname = usePathname();

    useEffect(() => {
        if (auth.isAuthenticated() === false) {
            window.location.href = '/login';
        }
    }, [pathname]);

    return children
}

export default PrivatePage;