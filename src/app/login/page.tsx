"use client";

import Login from "@/components/login";
import PublicPage from "@/routing/public-page";

const LoginPage: React.FC = () => {
    return (
        <PublicPage>
            <Login/>
        </PublicPage>
    );
}

export default LoginPage;